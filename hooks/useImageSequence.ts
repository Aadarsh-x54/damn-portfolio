"use client";

import { useEffect, useRef, useState } from "react";
import { TOTAL_FRAMES, getFramePath } from "@/lib/utils";

/**
 * Aggressively preloads the entire image sequence into memory.
 * Returns the image array, a loading progress (0–1), and a ready flag.
 *
 * Strategy: load all frames in parallel using HTMLImageElement.
 * The images are stored in a ref so they're never garbage collected
 * during the session, ensuring instant canvas draws.
 */
export function useImageSequence() {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = getFramePath(i);

        img.onload = () => {
          images[i] = img;
          loadedCount++;
          setProgress(loadedCount / TOTAL_FRAMES);
          resolve();
        };

        img.onerror = () => {
          // Fallback: still count it to avoid hanging
          console.warn(`Failed to load frame ${i}`);
          loadedCount++;
          setProgress(loadedCount / TOTAL_FRAMES);
          resolve();
        };
      });
    });

    Promise.all(promises).then(() => {
      imagesRef.current = images;
      setIsLoaded(true);
    });
  }, []);

  return { images: imagesRef, progress, isLoaded };
}
