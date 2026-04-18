import { useState } from 'react';
import { Carousel } from '../types';

interface CarouselCardProps {
  carousel: Carousel;
}

export default function CarouselCard({ carousel }: CarouselCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = formatCarouselAsText(carousel);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatCarouselAsText = (carousel: Carousel) => {
    let text = `${carousel.topic}\n\n`;
    carousel.slides.forEach((slide, index) => {
      text += `Slide ${index + 1}:\n`;
      text += `${slide.title}\n`;
      slide.content.forEach(point => {
        text += `• ${point}\n`;
      });
      text += '\n';
    });
    return text;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gradient-to-r from-[#0A66C2]/5 to-blue-50 p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[#0A66C2] text-xs font-bold text-white">
                {carousel.id}
              </span>
              <span className="text-xs font-medium text-gray-500">
                {carousel.slides.length} slides
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">{carousel.topic}</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 rounded-lg p-2 text-gray-500 transition-colors hover:bg-white hover:text-[#0A66C2]"
          >
            <svg
              className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Carousel Preview */}
          <div className="mb-4">
            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 bg-gradient-to-br from-[#0A66C2] to-[#0077B5]">
              {/* Slide Content */}
              <div className="aspect-square p-8 text-white sm:aspect-[4/5]">
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-2 text-xs font-medium opacity-80">
                      Slide {currentSlide + 1} of {carousel.slides.length}
                    </div>
                    <h4 className="mb-4 text-2xl font-bold leading-tight sm:text-3xl">
                      {carousel.slides[currentSlide].title}
                    </h4>
                    <div className="space-y-3">
                      {carousel.slides[currentSlide].content.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="mt-1 text-lg">•</span>
                          <p className="text-base leading-relaxed sm:text-lg">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* LinkedIn branding */}
                  <div className="flex items-center justify-between">
                    <div className="text-xs opacity-60">linkedin.com</div>
                    <svg className="h-6 w-6 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {carousel.slides.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentSlide(prev => (prev > 0 ? prev - 1 : carousel.slides.length - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
                  >
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentSlide(prev => (prev < carousel.slides.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
                  >
                    <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Slide Indicators */}
            <div className="mt-3 flex justify-center gap-1.5">
              {carousel.slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-[#0A66C2]' : 'w-1.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              {copied ? (
                <>
                  <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Text
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
