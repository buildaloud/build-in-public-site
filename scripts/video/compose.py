"""Segment compositor for Shorts: each segment = clip/card + its own narration.

Video is fitted to audio per segment (clips get time-compressed — no dead
air; cards get a slow zoom push). Output: 1080x1920, 30fps, loudnorm to
-14 LUFS, faststart. Spec: episode JSON with segments[].
"""

import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

import soundfile as sf
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).parent
OUT = HERE / "out"
SR = 24000
W, H = 1080, 1920
FPS = 30
BG, SURFACE, MINT, TEXT = "#0c0e12", "#13161c", "#a3f7bf", "#e8eaed"
FONT = "/System/Library/Fonts/Menlo.ttc"


def run(args: list[str]) -> None:
    subprocess.run(["ffmpeg", "-nostdin", "-nostats", "-loglevel", "error", *args], check=True)


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
        capture_output=True, text=True, check=True,
    )
    return float(out.stdout.strip())


def wrap(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.FreeTypeFont, max_w: int) -> list[str]:
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=font) <= max_w:
            line = trial
        else:
            lines.append(line)
            line = word
    return [*lines, line] if line else lines


def render_card(text: str, sub: str | None, path: Path) -> None:
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 8], fill=MINT)
    d.rectangle([0, H - 8, W, H], fill=MINT)
    font = ImageFont.truetype(FONT, 88)
    lines = wrap(d, text, font, W - 160)
    line_h = 112
    y = H // 2 - (len(lines) * line_h) // 2 - (60 if sub else 0)
    for ln in lines:
        d.text((W // 2, y), ln, font=font, fill=TEXT, anchor="mm")
        y += line_h
    if sub:
        sfont = ImageFont.truetype(FONT, 46)
        for ln in wrap(d, sub, sfont, W - 200):
            y += 70
            d.text((W // 2, y), ln, font=sfont, fill=MINT, anchor="mm")
    d.text((W // 2, H - 110), "buildaloud.ai", font=ImageFont.truetype(FONT, 40), fill=MINT, anchor="mm")
    img.save(path)


def narrate(text: str, style: str, voice: str, key: str, path: Path) -> float:
    sys.path.insert(0, str(HERE))
    from narrate_gemini import tts

    samples = tts(text, voice, style, key)
    sf.write(path, samples, SR)
    return len(samples) / SR


def fit_clip(src: Path, target: float, path: Path) -> None:
    """Time-compress (or gently extend) a clip to exactly target seconds."""
    ratio = target / duration(src)
    run(["-i", str(src),
         "-vf", f"setpts={ratio}*PTS,fps={FPS},scale={W}:{H}:force_original_aspect_ratio=decrease,"
                f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2:color={BG},format=yuv420p",
         "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-t", f"{target:.3f}", "-y", str(path)])


def fit_card(src: Path, target: float, path: Path) -> None:
    """Still card with a slow zoom push for movement."""
    frames = int(target * FPS)
    run(["-loop", "1", "-i", str(src),
         "-vf", f"scale={W * 2}:{H * 2},zoompan=z='1+0.04*on/{frames}':d={frames}:x='iw/2-(iw/zoom/2)'"
                f":y='ih/2-(ih/zoom/2)':s={W}x{H}:fps={FPS},format=yuv420p",
         "-frames:v", str(frames), "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-y", str(path)])


def main() -> None:
    spec = json.loads(Path(sys.argv[1]).read_text())
    key = os.environ["GEMINI_API_KEY"]
    style = spec.get("style", "")
    voice = spec.get("voice", "Charon")
    name = spec["name"]
    pad = float(spec.get("segment_pad", 0.35))

    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)
        parts: list[tuple[Path, Path]] = []
        for i, seg in enumerate(spec["segments"]):
            wav = tmp / f"a{i}.wav"
            dur = narrate(seg["narration"], style, voice, key, wav) + pad
            vid = tmp / f"v{i}.mp4"
            if seg["type"] == "card":
                png = tmp / f"c{i}.png"
                render_card(seg["text"], seg.get("sub"), png)
                fit_card(png, dur, vid)
            else:
                fit_clip(HERE / seg["src"], dur, vid)
            merged = tmp / f"m{i}.mp4"
            run(["-i", str(vid), "-i", str(wav), "-c:v", "copy", "-c:a", "aac", "-b:a", "128k",
                 "-shortest", "-y", str(merged)])
            parts.append((merged, wav))
            print(f"  seg {i} ({seg['type']}): {dur:.1f}s")

        concat = tmp / "list.txt"
        concat.write_text("".join(f"file '{p}'\n" for p, _ in parts))
        rough = tmp / "rough.mp4"
        run(["-f", "concat", "-safe", "0", "-i", str(concat), "-c", "copy", "-y", str(rough)])

        OUT.mkdir(exist_ok=True)
        final = OUT / f"{name}.mp4"
        run(["-i", str(rough), "-af", "loudnorm=I=-14:TP=-1.5:LRA=11", "-c:v", "copy",
             "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", "-y", str(final)])
        print(f"{final.name}: {duration(final):.1f}s")


if __name__ == "__main__":
    main()
