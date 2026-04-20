export interface CarouselSlide {
  title: string;
  content: string[];
  hasImage?: boolean; // true on the title slide to show image placeholder
  imageEmoji?: string; // emoji/icon shown in the image area
}

export interface Carousel {
  id: number;
  topic: string;
  carouselType: string;   // e.g. "Curiosity Hook", "Pain Point"
  carouselColor: string;  // tailwind gradient classes
  slides: CarouselSlide[];
}

export interface FormData {
  businessNiche: string;
  targetAudience: string;
}
