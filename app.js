"use strict";

const urlInput = document.querySelector("#video-url");
const playBtn = document.querySelector("#play-btn");

const player = videojs("video-player", {
  controls: true,
  autoplay: false,
  muted: true,
  preload: "metadata",
  fluid: true,
  html5: {
    vhs: {
      overrideNative: true,

      limitRenditionByPlayerDimensions: true,
      useDevicePixelRatio: true,

      enableLowInitialPlaylist: true,

      goalBufferLength: 15,
      bufferLowWaterLine: 5,
      bufferHighWaterLine: 30,

      experimentalBufferBasedABR: true,
    },
    nativeAudioTracks: false,
    nativeVideoTracks: false,
  },
});

let selectorReadyForThisSource = false;
let lastVideoUrlForLabels = "";

function detectType(videoURL, selectedFormat) {
  const clean = videoURL.split("?")[0].toLowerCase();
  const ext = clean.split(".").pop();

  if (selectedFormat === "mp4") {
    if (ext !== "mp4")
      return { error: "MP4 mode selected but URL is not an mp4 file." };
    return { type: "video/mp4" };
  }

  if (selectedFormat === "adaptive") {
    if (ext === "m3u8") return { type: "application/x-mpegURL" };
    if (ext === "mpd") return { type: "application/dash+xml" };
    return { error: "Adaptive mode selected but URL is not m3u8 or mpd." };
  }

  return { error: "Please select a valid format." };
}

function parseSrHeightsFromUrl(videoURL) {
  try {
    const url = new URL(videoURL);
    const tr = url.searchParams.get("tr") || "";
    const match = tr.match(/(?:^|,)\s*sr-([0-9_]+)\s*(?:,|$)/);
    if (!match) return [];

    return match[1]
      .split("_")
      .map((n) => Number(n))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

function closestTargetHeight(actualHeight, targets) {
  if (!targets.length) return actualHeight;

  let best = targets[0];
  let bestDiff = Math.abs(actualHeight - best);

  for (let i = 1; i < targets.length; i++) {
    const t = targets[i];
    const diff = Math.abs(actualHeight - t);
    if (diff < bestDiff) {
      best = t;
      bestDiff = diff;
    }
  }
  return best;
}

function applySrLabelsFromUrl(videoURL) {
  const targets = parseSrHeightsFromUrl(videoURL);
  if (!targets.length) return;

  const button = player.el().querySelector(".vjs-http-source-selector");
  if (!button) return;

  const items = button.querySelectorAll(".vjs-menu li.vjs-menu-item");
  if (!items.length) return;

  items.forEach((item) => {
    const textEl = item.querySelector(".vjs-menu-item-text");
    if (!textEl) return;

    const currentText = (textEl.textContent || "").trim().toLowerCase();
    if (currentText === "auto") return;

    const num = Number(currentText.replace("p", ""));
    if (!Number.isFinite(num)) return;

    const mapped = closestTargetHeight(num, targets);
    textEl.textContent = `${mapped}p`;
  });
}

function initHttpSourceSelectorIfPossible() {
  if (selectorReadyForThisSource) return;

  if (typeof player.httpSourceSelector !== "function") {
    console.warn("httpSourceSelector plugin not available");
    return;
  }

  if (typeof player.qualityLevels !== "function") {
    console.warn("qualityLevels plugin not available");
    return;
  }

  const levels = player.qualityLevels();

  if (levels.length < 2) {
    return;
  }

  player.httpSourceSelector({ default: "auto" });
  selectorReadyForThisSource = true;

  setTimeout(() => {
    if (lastVideoUrlForLabels) {
      applySrLabelsFromUrl(lastVideoUrlForLabels);
    }
  }, 0);

  console.log("Quality levels found:", levels.length);
  for (let i = 0; i < levels.length; i++) {
    const l = levels[i];
    console.log(i, l.height, l.width, l.bitrate);
  }
}

player.ready(() => {
  if (typeof player.qualityLevels === "function") {
    const levels = player.qualityLevels();

    levels.on("addqualitylevel", () => {
      initHttpSourceSelectorIfPossible();
    });
  }

  player.on("loadstart", () => {
    selectorReadyForThisSource = false;
  });

  player.on("loadedmetadata", () => {
    initHttpSourceSelectorIfPossible();

    setTimeout(() => {
      initHttpSourceSelectorIfPossible();
    }, 300);

    setTimeout(() => {
      if (lastVideoUrlForLabels) {
        applySrLabelsFromUrl(lastVideoUrlForLabels);
      }
    }, 500);
  });
});

playBtn.addEventListener("click", () => {
  const videoURL = urlInput.value.trim();
  if (!videoURL) return;

  const selectedFormat = document.querySelector(
    'input[name="format"]:checked'
  )?.value;
  if (!selectedFormat) return;

  const { type, error } = detectType(videoURL, selectedFormat);
  if (error) {
    console.warn(error);
    return;
  }

  lastVideoUrlForLabels = videoURL;

  player.pause();
  player.reset();

  player.src({ src: videoURL, type });

  player.play().catch(() => {});
  urlInput.value = "";
});
