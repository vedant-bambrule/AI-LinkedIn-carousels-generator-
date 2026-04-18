import { useState } from 'react';
import { FormData } from '../types';

interface LandingPageProps {
  onGenerate: (formData: FormData) => void;
  isLoading: boolean;
}

export default function LandingPage({ onGenerate, isLoading }: LandingPageProps) {
  const [formData, setFormData] = useState<FormData>({
    businessNiche: '',
    targetAudience: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.businessNiche && formData.targetAudience) {
      onGenerate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A66C2]">
              <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Carousel Generator</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            Generate{' '}
            <span className="bg-gradient-to-r from-[#0A66C2] to-[#0077B5] bg-clip-text text-transparent">
              10 Viral
            </span>
            <br />
            LinkedIn Carousels
            <br />
            <span className="text-[#0A66C2]">in 60 Seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 sm:text-2xl">
            AI-powered carousels that get engagement & leads
          </p>

          {/* Benefits */}
          <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A66C2]/10">
                <svg className="h-6 w-6 text-[#0A66C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
              <p className="mt-1 text-sm text-gray-600">Generate 10 carousels in under a minute</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A66C2]/10">
                <svg className="h-6 w-6 text-[#0A66C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">AI-Powered</h3>
              <p className="mt-1 text-sm text-gray-600">Smart content tailored to your niche</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A66C2]/10">
                <svg className="h-6 w-6 text-[#0A66C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">High Converting</h3>
              <p className="mt-1 text-sm text-gray-600">Proven formats that drive engagement</p>
            </div>
          </div>

          {/* Form */}
          <div className="mx-auto mt-16 max-w-2xl">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
              <div className="space-y-6">
                {/* Business Niche Input */}
                <div className="text-left">
                  <label htmlFor="businessNiche" className="block text-sm font-semibold text-gray-900">
                    Business Niche
                  </label>
                  <input
                    type="text"
                    id="businessNiche"
                    value={formData.businessNiche}
                    onChange={(e) => setFormData({ ...formData, businessNiche: e.target.value })}
                    placeholder="e.g., Digital Marketing, SaaS, Coaching"
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#0A66C2] focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/20"
                    required
                  />
                </div>

                {/* Target Audience Input */}
                <div className="text-left">
                  <label htmlFor="targetAudience" className="block text-sm font-semibold text-gray-900">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    id="targetAudience"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    placeholder="e.g., Entrepreneurs, Founders, Marketing Managers"
                    className="mt-2 block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#0A66C2] focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/20"
                    required
                  />
                </div>

                {/* Generate Button */}
                <button
                  type="submit"
                  disabled={isLoading || !formData.businessNiche || !formData.targetAudience}
                  className="w-full rounded-lg bg-[#0A66C2] px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#004182] focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating Your Carousels...
                    </span>
                  ) : (
                    '✨ Generate 10 Carousels Now'
                  )}
                </button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free to use</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-600 sm:px-6 lg:px-8">
          <p>© 2026 LinkedIn Carousel Generator. Powered by AI.</p>
        </div>
      </footer>
    </div>
  );
}
