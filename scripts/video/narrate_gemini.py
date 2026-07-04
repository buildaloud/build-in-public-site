"""Scout narration via Gemini TTS: same spec format as narrate.py, API voice."""

import base64
import json
import os
import sys
import urllib.request
from pathlib import Path

import numpy as np
import soundfile as sf

HERE = Path(__file__).parent
SR = 24000
GAP_S = 0.45
MODEL = "gemini-2.5-flash-preview-tts"


def srt_time(t: float) -> str:
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h):02}:{int(m):02}:{int(s):02},{int((s % 1) * 1000):03}"


def tts(text: str, voice: str, style: str, key: str) -> np.ndarray:
    body = {
        "contents": [{"parts": [{"text": f"{style} Say: {text}"}]}],
        "generationConfig": {
            "responseModalities": ["AUDIO"],
            "speechConfig": {"voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voice}}},
        },
    }
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={key}"
    req = urllib.request.Request(
        url, data=json.dumps(body).encode(), headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=120) as res:
        payload = json.load(res)
    part = payload["candidates"][0]["content"]["parts"][0]["inlineData"]
    assert part["mimeType"].startswith("audio/L16"), part["mimeType"]
    pcm = np.frombuffer(base64.b64decode(part["data"]), dtype=np.int16)
    return (pcm.astype(np.float32) / 32768.0)


def main() -> None:
    key = os.environ["GEMINI_API_KEY"]
    spec = json.loads(Path(sys.argv[1]).read_text())
    voice = sys.argv[2] if len(sys.argv) > 2 else spec.get("voice", "Charon")
    style = spec.get("style", "")
    out_dir = HERE / "out"
    out_dir.mkdir(exist_ok=True)

    track: list[np.ndarray] = []
    srt: list[str] = []
    cursor = float(spec.get("lead_in", 0.5))
    track.append(np.zeros(int(cursor * SR), dtype=np.float32))
    gap = np.zeros(int(GAP_S * SR), dtype=np.float32)

    for i, seg in enumerate(spec["segments"], 1):
        samples = tts(seg["text"], voice, style, key)
        pre = float(seg.get("at", cursor))
        if pre > cursor:
            track.append(np.zeros(int((pre - cursor) * SR), dtype=np.float32))
            cursor = pre
        dur = len(samples) / SR
        srt += [str(i), f"{srt_time(cursor)} --> {srt_time(cursor + dur)}", seg["text"], ""]
        track += [samples, gap]
        cursor += dur + GAP_S
        print(f"  seg {i}: {dur:.1f}s (ends {cursor:.1f}s)")

    name = spec.get("name", "narration")
    sf.write(out_dir / f"{name}.wav", np.concatenate(track), SR)
    (out_dir / f"{name}.srt").write_text("\n".join(srt))
    print(f"{name}: {cursor:.1f}s total, voice={voice}")


if __name__ == "__main__":
    main()
