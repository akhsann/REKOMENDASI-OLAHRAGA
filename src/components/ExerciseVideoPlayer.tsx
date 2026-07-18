import { useEffect, useRef, useState } from 'react';
import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mapping Exercise ID ke Video File Name atau YouTube URL
export const exerciseVideoMap: Record<string, string> = {
  ex1:  '/Video/ex1.mp4',   // Angkat Beban
  ex2:  '/Video/ex2.mp4',   // Dumbbell
  ex3:  '/Video/ex3.mp4',   // Squats
  ex4:  'https://youtu.be/Fc85U3UgC0E?si=WB8gN41fxFjHfUzX', // HIIT (YouTube)
  ex5:  '/Video/ex5.mp4',   // Berjalan Santai
  ex6:  '/Video/ex6.mp4',   // Lari Santai (Jogging)
  ex7:  '/Video/ex7.mp4',   // Bersepeda Statis
  ex8:  '/Video/ex8.mp4',   // Bersepeda Luar
  ex9:  '/Video/ex9.mp4',   // Berenang
  ex10: 'https://youtu.be/871uim_3l1A?si=m8MexbJv_JmnJGzv', // Yoga (YouTube)
  ex11: '/Video/ex11.mp4',  // Stepper
  ex12: 'https://youtu.be/y5OabVgga0E?si=ZJDb6d7Lyh38SxdW', // Aerobik (YouTube)
  ex13: '/Video/ex13.mp4',  // Rowing Machine
  ex14: '/Video/ex14.mp4',  // Mesin Elipse (Elliptical)
  ex15: '/Video/ex15.mp4',  // Sepatu Roda
  ex16: '/Video/ex16.mp4',  // Lompat Tali
  ex17: 'https://youtu.be/OiBCicV_cec?si=nzvQtyYRUlLHoYTb&t=26', // Pilates (YouTube)
  ex18: 'https://youtu.be/CKUuR_gGfVg?si=ryGHCDa1Fmb4sW7W&t=23',  // Zumba (YouTube)
  ex19: '/Video/ex19.mp4',  // Golf
  ex20: '/Video/ex20.mp4',  // Bulu Tangkis
  ex21: '/Video/ex21.mp4',  // Tenis
  ex22: '/Video/ex22.mp4',  // Padel
  ex23: '/Video/ex23.mp4',  // Bola basket
  ex24: '/Video/ex24.mp4',  // Bola Voli
  ex25: '/Video/ex25.mp4',  // Sepak Bola
  ex26: '/Video/ex26.mp4',  // Tenis Meja
};

interface ExerciseVideoPlayerProps {
  exerciseId: string;
  exerciseName: string;
  isPlaying: boolean;
  className?: string;
  autoPlayMuted?: boolean;
}

// Helper to extract YouTube video ID
function getYouTubeVideoId(url: string): string {
  if (!url) return '';
  if (!url.includes('http') && url.length === 11) {
    return url;
  }
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}

export function ExerciseVideoPlayer({
  exerciseId,
  exerciseName,
  isPlaying,
  className = '',
  autoPlayMuted = true,
}: ExerciseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted] = useState(autoPlayMuted);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const rawVideoUrl = exerciseVideoMap[exerciseId] || '';
  const isYouTube = rawVideoUrl.includes('youtube.com') || rawVideoUrl.includes('youtu.be');

  // Untuk Capacitor Android, video harus diakses via http://localhost
  // Deteksi apakah berjalan di Capacitor Android (bukan web biasa)
  const isCapacitorAndroid =
    typeof (window as any).Capacitor !== 'undefined' &&
    typeof (window as any).Capacitor.getPlatform === 'function' &&
    (window as any).Capacitor.getPlatform() === 'android';
  const buildVideoUrl = (path: string): string => {
    if (!path || isYouTube) return path;
    // Jika sudah absolute URL, kembalikan apa adanya
    if (path.startsWith('http')) return path;
    // Di Capacitor Android, gunakan http://localhost sebagai base
    if (isCapacitorAndroid) {
      return `http://localhost${path}`;
    }
    return encodeURI(path);
  };

  const videoUrl = isYouTube ? rawVideoUrl : buildVideoUrl(rawVideoUrl);
  const youtubeId = isYouTube ? getYouTubeVideoId(videoUrl) : '';
  const embedUrl = isYouTube
    ? `https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${youtubeId}&playsinline=1`
    : '';

  // Control YouTube video via postMessage when isPlaying changes
  useEffect(() => {
    if (!isYouTube || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const sendCommand = (func: string) => {
      try {
        iframe.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: func,
            args: [],
          }),
          '*'
        );
      } catch (e) {
        console.error('Error sending postMessage to YouTube player:', e);
      }
    };

    if (isPlaying) {
      sendCommand('playVideo');
    } else {
      sendCommand('pauseVideo');
    }
  }, [isPlaying, isYouTube]);

  // Synchronize playing state with isPlaying prop (for HTML5 video)
  useEffect(() => {
    if (isYouTube) return;
    const video = videoRef.current;
    if (!video || hasError) return;

    // Explicitly set muted property to bypass React's muted attribute bug
    video.muted = isMuted;

    if (isPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Auto-play was prevented by browser security:', err);
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying, hasError, isMuted, isYouTube]);

  // Handle video source changes
  useEffect(() => {
    if (isYouTube) {
      setIsLoading(false);
      setHasError(false);
      return;
    }
    setHasError(false);
    setIsLoading(true);
    const video = videoRef.current;
    if (video) {
      video.load();
      video.muted = isMuted;
      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Auto-play on source change prevented:', err);
          });
        }
      }
    }
  }, [videoUrl, isPlaying, isMuted, isYouTube]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    if (isPlaying && iframeRef.current) {
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: [],
          }),
          '*'
        );
      }, 150);
    }
  };


  const handleVideoError = () => {
    console.error(`Gagal memuat video latihan untuk ID: ${exerciseId} di path: ${videoUrl}`);
    setHasError(true);
    setIsLoading(false);
  };

  if (!videoUrl || hasError) {
    return (
      <Card className={`overflow-hidden border-dashed border-2 border-muted bg-secondary/20 flex flex-col items-center justify-center p-6 text-center ${className}`}>
        <Info className="h-10 w-10 text-muted-foreground mb-2 animate-pulse" />
        <h4 className="font-semibold text-sm text-foreground">Visualisasi Olahraga</h4>
        <p className="text-xs text-muted-foreground max-w-xs mt-1">
          Video demonstrasi tidak tersedia untuk {exerciseName}. Lakukan latihan secara mandiri dengan petunjuk tertulis.
        </p>
      </Card>
    );
  }

  return (
    <Card className={`overflow-hidden border bg-card/85 backdrop-blur-md shadow-premium transition-all duration-300 ${className}`}>
      <CardContent className="p-0 relative group aspect-video bg-black flex items-center justify-center">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* HTML5 Video or YouTube Embed */}
        {isYouTube ? (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="w-full h-full object-cover border-0"
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={exerciseName}
            onLoad={handleIframeLoad}
          />
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            loop
            muted={isMuted}
            autoPlay={isPlaying}
            playsInline
            preload="auto"
            onWaiting={() => setIsLoading(true)}
            onPlaying={() => setIsLoading(false)}
            onTimeUpdate={() => setIsLoading(false)}
            onCanPlay={() => {
              setIsLoading(false);
              const video = videoRef.current;
              if (video) {
                video.muted = isMuted;
                if (isPlaying) {
                  const playPromise = video.play();
                  if (playPromise !== undefined) {
                    playPromise.catch((err) => {
                      console.warn('Auto-play failed on canplay event:', err);
                    });
                  }
                }
              }
            }}
            onError={handleVideoError}
          />
        )}

        {/* Video Overlay Info & Status */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-100 transition-opacity flex flex-col justify-between p-3 pointer-events-none">
          {/* Top Bar */}
          <div className="flex justify-end items-start w-full">
            {!isPlaying && (
              <Badge variant="secondary" className="bg-primary text-primary-foreground font-semibold text-xs py-1 shadow-glow animate-pulse">
                Jeda
              </Badge>
            )}
          </div>

          {/* Bottom Bar Controls Indicator */}
          <div className="flex justify-between items-end w-full">
            <span className="text-white/80 text-xs font-semibold drop-shadow-md">
              {exerciseName}
            </span>
          </div>
        </div>

        {/* Interactive Controls Overlay (visible on hover or focus - only for HTML5 video) */}
      </CardContent>
    </Card>
  );
}
