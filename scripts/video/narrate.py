"""Scout narration: segments -> per-segment WAVs + one concatenated track + SRT."""

import json
import sys
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

HERE = Path(__file__).parent
SAMPLE_RATE = 24000
GAP_S = 0.45


def srt_time(t: float) -> str:
    h, rem = divmod(t, 3600)
    m, s = divmod(rem, 60)
    return f"{int(h):02}:{int(m):02}:{int(s):02},{int((s % 1) * 1000):03}"


def main() -> None:
    spec = json.loads(Path(sys.argv[1]).read_text())
    out_dir = HERE / "out"
    out_dir.mkdir(exist_ok=True)
    kokoro = Kokoro(str(HERE / "models/kokoro-v1.0.onnx"), str(HERE / "models/voices-v1.0.bin"))

    track: list[np.ndarray] = []
    srt_lines: list[str] = []
    cursor = float(spec.get("lead_in", 0.5))
    gap = np.zeros(int(GAP_S * SAMPLE_RATE), dtype=np.float32)
    track.append(np.zeros(int(cursor * SAMPLE_RATE), dtype=np.float32))

    for i, seg in enumerate(spec["segments"], 1):
        samples, sr = kokoro.create(
            seg["text"], voice=spec.get("voice", "am_michael"), speed=seg.get("speed", 1.0)
        )
        assert sr == SAMPLE_RATE
        pre = float(seg.get("at", cursor))
        if pre > cursor:
            track.append(np.zeros(int((pre - cursor) * SAMPLE_RATE), dtype=np.float32))
            cursor = pre
        dur = len(samples) / SAMPLE_RATE
        srt_lines += [str(i), f"{srt_time(cursor)} --> {srt_time(cursor + dur)}", seg["text"], ""]
        track.append(samples.astype(np.float32))
        track.append(gap)
        cursor += dur + GAP_S

    name = spec.get("name", "narration")
    sf.write(out_dir / f"{name}.wav", np.concatenate(track), SAMPLE_RATE)
    (out_dir / f"{name}.srt").write_text("\n".join(srt_lines))
    print(f"{name}: {cursor:.1f}s, {len(spec['segments'])} segments")


if __name__ == "__main__":
    main()
