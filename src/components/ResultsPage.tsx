import { useState } from 'react';
import { Carousel } from '../types';
import CarouselCard from './CarouselCard';
import jsPDF from 'jspdf';

interface ResultsPageProps {
  carousels: Carousel[];
  onBack: () => void;
  businessNiche: string;
  targetAudience: string;
}

export default function ResultsPage({ carousels, onBack, businessNiche, targetAudience }: ResultsPageProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingLeadMagnet, setIsGeneratingLeadMagnet] = useState(false);

  const downloadAllAsPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;

      // Title page
      pdf.setFontSize(24);
      pdf.setTextColor(10, 102, 194); // LinkedIn blue
      pdf.text('LinkedIn Carousel Collection', pageWidth / 2, 40, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.setTextColor(60, 60, 60);
      pdf.text(`Business Niche: ${businessNiche}`, pageWidth / 2, 60, { align: 'center' });
      pdf.text(`Target Audience: ${targetAudience}`, pageWidth / 2, 75, { align: 'center' });
      
      pdf.setFontSize(10);
      pdf.setTextColor(120, 120, 120);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 90, { align: 'center' });

      // Add each carousel
      carousels.forEach((carousel) => {
        pdf.addPage();
        
        // Carousel header
        pdf.setFillColor(10, 102, 194);
        pdf.rect(margin, margin, contentWidth, 15, 'F');
        pdf.setFontSize(12);
        pdf.setTextColor(255, 255, 255);
        pdf.text(`Carousel ${carousel.id}: ${carousel.topic}`, margin + 5, margin + 10);
        
        let yPosition = margin + 30;
        
        // Add slides
        carousel.slides.forEach((slide, slideIndex) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin;
          }
          
          pdf.setFontSize(11);
          pdf.setTextColor(10, 102, 194);
          pdf.text(`Slide ${slideIndex + 1}: ${slide.title}`, margin, yPosition);
          yPosition += 8;
          
          pdf.setFontSize(9);
          pdf.setTextColor(60, 60, 60);
          slide.content.forEach(point => {
            const lines = pdf.splitTextToSize(`• ${point}`, contentWidth - 10);
            pdf.text(lines, margin + 5, yPosition);
            yPosition += lines.length * 5 + 2;
          });
          
          yPosition += 5;
        });
      });

      pdf.save(`linkedin-carousels-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const generateLeadMagnetPDF = async () => {
    setIsGeneratingLeadMagnet(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;

      // Cover page
      pdf.setFillColor(10, 102, 194);
      pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
      
      pdf.setFontSize(28);
      pdf.setTextColor(255, 255, 255);
      pdf.text('The Ultimate Guide to', pageWidth / 2, 80, { align: 'center' });
      pdf.text(`${businessNiche}`, pageWidth / 2, 100, { align: 'center' });
      pdf.text(`Success`, pageWidth / 2, 120, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.text(`For ${targetAudience}`, pageWidth / 2, 150, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.text('10 Proven Strategies to Boost Your LinkedIn Presence', pageWidth / 2, 180, { align: 'center' });

      // Add content pages
      pdf.addPage();
      pdf.setTextColor(60, 60, 60);
      pdf.setFontSize(20);
      pdf.text('Table of Contents', margin, 40);
      
      let yPos = 60;
      pdf.setFontSize(11);
      carousels.slice(0, 10).forEach((carousel, index) => {
        pdf.text(`${index + 1}. ${carousel.topic}`, margin, yPos);
        yPos += 10;
      });

      // Add each carousel as a chapter
      carousels.slice(0, 10).forEach((carousel, index) => {
        pdf.addPage();
        
        // Chapter header
        pdf.setFontSize(18);
        pdf.setTextColor(10, 102, 194);
        pdf.text(`Chapter ${index + 1}`, margin, 30);
        pdf.text(carousel.topic, margin, 45);
        
        let yPosition = 65;
        pdf.setFontSize(10);
        pdf.setTextColor(60, 60, 60);
        
        carousel.slides.forEach((slide) => {
          if (yPosition > 250) {
            pdf.addPage();
            yPosition = margin;
          }
          
          pdf.setFontSize(12);
          pdf.setTextColor(10, 102, 194);
          pdf.text(slide.title, margin, yPosition);
          yPosition += 8;
          
          pdf.setFontSize(10);
          pdf.setTextColor(60, 60, 60);
          slide.content.forEach(point => {
            const lines = pdf.splitTextToSize(`• ${point}`, pageWidth - 2 * margin - 5);
            pdf.text(lines, margin + 5, yPosition);
            yPosition += lines.length * 6 + 3;
          });
          
          yPosition += 8;
        });
      });

      // Final CTA page
      pdf.addPage();
      pdf.setFillColor(10, 102, 194);
      pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');
      
      pdf.setFontSize(24);
      pdf.setTextColor(255, 255, 255);
      pdf.text('Ready to Take Action?', pageWidth / 2, 100, { align: 'center' });
      
      pdf.setFontSize(14);
      pdf.text('Use these carousels to grow your LinkedIn presence', pageWidth / 2, 130, { align: 'center' });
      pdf.text('and attract more leads today!', pageWidth / 2, 145, { align: 'center' });

      pdf.save(`${businessNiche}-lead-magnet-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generating lead magnet PDF:', error);
      alert('Failed to generate lead magnet. Please try again.');
    } finally {
      setIsGeneratingLeadMagnet(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#0A66C2]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-lg font-bold text-gray-900">Your Carousels</h1>
                <p className="text-xs text-gray-600">
                  {businessNiche} • {targetAudience}
                </p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={downloadAllAsPDF}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isGeneratingPDF ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download All PDF
                  </>
                )}
              </button>

              <button
                onClick={generateLeadMagnetPDF}
                disabled={isGeneratingLeadMagnet}
                className="flex items-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#004182] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isGeneratingLeadMagnet ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                    Lead Magnet PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Results Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="mb-8 rounded-xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900">
                🎉 Success! Your 10 Carousels Are Ready
              </h3>
              <p className="mt-1 text-sm text-green-700">
                Click on each carousel to preview and copy. Download as PDF or create a lead magnet using the buttons above.
              </p>
            </div>
          </div>
        </div>

        {/* Carousels Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {carousels.map((carousel) => (
            <CarouselCard key={carousel.id} carousel={carousel} />
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 rounded-xl border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-blue-900">
            💡 Tips for Maximum Engagement
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Post at Peak Times</p>
                <p className="text-xs text-blue-700">Tuesday-Thursday, 8-10 AM</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Use Engaging Hooks</p>
                <p className="text-xs text-blue-700">Start with a bold statement</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Add a Strong CTA</p>
                <p className="text-xs text-blue-700">Tell readers what to do next</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
