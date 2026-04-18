# LinkedIn Carousel Generator

A modern web application that generates 10 viral LinkedIn carousels in 60 seconds using AI-powered content generation.

## Features

### Landing Page
- **Eye-catching headline**: "Generate 10 Viral LinkedIn Carousels in 60 Seconds"
- **Value proposition**: AI-powered carousels that get engagement & leads
- **Simple input form**:
  - Business Niche (e.g., Digital Marketing, SaaS, Coaching)
  - Target Audience (e.g., Entrepreneurs, Founders, Marketing Managers)
  - Generate button with loading state

### Results Page
- **10 expandable carousel previews** with professional LinkedIn-styled design
- **Interactive carousel viewer** with slide navigation
- **Copy to clipboard** functionality for each carousel
- **Download all as PDF** - comprehensive document with all carousels
- **Generate lead magnet PDF** - professionally formatted guide

### Design
- Modern, clean UI with LinkedIn blue color scheme (#0A66C2)
- Fully mobile responsive
- Professional Inter font family
- Smooth transitions and animations
- Intuitive user experience

## OpenAI API Integration

This app includes placeholder code for OpenAI API integration. To enable AI-powered carousel generation:

### Setup

1. Install the OpenAI package:
```bash
npm install openai
```

2. Add your OpenAI API key to the configuration in `src/utils/carouselGenerator.ts`:
```typescript
export const OPENAI_CONFIG = {
  apiKey: 'your-api-key-here',
  model: 'gpt-4',
};
```

3. Uncomment and use the `generateCarouselsWithAI` function instead of the placeholder `generateCarousels` function.

### Example Integration

The code includes a commented example of how to integrate with OpenAI:

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: OPENAI_CONFIG.apiKey
});

export async function generateCarouselsWithAI(formData: FormData): Promise<Carousel[]> {
  const prompt = `Generate 10 LinkedIn carousel topics for a ${formData.businessNiche} business targeting ${formData.targetAudience}...`;

  const response = await openai.chat.completions.create({
    model: OPENAI_CONFIG.model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  });

  return JSON.parse(response.choices[0].message.content);
}
```

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **jsPDF** - PDF generation
- **html2canvas** - Canvas rendering

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## File Structure

```
src/
├── components/
│   ├── LandingPage.tsx       # Landing page with input form
│   ├── ResultsPage.tsx       # Results display with PDF export
│   └── CarouselCard.tsx      # Individual carousel preview card
├── utils/
│   ├── carouselGenerator.ts  # Carousel generation logic & OpenAI placeholder
│   └── cn.ts                 # Utility functions
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Main app component
└── index.css                 # Global styles
```

## Usage

1. Enter your business niche (e.g., "Digital Marketing")
2. Enter your target audience (e.g., "Small Business Owners")
3. Click "Generate 10 Carousels Now"
4. View, preview, and interact with your generated carousels
5. Copy individual carousels or download all as PDF
6. Generate a lead magnet PDF for professional use

## Features Overview

### Carousel Preview
- Interactive slide navigation
- LinkedIn-styled design
- Responsive layout
- Smooth animations

### PDF Export Options
1. **Download All PDF** - Simple compilation of all carousels
2. **Lead Magnet PDF** - Professionally formatted guide with:
   - Branded cover page
   - Table of contents
   - Chapter-based organization
   - Call-to-action page

### User Experience
- Loading states with animations
- Success notifications
- Copy confirmation feedback
- Error handling
- Mobile-optimized interface

## License

MIT License - feel free to use this project for your own purposes.
