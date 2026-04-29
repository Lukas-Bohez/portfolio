'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

export default function ImageLightbox({
  src,
  alt,
  className = '',
  imgClassName = '',
  width,
  height,
  fill = false,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastTouchDist, setLastTouchDist] = useState(0);

  const imageRef = useRef<HTMLImageElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Clamp pan values to prevent image from going too far off screen
  const clampPan = (x: number, y: number, currentZoom: number) => {
    if (currentZoom <= 1) return { x: 0, y: 0 };

    const img = imageRef.current;
    if (!img) return { x, y };

    const rect = img.getBoundingClientRect();
    const maxPanX = (rect.width * (currentZoom - 1)) / 2;
    const maxPanY = (rect.height * (currentZoom - 1)) / 2;

    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, x)),
      y: Math.max(-maxPanY, Math.min(maxPanY, y)),
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!isOpen) return;
    e.preventDefault();

    const newZoom = Math.max(1, Math.min(4, zoom - e.deltaY * 0.001));
    setZoom(newZoom);

    // If zooming back to 1, reset pan
    if (newZoom === 1) {
      setPanX(0);
      setPanY(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX,
      panY,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    const newX = dragStartRef.current.panX + deltaX;
    const newY = dragStartRef.current.panY + deltaY;

    const clamped = clampPan(newX, newY, zoom);
    setPanX(clamped.x);
    setPanY(clamped.y);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    if (zoom > 1) {
      setZoom(1);
      setPanX(0);
      setPanY(0);
    } else {
      setZoom(2);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setLastTouchDist(dist);
    } else if (e.touches.length === 1) {
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        panX,
        panY,
      };
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && lastTouchDist > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const zoomFactor = dist / lastTouchDist;
      const newZoom = Math.max(1, Math.min(4, zoom * zoomFactor));
      setZoom(newZoom);
      setLastTouchDist(dist);
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      const deltaX = e.touches[0].clientX - dragStartRef.current.x;
      const deltaY = e.touches[0].clientY - dragStartRef.current.y;

      const newX = dragStartRef.current.panX + deltaX;
      const newY = dragStartRef.current.panY + deltaY;

      const clamped = clampPan(newX, newY, zoom);
      setPanX(clamped.x);
      setPanY(clamped.y);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setLastTouchDist(0);
  };

  const handleZoomIn = () => {
    const newZoom = Math.min(4, zoom + 0.5);
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(1, zoom - 0.5);
    setZoom(newZoom);
    if (newZoom === 1) {
      setPanX(0);
      setPanY(0);
    }
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      try {
        await containerRef.current.requestFullscreen().catch(() => {
          // Fallback for browsers that don't support fullscreen
        });
        setIsFullscreen(true);
      } catch (err) {
        console.error('Fullscreen request failed:', err);
      }
    } else {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      } catch (err) {
        console.error('Exit fullscreen failed:', err);
      }
    }
  };

  const handleCloseLightbox = () => {
    if (isFullscreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    } else {
      setIsOpen(false);
      setZoom(1);
      setPanX(0);
      setPanY(0);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        handleResetZoom();
      }
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleWheelEvent = (e: WheelEvent) => {
      e.preventDefault();
      const newZoom = Math.max(1, Math.min(4, zoom - e.deltaY * 0.001));
      setZoom(newZoom);
      if (newZoom === 1) {
        setPanX(0);
        setPanY(0);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    containerRef.current?.addEventListener('wheel', handleWheelEvent, { passive: false });
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      containerRef.current?.removeEventListener('wheel', handleWheelEvent);
      document.body.style.overflow = '';
    };
  }, [isOpen, isFullscreen, zoom, panX, panY]);

  return (
    <>
      <div className={`relative inline-block ${className}`}>
        <button
          type="button"
          className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-lg ${fill ? 'h-full' : ''}`}
          onClick={() => setIsOpen(true)}
          aria-label={`Zoom in on ${alt}`}
          title="Click to zoom"
        >
          {fill ? (
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-contain bg-gray-100 ${imgClassName}`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={`w-full object-contain bg-gray-100 ${imgClassName}`}
            />
          )}
          <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
              />
            </svg>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main image container */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              ref={imageRef}
              src={src}
              alt={alt}
              className={`max-h-[calc(100%-100px)] max-w-[90vw] object-contain transition-transform duration-75 ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
                transformOrigin: 'center center',
              }}
              onDoubleClick={handleDoubleClick}
              draggable={false}
            />
          </div>

          {/* Controls bar */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 rounded-xl bg-black/80 px-4 py-2 backdrop-blur-sm">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
              aria-label="Zoom out"
            >
              <span className="text-lg">−</span>
              <span className="text-sm">Out</span>
            </button>

            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
              <span className="font-mono text-sm font-semibold text-white">{zoom.toFixed(1)}×</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
              aria-label="Zoom in"
            >
              <span className="text-lg">+</span>
              <span className="text-sm">In</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleResetZoom();
              }}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
              aria-label="Reset zoom"
            >
              <span className="text-sm">↺</span>
              <span className="text-sm">Reset</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFullscreen();
              }}
              className="flex items-center gap-1 rounded-lg bg-white/10 px-3 py-2 text-white transition hover:bg-white/20"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <span className="text-lg">{isFullscreen ? '⤢' : '⛶'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCloseLightbox();
              }}
              className="flex items-center gap-1 rounded-lg bg-red-600/40 px-3 py-2 text-white transition hover:bg-red-600/60"
              aria-label="Close lightbox"
            >
              <span className="text-lg">✕</span>
              <span className="text-sm">Close</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
