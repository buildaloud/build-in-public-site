"""buildaloud audio brand: synthesized intro sting + outro sting + a 'pass' ding.

All sounds are code — no licensing, no downloads. Terminal-boot aesthetic:
a rising mint arpeggio over a low charcoal hum, closed by a soft ding.
"""

from pathlib import Path

import numpy as np
import soundfile as sf

SR = 24000
OUT = Path(__file__).parent / "out"


def tone(freq: float, dur: float, vol: float = 0.5, decay: float = 6.0) -> np.ndarray:
    t = np.linspace(0, dur, int(SR * dur), endpoint=False)
    env = np.exp(-decay * t)
    wave = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(4 * np.pi * freq * t)
    return (vol * env * wave).astype(np.float32)


def place(track: np.ndarray, sound: np.ndarray, at: float) -> None:
    i = int(at * SR)
    track[i : i + len(sound)] += sound[: len(track) - i]


def sting(notes: list[float], dur: float, hum: bool) -> np.ndarray:
    track = np.zeros(int(SR * dur), dtype=np.float32)
    for n, f in enumerate(notes):
        place(track, tone(f, 0.7, vol=0.4, decay=5.0), n * 0.12)
    if hum:
        t = np.linspace(0, dur, len(track), endpoint=False)
        track += (0.12 * np.sin(2 * np.pi * 55 * t) * np.exp(-1.2 * t)).astype(np.float32)
    fade = int(0.25 * SR)
    track[-fade:] *= np.linspace(1, 0, fade, dtype=np.float32)
    return np.clip(track, -1, 1)


# A minor pentatonic rise (A3 C4 E4 A4 C5) — "boot up"
intro = sting([220.0, 261.63, 329.63, 440.0, 523.25], 2.2, hum=True)
# The same figure descending, resolving home — "power down, job done"
outro = sting([523.25, 440.0, 329.63, 261.63, 220.0], 2.6, hum=True)
# All-green ding: E5 + A5 fifth, short
ding = np.clip(tone(659.25, 0.5, vol=0.35, decay=7.0) + tone(880.0, 0.5, vol=0.25, decay=7.0), -1, 1)

OUT.mkdir(exist_ok=True)
for name, snd in [("sting-intro", intro), ("sting-outro", outro), ("sfx-pass", ding)]:
    sf.write(OUT / f"{name}.wav", snd, SR)
    print(name, f"{len(snd)/SR:.1f}s")
