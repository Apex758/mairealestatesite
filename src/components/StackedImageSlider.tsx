import React, { useEffect, useRef, useState } from 'react';

interface StackedImageSliderProps {
  images: string[];
}

export function StackedImageSlider({ images }: StackedImageSliderProps) {
  // State to track the current active image index
  const [activeIndex, setActiveIndex] = useState(0);
  // State for enlarged image view
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  
  // Refs
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef(false);
  const intervalRef = useRef<number>();
  
  // Calculate visible indices based on active index
  const getVisibleIndices = (currentIndex: number) => {
    const totalImages = images.length;
    if (totalImages === 0) return [];
    
    // Always show 4 images
    return [
      currentIndex % totalImages,
      (currentIndex + 1) % totalImages,
      (currentIndex + 2) % totalImages,
      (currentIndex + 3) % totalImages
    ];
  };
  
  // Get visible images array
  const getVisibleImages = () => {
    if (images.length === 0) return [];
    return getVisibleIndices(activeIndex).map(index => images[index]);
  };
  
  // Function to advance the slideshow
  const advanceSlideshow = (instant = false) => {
    if (isAnimating.current || images.length === 0) return;
    
    isAnimating.current = true;
    const slider = sliderRef.current;
    if (!slider) return;
    
    // Get all current image elements
    const imageElements = Array.from(slider.querySelectorAll('.slide-image'));
    if (imageElements.length !== 4) return;
    
    // Apply exit animation to the first image
    imageElements[0].classList.add(instant ? 'exit-instant' : 'exit');
    
    // Apply transition animations to the other images
    imageElements.forEach((img, i) => {
      if (i > 0) {
        img.classList.add(instant ? 'advance-instant' : 'advance');
      }
    });
    
    // After animation completes
    setTimeout(() => {
      // Update active index
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      isAnimating.current = false;
    }, instant ? 50 : 600);
  };
  
  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    if (isAnimating.current || index === activeIndex) return;
    
    // Stop auto rotation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Calculate how many steps to advance
    const stepsToAdvance = (index - activeIndex + images.length) % images.length;
    
    // If it's just the next image, do a normal advance
    if (stepsToAdvance === 1) {
      advanceSlideshow();
    } else {
      // For larger jumps, set the index directly and rebuild the slider
      setActiveIndex(index);
    }
    
    // Restart auto rotation after a delay
    setTimeout(() => {
      intervalRef.current = window.setInterval(() => advanceSlideshow(), 4000);
    }, 1000);
  };
  
  // Handle image enlargement
  const handleEnlargeImage = (imageSrc: string) => {
    // Pause auto-rotation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setEnlargedImage(imageSrc);
  };
  
  // Handle closing enlarged image
  const handleCloseEnlarged = () => {
    // Restart auto-rotation
    intervalRef.current = window.setInterval(() => {
      advanceSlideshow();
    }, 4000);
    setEnlargedImage(null);
  };
  
  // Initialize and clean up
  useEffect(() => {
    // Add CSS styles
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .slider-container {
        position: relative;
        width: 100%;
        height: 726px;
        overflow: hidden;
      }
      
      .slide-image {
        position: absolute;
        height: 726px;
        width: 1089px;
        border-radius: 4px;
        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
        object-fit: cover;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      
      /* Position styles for the 4 visible images */
      .slide-image:nth-child(1) {
        transform: translateX(0);
        opacity: 1;
        z-index: 4;
        filter: blur(0);
      }
      
      .slide-image:nth-child(2) {
        transform: translateX(35px);
        opacity: 0.7;
        z-index: 3;
        filter: blur(0.25px);
      }
      
      .slide-image:nth-child(3) {
        transform: translateX(55px);
        opacity: 0.4;
        z-index: 2;
        filter: blur(0.5px);
      }
      
      .slide-image:nth-child(4) {
        transform: translateX(75px);
        opacity: 0.2;
        z-index: 1;
        filter: blur(0.75px);
      }
      
      /* Animation for exiting image */
      @keyframes exitAnimation {
        0% { transform: translateX(0); opacity: 1; filter: blur(0); }
        100% { transform: translateX(-50px); opacity: 0; filter: blur(2px); }
      }
      
      .exit {
        animation: exitAnimation 0.6s forwards;
        z-index: 5;
      }
      
      .exit-instant {
        transform: translateX(-50px);
        opacity: 0;
        filter: blur(2px);
        z-index: 5;
      }
      
      /* Animation for advancing images */
      @keyframes advanceAnimation {
        0% { }
        100% { 
          transform: translateX(calc(var(--tx) - 35px));
          opacity: var(--op);
          filter: var(--blur);
        }
      }
      
      .advance {
        animation: advanceAnimation 0.6s forwards;
      }
      
      .advance-instant {
        transform: translateX(var(--tx));
        opacity: var(--op);
        filter: var(--blur);
      }
      
      /* Thumbnail styles */
      .thumbnail-container {
        display: flex;
        justify-content: center;
        align-items: center;
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
      
      /* Enlarged image styles */
      .enlarged-image-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      }
      
      .enlarged-image-overlay.visible {
        opacity: 1;
        pointer-events: auto;
      }
      
      .enlarged-image-container {
        max-width: 90%;
        max-height: 90%;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        opacity: 0;
        z-index: 1001;
      }
      
      .enlarged-image-overlay.visible .enlarged-image-container {
        transform: scale(1);
        opacity: 1;
      }
      
      .enlarged-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 8px;
        box-shadow: 0 15px 50px rgba(0,0,0,0.3);
      }
    `;
    document.head.appendChild(styleEl);
    
    // Add event listener to close enlarged image on Escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEnlargedImage(null);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    
    // Start auto-rotation
    intervalRef.current = window.setInterval(() => advanceSlideshow(), 4000);
    
    // Cleanup
    return () => {
      document.head.removeChild(styleEl);
      document.removeEventListener('keydown', handleEscapeKey);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  // Update when images change
  useEffect(() => {
    // Reset active index when images change
    setActiveIndex(0);
    
    // Restart auto-rotation
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (images.length > 0) {
      intervalRef.current = window.setInterval(() => advanceSlideshow(), 4000);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images]);
  
  // Update the DOM after activeIndex changes
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    
    // Clear any existing animation classes
    const existingImages = slider.querySelectorAll('.slide-image');
    existingImages.forEach(img => {
      img.classList.remove('exit', 'exit-instant', 'advance', 'advance-instant');
    });
    
    // Get the visible images
    const visibleImages = getVisibleImages();
    
    // Update the slider content
    slider.innerHTML = visibleImages.map((src, index) => `
      <img 
        src="${src}" 
        alt="Property view ${index + 1}" 
        class="slide-image"
        style="--tx: ${index === 0 ? '0' : index === 1 ? '35px' : index === 2 ? '55px' : '75px'};
               --op: ${index === 0 ? '1' : index === 1 ? '0.7' : index === 2 ? '0.4' : '0.2'};
               --blur: ${index === 0 ? 'blur(0)' : index === 1 ? 'blur(0.25px)' : index === 2 ? 'blur(0.5px)' : 'blur(0.75px)'}"
      />
    `).join('');
    
    // Add click event to the first (main) image
    const mainImage = slider.querySelector('.slide-image');
    if (mainImage) {
      mainImage.addEventListener('click', () => {
        const src = mainImage.getAttribute('src');
        if (src) handleEnlargeImage(src);
      });
    }
  }, [activeIndex, images]);
  
  // If no images, show placeholder
  if (!images.length) {
    return (
      <div className="slider-container bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="slider-container" ref={sliderRef}>
        {/* Images will be populated by useEffect */}
      </div>
      
      <div className="thumbnail-container">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`thumbnail ${
              getVisibleIndices(activeIndex)[0] === index ? 'active' : ''
            }`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
      
      {/* Enlarged Image Overlay */}
      <div 
        className={`enlarged-image-overlay ${enlargedImage ? 'visible' : ''}`}
        onClick={handleCloseEnlarged}
      >
        <div 
          className="enlarged-image-container"
          onClick={(e) => e.stopPropagation()}
        >
          {enlargedImage && (
            <img 
              src={enlargedImage} 
              alt="Enlarged view" 
              className="enlarged-image" 
            />
          )}
        </div>
      </div>
    </div>
  );
}
