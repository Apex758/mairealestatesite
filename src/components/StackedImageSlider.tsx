import React, { useEffect, useRef, useState } from 'react';

interface StackedImageSliderProps {
  images: string[];
}

export function StackedImageSlider({ images }: StackedImageSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const intervalRef = useRef<number>();
  const targetImageSrc = useRef<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .stacked-slider {
        position: relative;
        width: 100%;
        height: 726px;
        margin: 0 auto;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      .stacked-slider img {
        position: absolute;
        height: 726px;
        left: 0;
        width: 1089px;
        border-radius: 4px;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
        object-fit: cover;
        will-change: transform, opacity, filter;
        backface-visibility: hidden;
        transform-style: preserve-3d;
        cursor: pointer;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                    filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .stacked-slider img:nth-child(1) {
        transform: translateX(75px);
        opacity: 0;
        z-index: 1;
        filter: blur(1px);
      }

      .stacked-slider img:nth-child(2) {
        transform: translateX(55px);
        opacity: 0.33;
        z-index: 2;
        filter: blur(0.5px);
      }

      .stacked-slider img:nth-child(3) {
        transform: translateX(35px);
        opacity: 0.66;
        z-index: 3;
        filter: blur(0);
      }

      .stacked-slider img:nth-child(4) {
        transform: translateX(0);
        opacity: 1;
        z-index: 4;
        filter: blur(0);
      }

      @keyframes evaporate {
        0% {
          transform: translateX(0);
          opacity: 1;
          filter: blur(0);
        }
        100% {
          transform: translateX(-50px) scale(0.95);
          opacity: 0;
          filter: blur(4px);
        }
      }

      @keyframes fadeIn {
        0% {
          transform: translateX(-100px);
          opacity: 0;
          filter: blur(4px);
        }
        100% {
          transform: translateX(75px);
          opacity: 0;
          filter: blur(1px);
        }
      }

      .evaporate {
        animation: evaporate 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
      }

      .fade-in {
        animation: fadeIn 400ms cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
      }

      .fast-fade-in {
        animation: fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
      }

      .thumbnail-container {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 16px;
      }

      .thumbnail {
        width: 80px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0.6;
        transform: scale(0.9);
        transition: all 0.3s ease;
        margin: 0 4px;
      }

      .thumbnail.active {
        opacity: 1;
        transform: scale(1.1);
        border: 2px solid #3b82f6;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      }

      .thumbnail-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        margin-top: 16px;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Ensure we have at least 4 images by duplicating if necessary
    const normalizedImages = [...images];
    while (normalizedImages.length < 4) {
      normalizedImages.push(...images);
    }
    
    // Update the slider with normalized images
    slider.innerHTML = normalizedImages.slice(0, 4).map(src => 
      `<img src="${src}" alt="Property view" />`
    ).join('');

    let currentImages = Array.from(slider.querySelectorAll('img'));
    const ANIM_DURATION = 600;
    const FAST_ANIM_DURATION = 200;
    const NORMAL_INTERVAL = 4000;
    const FAST_INTERVAL = 300;

    function resetPositions() {
      currentImages = Array.from(slider.querySelectorAll('img'));
      currentImages.forEach((img, index) => {
        img.style.transition = '';
        img.style.animation = '';
        img.className = '';

        if (index === 0) {
          img.style.transform = 'translateX(75px)';
          img.style.opacity = '0';
          img.style.zIndex = '1';
          img.style.filter = 'blur(1px)';
          img.style.cursor = 'pointer';
        } else if (index === 1) {
          img.style.transform = 'translateX(55px)';
          img.style.opacity = '0.33';
          img.style.zIndex = '2';
          img.style.filter = 'blur(0.5px)';
          img.style.cursor = 'pointer';
        } else if (index === 2) {
          img.style.transform = 'translateX(35px)';
          img.style.opacity = '0.66';
          img.style.zIndex = '3';
          img.style.filter = 'blur(0)';
          img.style.cursor = 'pointer';
        } else if (index === 3) {
          img.style.transform = 'translateX(0)';
          img.style.opacity = '1';
          img.style.zIndex = '4';
          img.style.filter = 'blur(0)';
          img.style.cursor = 'pointer';
        }
      });
    }

    function moveStack(isFast: boolean, targetIndex?: number) {
      if (isAnimating.current || currentImages.length < 4) return;
      isAnimating.current = true;

      const animDuration = isFast ? FAST_ANIM_DURATION : ANIM_DURATION;
      
      currentImages.forEach(img => {
        img.style.transition = `transform ${animDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
                              opacity ${animDuration}ms cubic-bezier(0.4, 0, 0.2, 1),
                              filter ${animDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
      });

      slider.offsetHeight;

      currentImages[3].classList.add('evaporate');

      currentImages[0].style.transform = 'translateX(-55px)';
      currentImages[0].style.opacity = '0.33';
      currentImages[0].style.filter = 'blur(0.5px)';

      currentImages[1].style.transform = 'translateX(-35px)';
      currentImages[1].style.opacity = '0.66';
      currentImages[1].style.filter = 'blur(0)';

      currentImages[2].style.transform = 'translateX(0)';
      currentImages[2].style.opacity = '1';
      currentImages[2].style.filter = 'blur(0)';

      setTimeout(() => {
        currentImages.forEach(img => {
          img.style.transition = '';
          img.classList.remove('evaporate');
        });

        // If a specific target index is provided
        if (targetIndex !== undefined) {
          // Rotate images until the target image is on top
          while (currentImages[3].getAttribute('src') !== images[targetIndex]) {
            slider.insertBefore(currentImages[3], slider.firstChild);
            currentImages = Array.from(slider.querySelectorAll('img'));
          }
        } else {
          slider.insertBefore(currentImages[3], slider.firstChild);
        }

        resetPositions();

        const newImages = slider.querySelectorAll('img');
        newImages[0].classList.add(isFast ? 'fast-fade-in' : 'fade-in');

        setTimeout(() => {
          newImages[0].className = '';
          newImages[0].style.animation = '';
          isAnimating.current = false;

          // Update active image index
          const topImageSrc = newImages[3].getAttribute('src');
          const index = images.findIndex(img => img === topImageSrc);
          setActiveImageIndex(index);

          if (isFast) {
            const currentTopImg = slider.querySelectorAll('img')[3];
            if (currentTopImg.getAttribute('src') === targetImageSrc.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = window.setInterval(() => moveStack(false), NORMAL_INTERVAL);
            }
          }
        }, isFast ? FAST_ANIM_DURATION : ANIM_DURATION);
      }, animDuration);
    }

    resetPositions();
    intervalRef.current = window.setInterval(() => moveStack(false), NORMAL_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images]);

  // Function to handle manual image selection
  const handleThumbnailClick = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Pause auto-rotation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Get current images and ensure the selected image is at the top
    let currentImages = Array.from(slider.querySelectorAll('img'));
    
    // Keep moving images until the desired image is at the top
    while (currentImages[3].getAttribute('src') !== images[index]) {
      slider.appendChild(currentImages[0]);
      currentImages = Array.from(slider.querySelectorAll('img'));
    }

    // Reset positions and update active state
    const resetFunc = () => {
      let currImages = Array.from(slider.querySelectorAll('img'));
      currImages.forEach((img, idx) => {
        if (idx === 0) {
          img.style.transform = 'translateX(75px)';
          img.style.opacity = '0';
          img.style.zIndex = '1';
          img.style.filter = 'blur(1px)';
        } else if (idx === 1) {
          img.style.transform = 'translateX(55px)';
          img.style.opacity = '0.33';
          img.style.zIndex = '2';
          img.style.filter = 'blur(0.5px)';
        } else if (idx === 2) {
          img.style.transform = 'translateX(35px)';
          img.style.opacity = '0.66';
          img.style.zIndex = '3';
          img.style.filter = 'blur(0)';
        } else if (idx === 3) {
          img.style.transform = 'translateX(0)';
          img.style.opacity = '1';
          img.style.zIndex = '4';
          img.style.filter = 'blur(0)';
        }
      });

      // Update active image index
      const topImageSrc = currImages[3].getAttribute('src');
      const newIndex = images.findIndex(img => img === topImageSrc);
      setActiveImageIndex(newIndex);
    };

    resetFunc();

    // Restart auto-rotation after a delay
    setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        moveStack(false);
      }, 4000);
    }, 5000);
  };

  // If no images, show placeholder
  if (!images.length) {
    return (
      <div className="stacked-slider bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div>
      <div className="stacked-slider" ref={sliderRef}>
        {/* Initial images will be populated by useEffect */}
      </div>
      <div className="thumbnail-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${
              index === activeImageIndex ? 'active' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
}