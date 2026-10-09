"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react";
import type { SiteLocale } from "@/lib/i18n";

const copy = {
  en: {
    titleSuffix: "product demo",
    startVideo: "Start video",
    play: "Play video",
    pause: "Pause video",
    mute: "Mute",
    unmute: "Unmute",
    seek: "Video progress",
    volume: "Volume",
    fullscreen: "Enter fullscreen",
    exitFullscreen: "Exit fullscreen",
    fallback: "Your browser does not support HTML video.",
  },
  zh: {
    titleSuffix: "产品演示",
    startVideo: "开始播放",
    play: "播放视频",
    pause: "暂停视频",
    mute: "静音",
    unmute: "取消静音",
    seek: "视频进度",
    volume: "音量",
    fullscreen: "进入全屏",
    exitFullscreen: "退出全屏",
    fallback: "你的浏览器不支持 HTML 视频播放。",
  },
  tr: {
    titleSuffix: "ürün demosu",
    startVideo: "Videoyu başlat",
    play: "Videoyu oynat",
    pause: "Videoyu duraklat",
    mute: "Sesi kapat",
    unmute: "Sesi aç",
    seek: "Video ilerlemesi",
    volume: "Ses düzeyi",
    fullscreen: "Tam ekrana geç",
    exitFullscreen: "Tam ekrandan çık",
    fallback: "Tarayıcınız HTML video oynatmayı desteklemiyor.",
  },
  fr: {
    titleSuffix: "Démo produit",
    startVideo: "Lancer la vidéo",
    play: "Lire la vidéo",
    pause: "Mettre la vidéo en pause",
    mute: "Couper le son",
    unmute: "Activer le son",
    seek: "Progression vidéo",
    volume: "Volume",
    fullscreen: "Passer en plein écran",
    exitFullscreen: "Quitter le plein écran",
    fallback: "Votre navigateur ne prend pas en charge la lecture vidéo HTML.",
  },
  ja: {
    titleSuffix: "製品デモ",
    startVideo: "動画を再生",
    play: "動画を再生",
    pause: "動画を一時停止",
    mute: "ミュート",
    unmute: "ミュートを解除",
    seek: "再生位置",
    volume: "音量",
    fullscreen: "全画面表示",
    exitFullscreen: "全画面表示を終了",
    fallback: "お使いのブラウザーは HTML 動画の再生に対応していません。",
  },
  es: {
    titleSuffix: "demo de producto",
    startVideo: "Iniciar vídeo",
    play: "Reproducir vídeo",
    pause: "Pausar vídeo",
    mute: "Silenciar",
    unmute: "Activar sonido",
    seek: "Progreso del vídeo",
    volume: "Volumen",
    fullscreen: "Entrar en pantalla completa",
    exitFullscreen: "Salir de pantalla completa",
    fallback: "Tu navegador no admite la reproducción de vídeo HTML.",
  },
} satisfies Record<SiteLocale, {
  titleSuffix: string;
  startVideo: string;
  play: string;
  pause: string;
  mute: string;
  unmute: string;
  seek: string;
  volume: string;
  fullscreen: string;
  exitFullscreen: string;
  fallback: string;
}>;

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, "0");
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = (minutes % 60).toString().padStart(2, "0");
    return `${hours}:${remainingMinutes}:${remainingSeconds}`;
  }
  return `${minutes}:${remainingSeconds}`;
}

export default function ProductVideoSection({ locale }: { locale: SiteLocale }) {
  const t = copy[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const syncFullscreenState = () => {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    };
    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () => document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  const progress = duration > 0 ? Math.min((currentTime / duration) * 100, 100) : 0;
  const audibleVolume = isMuted ? 0 : volume;

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        if (video.ended) video.currentTime = 0;
        await video.play();
        setHasStarted(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (document.fullscreenElement === player) await document.exitFullscreen();
      else await player.requestFullscreen();
    } catch { /* Fullscreen is not available in every browser context. */ }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted || video.volume === 0) {
      if (video.volume === 0) video.volume = volume || 0.5;
      video.muted = false;
    } else {
      video.muted = true;
    }
  };

  return (
    <section
      lang={locale === "zh" ? "zh-CN" : locale}
      aria-labelledby="product-video-title"
      className="mx-auto mt-8 w-full max-w-4xl"
    >
      <h2
        id="product-video-title"
        className="mb-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl"
      >
        <span className="text-primary">Pallas</span> {t.titleSuffix}
      </h2>
      <figure className="overflow-hidden rounded-3xl border border-border/70 bg-card/60 shadow-[var(--shadow-elevated)]">
        <div
          ref={playerRef}
          className="group/player relative aspect-video w-full overflow-hidden bg-white dark:bg-black fullscreen:aspect-auto fullscreen:h-screen fullscreen:w-screen fullscreen:rounded-none"
          onContextMenu={(event) => event.preventDefault()}
        >
          <video
            ref={videoRef}
            aria-label={`Pallas ${t.titleSuffix}`}
            className="absolute inset-0 z-0 h-full w-full bg-white object-contain dark:bg-black"
            controls={false}
            controlsList="nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
            height={1080}
            playsInline
            preload="none"
            width={1920}
            onContextMenu={(event) => event.preventDefault()}
            onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
            onPlay={() => {
              setHasStarted(true);
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onVolumeChange={(event) => {
              setVolume(event.currentTarget.volume);
              setIsMuted(event.currentTarget.muted);
            }}
          >
            <source
              src="https://copilot.asianodeatlas.com/media/landing-video.mp4"
              type="video/mp4"
            />
            {t.fallback}
          </video>
          {!hasStarted && (
            <>
              <Image
                src="/images/pallas-team-knowledge-v2.png"
                alt=""
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                className="pointer-events-none z-10 object-contain p-3 sm:p-5"
              />
              <button
                type="button"
                aria-label={t.startVideo}
                onClick={togglePlayback}
                className="absolute left-1/2 top-1/2 z-20 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:size-20"
              >
                <Play aria-hidden="true" className="ml-1 size-7 fill-current sm:size-8" />
              </button>
            </>
          )}

          <div className="absolute inset-x-0 bottom-0 z-30 flex items-center gap-2 bg-primary px-3 py-2.5 text-primary-foreground sm:gap-3 sm:px-4 sm:py-3">
            <button
              type="button"
              aria-label={isPlaying ? t.pause : t.play}
              onClick={togglePlayback}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
            >
              {isPlaying ? <Pause aria-hidden="true" className="size-5 fill-current" /> : <Play aria-hidden="true" className="size-5 fill-current" />}
            </button>

            <span className="shrink-0 text-xs tabular-nums sm:text-sm">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              aria-label={t.seek}
              aria-valuetext={`${formatTime(currentTime)} / ${formatTime(duration)}`}
              min={0}
              max={duration || 1}
              step={0.1}
              value={duration ? currentTime : 0}
              onChange={(event) => {
                const nextTime = Number(event.currentTarget.value);
                if (videoRef.current) videoRef.current.currentTime = nextTime;
                setCurrentTime(nextTime);
              }}
              className="h-1.5 min-w-0 flex-1 cursor-pointer appearance-none rounded-full accent-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary-foreground)) ${progress}%, hsl(var(--primary-foreground) / 0.35) ${progress}%)`,
              }}
            />

            <span className="shrink-0 text-xs tabular-nums sm:text-sm">
              {formatTime(duration)}
            </span>

            <button
              type="button"
              aria-label={isMuted ? t.unmute : t.mute}
              onClick={toggleMute}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
            >
              {audibleVolume === 0 ? <VolumeX aria-hidden="true" className="size-5" /> : <Volume2 aria-hidden="true" className="size-5" />}
            </button>

            <input
              type="range"
              aria-label={t.volume}
              min={0}
              max={1}
              step={0.05}
              value={audibleVolume}
              aria-valuetext={`${Math.round(audibleVolume * 100)}%`}
              onChange={(event) => {
                const nextVolume = Number(event.currentTarget.value);
                if (videoRef.current) {
                  videoRef.current.volume = nextVolume;
                  videoRef.current.muted = nextVolume === 0;
                }
                setVolume(nextVolume);
                setIsMuted(nextVolume === 0);
              }}
              className="h-1.5 w-12 shrink-0 cursor-pointer appearance-none rounded-full accent-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground sm:w-16"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary-foreground)) ${audibleVolume * 100}%, hsl(var(--primary-foreground) / 0.35) ${audibleVolume * 100}%)`,
              }}
            />

            <button
              type="button"
              aria-label={isFullscreen ? t.exitFullscreen : t.fullscreen}
              onClick={toggleFullscreen}
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-primary-foreground/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
            >
              {isFullscreen ? <Minimize aria-hidden="true" className="size-5" /> : <Maximize aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>
      </figure>
    </section>
  );
}
