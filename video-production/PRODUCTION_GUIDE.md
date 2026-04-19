# Video Production Guide: Seedance 2.0 Generation

**Quick Start Guide for Creating the Dhurandhar Spy Action Sequence**

---

## Step 1: Prepare Your Reference

✅ **Reference Image Attached:** Gym photo with pinstriped shirt (Agent physicality established)

**Agent Physical Traits from Reference:**
- Athletic build (220+ lbs muscle)
- Confident posture
- Composed facial expression
- Dark clothing (formal/tactical)
- Real-world presence (grounds scene in reality)

---

## Step 2: Load the Fight-Scenes Skill

In Claude Code or your AI assistant:

```
/seedance-fight-scenes
```

This activates the master prompt template for Seedance 2.0 on Higgsfield fight scene generation.

---

## Step 3: Paste the Complete Brief

Copy **entire content** from `dhurandhar-spy-action-brief.md` and submit with the skill invocation:

```
/seedance-fight-scenes

[Paste all sections of brief here]
```

---

## Step 4: Specify Output Parameters

**Critical Configuration:**

```
Platform: Seedance 2.0 on Higgsfield
Duration: 10-15 seconds
Frame Rate: 24fps (cinematic)
Resolution: 4K (3840x2160) preferred, 1080p (1920x1080) minimum
Aspect Ratio: 16:9 widescreen
Color Palette: Cool desaturated (blues, grays) with neon accents
Mood: Spy thriller, practical, high-stakes
Reference Image: [Attach gym photo]
```

---

## Step 5: Generation Parameters for Seedance 2.0

**Exact Submission Format:**

```
PROJECT: Dhurandhar Spy Action Sequence

REFERENCE IMAGE: [User's gym/pinstriped photo]

BRIEF:
[ENTIRE BRIEF CONTENT]

OUTPUT SPECS:
- Duration: 12 seconds
- Format: MP4 (H.264)
- Resolution: 4K (3840x2160)
- Frame Rate: 24fps
- Aspect Ratio: 16:9
- Color Space: Rec.709
- Audio: Stereo (for post-production mixing)

STYLE REFERENCE:
- Aesthetic: Mission Impossible, Jason Bourne, John Wick
- Tone: Professional spy thriller
- Realism: 100% practical (no superhuman abilities)
- Cinematography: Handheld-steady (real action feel)
```

---

## Step 6: Post-Production Workflow

### Audio Layer (15-20 minutes)

**Tools Needed:**
- DAW: Adobe Audition, Logic Pro, or DaVinci Resolve
- Sound Library: Epidemic Sound, Artlist, or Adobe Audition library

**Foley Stack:**
```
Layer 1: Ambient Rain (continuous, background)
├─ Heavy rainfall
├─ Wind through alley
└─ Distant urban traffic

Layer 2: Impact Sounds
├─ Jab/Cross hits (bass-heavy 80-200Hz)
├─ Elbow strikes (crisp 2-5kHz)
├─ Wall impact (deep thud + settling)
└─ Throw landing (explosive + air expulsion)

Layer 3: Environmental
├─ Footsteps (wet splashes, variable rhythm)
├─ Breathing (heavy, controlled)
├─ Water spray/displacement
└─ Fabric ripple (subtle)

Layer 4: Music Score
├─ Tension build (string tremolo, 0-3s)
├─ Impact hits (timpani, bass drums)
├─ Climax swell (full orchestra)
└─ Resolution fade (low strings out)

Layer 5: Special Effects
├─ Impact flashes (electrical pop)
├─ Silence moments (for dramatic effect)
└─ Heartbeat pulse (optional climax)
```

**Mix Guidelines:**
- Rain: -12dB to -8dB (constant, not distracting)
- Foley: -6dB to -3dB (clear but not overwhelming)
- Music: -8dB to -5dB (supports, doesn't dominate)
- Breathing: -5dB to -2dB (intimate, emotional)
- Impact: 0dB to +2dB (peaks at major moments)

### Color Grading (10-15 minutes)

**Tools Needed:**
- DaVinci Resolve (free version works)
- Adobe Premiere Pro with Lumetri
- Final Cut Pro with Color Grading

**Color Grade Specifications:**

```
BASE PALETTE:
- Shadows: Deep blue (#001a4d) with slight desaturation
- Midtones: Cool gray (#4a4a4a) with blue cast
- Highlights: Neon reflection tones (reds, purples, blues)
- Saturation: -15 to -25 overall (desaturated, cool)

NEON ACCENT LAYER:
- Red/Magenta signs: Boost to +30 saturation
- Blue signs: Boost to +25 saturation
- Purple signs: Boost to +20 saturation
- Keep cool color temperature: 4000K-5000K (not warm)

CONTRAST & CURVE:
- Shadow Lift: +5 to +8 (preserve detail in rain)
- Highlight Crush: -8 to -10 (neon pops brighter)
- Mid-tone Curve: Slight S-curve for clarity
- Overall Gamma: -0.1 (slightly darker, moodier)

EFFECTS:
- Vignette: Light (-10%) to frame subject
- Grain: Add 8-12% for cinematic texture
- Diffusion: Minimal on rain scenes (let rain be diffusion)
- Color Wheels: 
  * Shadows: Slight blue shift (-2% blue, -3% red)
  * Midtones: Neutral
  * Highlights: Neon colors dominant
```

**Reference Color Grades:**
- Bourne Identity (cool, practical)
- Mission Impossible franchise (blue-gray spy aesthetic)
- Nolan films (high contrast, cool)

### Visual Effects (5-10 minutes, if needed)

**Optional Enhancements:**

```
Effect 1: Impact Flash
- Timing: Exact frame of impact
- Color: White or neon (context-dependent)
- Duration: 2-4 frames (0.08-0.16 seconds)
- Opacity: 40-60%
- Application: Major strikes only

Effect 2: Light Lens Flare
- Timing: When neon reflects off water
- Size: Subtle, realistic
- Color: Match neon source
- Opacity: 20-30%
- Application: 2-3 moments maximum

Effect 3: Motion Blur Enhancement
- Areas: Fast limbs during kicks/throws
- Strength: 1.5-2.0x (not extreme)
- Direction: Directional blur matching movement
- Application: Heighten speed perception

Effect 4: Screen Shake
- Timing: Major impacts (wall hit, throw landing)
- Magnitude: 2-3 pixels
- Duration: 0.1-0.2 seconds
- Falloff: Smooth decay
- Application: Realism, not distraction

Effect 5: Depth of Field Adjustment
- Focus: Maintain on primary subject (Agent)
- Foreground: Slight blur of rain
- Background: Slightly soft (neon signs)
- Transition: Smooth, not jarring
```

---

## Step 7: File Export & Delivery

### Output Formats

**For Editing/Distribution:**
```
Format: ProRes 422 HQ
Codec: Apple ProRes 422 HQ
Resolution: 3840x2160 (4K)
Frame Rate: 23.976fps (matches cinema standard)
Color Space: Rec.709
Audio: Stereo PCM 48kHz
Container: MOV

File Size: ~800MB-1.2GB (3-minute timeline segment)
```

**For Web/Streaming:**
```
Format: H.264 MP4
Codec: H.264 (progressive)
Resolution: 1920x1080 (1080p)
Frame Rate: 23.976fps
Bitrate: 8-12 Mbps
Audio: AAC Stereo 128kbps
Container: MP4

File Size: ~150-200MB (10-15 second clip)
```

**For Social Media:**
```
Format: H.264 MP4
Codec: H.264 (progressive)
Resolution: 1080x1080 (Instagram, TikTok)
Frame Rate: 30fps
Bitrate: 6-8 Mbps
Audio: AAC Stereo 96kbps
Container: MP4

File Size: ~80-120MB (10-15 second clip)
```

---

## Step 8: Quality Checkpoints

### Pre-Export Review

**Visual Quality:**
- [ ] Color grading applied consistently
- [ ] Neon pops visible (not blown out)
- [ ] Rain visible in all frames
- [ ] Shadows maintain detail
- [ ] Motion blur appropriate (not excessive)
- [ ] No compression artifacts

**Audio Quality:**
- [ ] Rain audible but not overwhelming
- [ ] Foley impacts clear and well-timed
- [ ] Music score supports action
- [ ] Breathing audible during tense moments
- [ ] No audio clipping (check waveforms)
- [ ] Balance: Dialogue could be added if needed

**Choreography Verification:**
- [ ] Opening hook effective (establishes stakes)
- [ ] Each exchange distinct (1, 2, 3)
- [ ] Escalation visible (increasingly intense)
- [ ] Climactic moment provides turning point
- [ ] Resolution satisfying (not abrupt)
- [ ] Camera work complements action

**Technical Specifications:**
- [ ] Resolution matches spec (4K or 1080p)
- [ ] Frame rate consistent (24fps)
- [ ] Audio sync perfect (no lip-sync issues)
- [ ] Color space correct (Rec.709)
- [ ] No interlacing or artifacts
- [ ] File size reasonable for format

---

## Timeline Estimate

| Phase | Time | Status |
|-------|------|--------|
| Brief Preparation | ✅ Complete | 2 hours |
| Seedance 2.0 Generation | ⏳ Pending | 2-5 min |
| Raw Video Review | ⏳ Next | 10 min |
| Audio Design | ⏳ Next | 20 min |
| Color Grading | ⏳ Next | 15 min |
| VFX (Optional) | ⏳ Next | 10 min |
| Final Export | ⏳ Next | 5 min |
| **Total Production** | **~3 hours** | Ready |

---

## Troubleshooting Guide

### Generation Issues

**Problem:** Seedance 2.0 doesn't capture "efficient" fighting style
- **Solution:** Emphasize "no flashy moves," "economical motion," "tactical purpose" in brief
- **Alternative:** Adjust prompt to highlight Bourne/Bond aesthetic

**Problem:** Rain feels disconnected from action
- **Solution:** Reference brief emphasizes water displacement, splashing, reflection
- **Fix:** Ensure environmental interaction section is detailed

**Problem:** Agent physicality doesn't match reference image
- **Solution:** Include physical description from reference (athletic build, dark formal wear)
- **Fix:** Provide image with clear visible features

### Audio Issues

**Problem:** Foley sounds synthetic
- **Solution:** Use organic sound libraries (real rain, real impacts)
- **Alternative:** Record Foley yourself (punch impacts, water splashes)

**Problem:** Music overpowers action
- **Solution:** Lower music layer to -8dB minimum
- **Fix:** Use instrumental (orchestral strings, no vocals)

**Problem:** Dialogue needed but brief doesn't include it
- **Solution:** Add dialogue to specific exchange moments
- **Fix:** Re-generate or add dialogue in post-production

### Color Grade Issues

**Problem:** Image looks too dark (blue cast overwhelming)
- **Solution:** Raise shadow lift (+8 to +10), brighten neon pops
- **Fix:** Check monitor calibration (gamma 2.4)

**Problem:** Neon doesn't pop enough
- **Solution:** Boost saturation of neon colors (+25 to +30)
- **Fix:** Increase highlights in specific color range

**Problem:** Rain invisible in graded footage
- **Solution:** Add slight diffusion, raise highlights where rain is visible
- **Fix:** Create separate grade for rain moments

---

## Professional Enhancement Options

### Optional Upgrades

**VFX Studio Enhancement** (~$500-1000)
- Professional motion tracking for light effects
- Advanced particle effects (rain enhancement)
- Color correction by professional colorist
- Sound mix by professional sound designer

**AI Enhancement** (~$200-400)
- Frame interpolation (24fps → 60fps for slow-motion)
- Upscaling (1080p → 4K)
- AI denoise (reduce compression artifacts)
- Auto color correction (Topaz, Adobe)

**Music Composition** (~$300-800)
- Custom orchestral score composition
- Professional orchestra recording
- Sound design by professionals
- Mix and master for final deliverable

---

## Skill Integration with Seedance 2.0

### Invoking the Fight-Scenes Skill

```bash
# Option 1: Direct invocation
/seedance-fight-scenes

# Option 2: With context
Use /seedance-fight-scenes skill:
[Paste brief content]

# Option 3: With reference
/seedance-fight-scenes
Reference Image: [gym photo]
Brief: [Complete content]
```

### Expected Skill Output

The skill will:
1. ✅ Validate choreography terminology
2. ✅ Ensure camera movements specified
3. ✅ Confirm environmental interaction
4. ✅ Generate optimized Seedance 2.0 prompt
5. ✅ Provide production recommendations

---

## Final Deliverable Checklist

- [ ] Brief completed: `dhurandhar-spy-action-brief.md`
- [ ] Reference image attached: gym/pinstriped photo
- [ ] Skill invoked: `/seedance-fight-scenes`
- [ ] Video generated: Raw 4K export
- [ ] Audio mixed: Foley + music + ambience
- [ ] Color graded: Cool spy thriller palette
- [ ] VFX applied: Impacts, light effects
- [ ] Final export: 1080p MP4 + 4K ProRes
- [ ] Quality review: All checkpoints passed
- [ ] Ready for distribution: True

---

## Next Steps

1. **Submit to Seedance 2.0:**
   - Use the `/seedance-fight-scenes` skill
   - Paste the complete brief
   - Attach reference image
   - Specify output format (4K preferred)

2. **Monitor Generation:**
   - Check preview every 30 seconds
   - Note any issues or deviations
   - Be ready to provide corrections

3. **Post-Production:**
   - Download raw video
   - Begin color grading immediately
   - Add audio design layer
   - Export finals

4. **Distribution:**
   - Upload to portfolio
   - Share with team/stakeholders
   - Gather feedback
   - Iterate if needed

---

**Status:** ✅ Ready for Seedance 2.0 Submission

**Estimated ROI:** Professional spy thriller quality, indie production speed

**Time Investment:** 3 hours total (most automated by Seedance 2.0)
