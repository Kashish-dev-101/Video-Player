# Video Player using Video.js 

This project is a sample Video.js based streaming player used to test and demonstrate playback for

1. HLS streams using m3u8 manifests  
2. DASH streams using mpd manifests  
3. Progressive MP4 playback  

It also includes a quality selection menu for adaptive streams when multiple renditions are available, along with a set of Video.js VHS tuning options that make it useful for experimentation and learning.

## Live demo

You can access the hosted version of this sample player here  

https://kashish-dev-101.github.io/Video-Player

## What you can do with this player

1. Paste a video URL and start playback  
2. Choose the expected format mode  
   1. Adaptive for HLS or DASH  
   2. MP4 for progressive playback  
3. Let Video.js detect available renditions on adaptive streams and expose a quality selector  
4. Experiment with ABR behavior and buffering configuration via Video.js VHS options  

## Supported formats

### HLS

HLS streams are identified by the `.m3u8` file extension and are played using Video.js HTTP Streaming, commonly referred to as VHS  
https://github.com/videojs/http-streaming

### DASH

DASH streams are identified by the `.mpd` file extension and are also played through Video.js VHS  
https://github.com/videojs/http-streaming

### Progressive MP4

Progressive streaming refers to serving a single MP4 file over HTTP where playback starts as data is downloaded. Unlike HLS or DASH, it is not segmented and does not support adaptive bitrate switching.

## Adaptive Bitrate Streaming

Adaptive Bitrate Streaming, often called ABR, is a technique where multiple renditions of the same video are available at different resolutions and bitrates such as 360p, 480p, or 720p. During playback, the player automatically switches between these renditions based on current network conditions and buffer health to reduce rebuffering and improve playback stability.

In this sample, ABR is handled by Video.js VHS.

For an overview of how Adaptive Bitrate Streaming works in ImageKit, see  
https://imagekit.io/docs/adaptive-bitrate-streaming

## Key Video.js features used

### Video.js HTTP Streaming VHS

This player relies on VHS for both HLS and DASH playback and configures several tuning options including

1. Adaptive bitrate selection behavior  
2. Low initial playlist selection  
3. Buffer targets and waterlines  
4. Player dimension based rendition limiting  
5. Device pixel ratio aware rendition selection  

VHS is included by default with Video.js and enables consistent adaptive streaming across browsers.

### Quality levels detection

The player listens for quality level additions and initializes the quality selector once multiple renditions are detected. This is powered by the Video.js quality levels API  
https://github.com/videojs/videojs-contrib-quality-levels

### Manual quality selection menu

When more than one quality level exists, the player initializes an HTTP source selector menu and sets the default option to Auto  
https://github.com/jfujita/videojs-http-source-selector

### Resolution label mapping from URL parameters

If the video URL contains a `tr` query parameter with an `sr` list such as `sr-360_480_720`, the player parses these target heights and updates the quality menu labels to match the closest rendition height. This is useful when the displayed quality labels do not directly match the intended output ladder.

## How format detection works in this sample

1. MP4 mode requires the URL to end with `.mp4`  
2. Adaptive mode requires the URL to end with `.m3u8` or `.mpd`  
3. Based on the selected mode, the player sets the correct MIME type before calling `player.src`  

This keeps the sample predictable and avoids incorrect manifest type detection.

## Useful links

1. Video.js official site  
   https://videojs.org  

2. Video.js Getting Started guide  
   https://videojs.org/getting-started  

3. Video.js API documentation  
   https://docs.videojs.com  

4. Video.js HTTP Streaming VHS repository  
   https://github.com/videojs/http-streaming  

5. Video.js quality levels plugin  
   https://github.com/videojs/videojs-contrib-quality-levels  

6. Video.js HTTP source selector plugin  
   https://github.com/jfujita/videojs-http-source-selector  

7. ImageKit Adaptive Bitrate Streaming documentation  
   https://imagekit.io/docs/adaptive-bitrate-streaming  
