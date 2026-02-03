# Video Player using Video.js and ImageKit

This project is a sample Video.js based streaming player used to test and demonstrate playback for:

1. HLS streams using m3u8 manifests
2. DASH streams using mpd manifests
3. Progressive MP4 playback

It also includes a quality selection menu for adaptive streams when multiple renditions are available, along with a set of Video.js VHS tuning options that make it useful for experimentation and learning.

**Live Demo:** [https://kashish-dev-101.github.io/Video-Player](https://kashish-dev-101.github.io/Video-Player)

---

## What You Can Do With This Player

1. Paste a video URL and start playback
2. Choose the expected format mode:
   - **Adaptive** for HLS or DASH
   - **MP4** for progressive playback
3. Let Video.js detect available renditions on adaptive streams and expose a quality selector
4. Experiment with ABR behavior and buffering configuration via Video.js VHS options

---

## Supported Formats

### HLS

HLS streams are identified by the `.m3u8` file extension and are played using Video.js HTTP Streaming (VHS).

Learn more: [Video.js HTTP Streaming (VHS)](https://github.com/videojs/http-streaming)

### DASH

DASH streams are identified by the `.mpd` file extension and are also played through Video.js VHS.

Learn more: [Video.js HTTP Streaming (VHS)](https://github.com/videojs/http-streaming)

### Progressive MP4

Progressive streaming refers to serving a single MP4 file over HTTP where playback starts as data is downloaded. Unlike HLS or DASH, it is not segmented and does not support adaptive bitrate switching.

---

## Adaptive Bitrate Streaming (ABR)

Adaptive Bitrate Streaming is a technique where multiple renditions of the same video are available at different resolutions and bitrates (e.g., 360p, 480p, 720p). During playback, the player automatically switches between these renditions based on current network conditions and buffer health to reduce rebuffering and improve playback stability.

In this sample, ABR is handled by Video.js VHS.

Learn more: [ImageKit Adaptive Bitrate Streaming](https://imagekit.io/docs/adaptive-bitrate-streaming)

---

## VHS Configuration Used

This player uses the following [Video.js HTTP Streaming (VHS)](https://github.com/videojs/http-streaming#options) configuration:

| Option | Value | Description |
|--------|-------|-------------|
| `overrideNative` | `true` | Use VHS instead of native HLS (Safari) |
| `limitRenditionByPlayerDimensions` | `true` | Don't load renditions larger than player size |
| `useDevicePixelRatio` | `true` | Account for retina displays when selecting renditions |
| `enableLowInitialPlaylist` | `true` | Start with lower quality for faster initial load |
| `goalBufferLength` | `15` | Target buffer length in seconds |
| `bufferLowWaterLine` | `5` | Minimum buffer before advancement |
| `bufferHighWaterLine` | `30` | Maximum buffer to maintain |
| `experimentalBufferBasedABR` | `true` | Use buffer-based ABR algorithm |

---

## Key Video.js Features Used

### Video.js HTTP Streaming (VHS)

VHS is the built-in adaptive streaming engine in Video.js that handles both HLS and DASH playback. It enables consistent streaming across browsers without requiring native HLS support.

Learn more: [What is VHS?](https://github.com/videojs/http-streaming#video-playback-and-the-web)

### Quality Levels Detection

The player listens for quality level additions and initializes the quality selector once multiple renditions are detected.

Plugin: [videojs-contrib-quality-levels](https://github.com/videojs/videojs-contrib-quality-levels)

### Manual Quality Selection Menu

When more than one quality level exists, the player initializes an HTTP source selector menu and sets the default option to "Auto".

Plugin: [videojs-http-source-selector](https://github.com/jfujita/videojs-http-source-selector)

### Resolution Label Mapping from URL Parameters

If the video URL contains a `tr` query parameter with an `sr` list such as `sr-360_480_720`, the player parses these target heights and updates the quality menu labels to match the closest rendition height. This is useful when the displayed quality labels do not directly match the intended output ladder.

---

## How Format Detection Works

1. **MP4 mode** requires the URL to end with `.mp4`
2. **Adaptive mode** requires the URL to end with `.m3u8` or `.mpd`
3. Based on the selected mode, the player sets the correct MIME type before calling `player.src()`

This keeps the sample predictable and avoids incorrect manifest type detection.

---

## How to Test ABR Behavior

1. Open the [Live Demo](https://kashish-dev-101.github.io/Video-Player) in Chrome
2. Open DevTools (F12) → **Network** tab
3. Click the throttling dropdown (shows "No throttling" by default)
4. Select **Slow 3G** or **Fast 3G**
5. Paste an HLS/DASH URL and click Play
6. Watch the quality selector - it should adapt based on network conditions
7. Check the Network tab to see different quality segments being loaded

**Tip:** You can also use the quality selector menu to manually switch between renditions and observe the player behavior.

---

## Browser Support

VHS works best in modern browsers:

| Browser | Support |
|---------|---------|
| Chrome | Full support |
| Firefox | Full support |
| Edge | Full support |
| Safari | Full support (uses native HLS when beneficial) |
| Mobile browsers | Full support |

---

## Useful Links

- [Video.js Official Site](https://videojs.org)
- [Video.js Getting Started Guide](https://videojs.org/getting-started)
- [Video.js API Documentation](https://docs.videojs.com)
- [Video.js HTTP Streaming (VHS)](https://github.com/videojs/http-streaming)
- [VHS Options Reference](https://github.com/videojs/http-streaming#options)
- [videojs-contrib-quality-levels Plugin](https://github.com/videojs/videojs-contrib-quality-levels)
- [videojs-http-source-selector Plugin](https://github.com/jfujita/videojs-http-source-selector)
- [ImageKit Adaptive Bitrate Streaming](https://imagekit.io/docs/adaptive-bitrate-streaming)
