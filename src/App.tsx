import { useState } from 'react';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import { Carousel, FormData } from './types';
import { generateCarousels } from './utils/carouselGenerator';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'results'>('landing');
  const [carousels, setCarousels] = useState<Carousel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({ businessNiche: '', targetAudience: '' });

  const handleGenerate = async (data: FormData) => {
    setIsLoading(true);
    setFormData(data);
    
    try {
      const generatedCarousels = await generateCarousels(data);
      setCarousels(generatedCarousels);
      setCurrentPage('results');
    } catch (error) {
      console.error('Error generating carousels:', error);
      alert('Failed to generate carousels. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentPage('landing');
  };

  return (
    <>
      {currentPage === 'landing' ? (
        <LandingPage onGenerate={handleGenerate} isLoading={isLoading} />
      ) : (
        <ResultsPage
          carousels={carousels}
          onBack={handleBack}
          businessNiche={formData.businessNiche}
          targetAudience={formData.targetAudience}
        />
      )}
    </>
  );
}
