export const ANALYSIS_PROMPT = `You are an expert product analyst and startup advisor. Analyze the following idea and provide a comprehensive evaluation.

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{
  "title": "A catchy, memorable product/idea name (2-4 words)",
  "tagline": "A short, memorable tagline that captures the essence (under 10 words)",
  "rating": 8,
  "analysis": "A 2-3 paragraph detailed analysis of the idea covering market potential, feasibility, and uniqueness",
  "keyPoints": ["Key strength or feature 1", "Key strength or feature 2", "Key strength or feature 3"],
  "improvements": ["Suggested improvement 1", "Suggested improvement 2", "Suggested improvement 3"]
}

The rating should be from 1-10 based on:
- Market potential (30%)
- Technical feasibility (25%)
- Uniqueness/Innovation (25%)
- Clarity of the idea (20%)

Be constructive but honest. If the idea has flaws, mention them while being encouraging.

IDEA TO ANALYZE:
`;

export interface ImagePromptConfig {
  type: 'hero' | 'ui-mockup' | 'lifestyle' | 'blueprint' | 'logo';
  label: string;
  getPrompt: (title: string, description: string) => string;
}

export const IMAGE_PROMPTS: ImagePromptConfig[] = [
  {
    type: 'hero',
    label: 'Hero Product',
    getPrompt: (title, description) =>
      `Professional product photography of "${title}": ${description}. Clean gradient background transitioning from dark blue to purple, studio lighting with soft shadows, ultra high detail, 8K quality, photorealistic render. The product should be the central focus, floating or on a minimal pedestal.`,
  },
  {
    type: 'ui-mockup',
    label: 'App UI Mockup',
    getPrompt: (title, description) =>
      `Modern mobile app UI mockup for "${title}". Dark theme interface with sleek design, showing the main dashboard or primary feature screen. Include realistic device frame (iPhone or Android), glass morphism effects, subtle gradients, professional UX design. The UI should reflect: ${description}`,
  },
  {
    type: 'lifestyle',
    label: 'Lifestyle Photography',
    getPrompt: (title, description) =>
      `Lifestyle photography showing "${title}" being used in a real-world context. Natural setting with warm, inviting lighting. Show a person (hands only or silhouette) interacting with the product naturally. Authentic, editorial style photography that tells a story. Context: ${description}`,
  },
  {
    type: 'blueprint',
    label: 'Technical Blueprint',
    getPrompt: (title, description) =>
      `Technical blueprint and exploded view diagram of "${title}". Engineering schematic style with dark background (navy or black), white and cyan line drawings, labeled components with callout lines, measurements and technical annotations. Professional CAD/engineering aesthetic showing internal components. Based on: ${description}`,
  },
  {
    type: 'logo',
    label: 'Logo Design',
    getPrompt: (title, description) =>
      `Modern minimalist logo design for "${title}". Clean vector-style logo on dark background, professional and memorable, suitable for tech/startup branding. Include a simple icon/symbol and the product name in a modern sans-serif font. The logo should convey: ${description}`,
  },
];
