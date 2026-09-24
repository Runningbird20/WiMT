# ViMT (Voices in Music Tech) — Feature Ideas & Roadmap

This document outlines creative and impactful feature ideas to expand the ViMT website, building upon its unique vinyl turntable and DJ mixer crossfader interface.

---

## 1. Interactive Audio & Turntable Experience (Web Audio API)

- [ ] **Vinyl Needle & Spin Sound FX**
  - Add subtle, realistic analog sound effects when navigating (a brief vinyl scratch or record spin whoosh on channel change).
  - Include an audio toggle button styled like a vintage mixer **MUTE / PFL** button on the fader panel with a soft illuminated LED indicator.
  - Optional ambient vinyl groove crackle/dust hum toggle for lo-fi atmospheric listening while browsing.

- [ ] **Interactive Record Scratching**
  - Allow users to click and drag (or swipe on touchscreens) directly on the vinyl record to manually rotate, spin back, or scratch the record with pitch-accurate audio playback via the Web Audio API.

- [ ] **Mixer Pitch Slider (±8% Tempo Control)**
  - Add a vertical pitch fader next to the crossfader (styled after the iconic Technics SL-1200 pitch control).
  - Dragging the pitch slider dynamically adjusts the record's spin transition speed and audio playback rate.

- [ ] **LED VU Meters / Audio Visualizer**
  - Integrate a dual LED meter (green/amber/red segments) on the mixer faceplate that reacts dynamically during transitions or when audio is playing.

---

## 2. Web MIDI & Hardware Integration

- [ ] **Web MIDI Controller Support**
  - Enable visitors to plug in any class-compliant USB DJ controller, MIDI keyboard, or fader box (e.g., Pioneer DDJ, Akai MPK, Korg nanoKONTROL).
  - Map physical crossfaders and pitch faders directly to the on-screen channel selector and record spin via the Web MIDI API — an unforgettable interactive showcase for a music tech club!

---

## 3. Music Tech Showcase & Interactive Labs

- [ ] **Browser Synthesizer / Drum Sequencer ("ViMT Lab")**
  - A mini interactive Web Audio instrument (e.g., a 4-pad step sequencer, drum machine, or playable monophonic synth) built by club members where visitors can jam directly on the page.

- [ ] **Member Project & Music Showcase Player**
  - Custom audio player with waveform visualizers (via Wavesurfer.js or Canvas) to showcase original tracks, sound design reels, DSP plugin demos, and hardware projects built by ViMT students.
  - Links to GitHub repos, Soundcloud, Bandcamp, and Spotify for student creators.

- [ ] **"Track of the Month" / ViMT Playlist Embed**
  - Embed a curated Spotify or Apple Music playlist updated each month with tracks produced by underrepresented artists and ViMT club members.

---

## 4. Community & Event Tools

- [ ] **Interactive Calendar Sync (.ics & Google Calendar)**
  - One-click "Add to Calendar" buttons for club meetings, workshops, and guest lectures.
  - Live countdown ticker widget on the Events page showing time remaining until the next event or mixer.

- [ ] **Resource Hub & Learning Wiki**
  - Curated guide for beginners entering music tech: recommendations for free DAWs, introductory DSP / JUCE tutorials, Max/MSP and Pure Data patch archives, and scholarship/internship opportunities for underrepresented students.

- [ ] **Guest Speaker & Industry Archive**
  - Visual timeline of past guest speakers, industry panels (e.g., Moog, Dolby, Spotify, Native Instruments), and career advice archives.

---

## 5. Visual & Gear Aesthetic Enhancements

- [ ] **"Flip to Side B" 3D Record Animation**
  - A toggle button on the record label or header to flip the vinyl over with a 3D perspective animation, revealing "SIDE B" with secondary content (such as project showcases, galleries, or club history).

- [ ] **Studio / Club Night Mode (Lighting Toggle)**
  - A toggle switch on the mixer plate that transforms the daytime pastel blue studio into a dark club / studio control room setting with glowing UV blacklight accents on the record, neon turntable underglow, and backlit buttons.

- [ ] **Custom Vinyl Pressing Styles**
  - An easter egg dropdown or dial allowing visitors to swap the vinyl appearance between classic black vinyl, marbled translucent blue, gold splatter, and glow-in-the-dark pressings.

---

## 6. Progressive Web App & Offline Experience

- [ ] **PWA (Progressive Web App) Support**
  - Add a Web App Manifest and service worker so students can install ViMT directly onto their iOS/Android home screens or macOS docks like a native app.
  - Offline caching for event info, contact links, and club resources.

