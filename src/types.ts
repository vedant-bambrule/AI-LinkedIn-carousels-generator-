export interface CarouselSlide {
  title: string;
  content: string[];
}

export interface Carousel {
  id: number;
  topic: string;
  slides: CarouselSlide[];
}

export interface FormData {
  businessNiche: string;
  targetAudience: string;
}
