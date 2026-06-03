import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// We *want* answer engines to read this site — being cited in ChatGPT, Claude,
// Perplexity, and Google AI Overviews is the GEO goal. So every major AI
// crawler is explicitly allowed alongside classic search bots. Listing them by
// name (rather than relying on the `*` rule) is a clear opt-in signal and makes
// the intent auditable.
const AI_CRAWLERS = [
  'GPTBot', // OpenAI — training + ChatGPT browsing
  'OAI-SearchBot', // OpenAI — ChatGPT search index
  'ChatGPT-User', // OpenAI — live retrieval on user request
  'ClaudeBot', // Anthropic — training
  'Claude-Web', // Anthropic — Claude live retrieval
  'anthropic-ai', // Anthropic — legacy agent
  'PerplexityBot', // Perplexity — index
  'Perplexity-User', // Perplexity — live retrieval
  'Google-Extended', // Google Gemini / Vertex / AI Overviews
  'Applebot-Extended', // Apple Intelligence
  'Bingbot', // Bing + Copilot
  'cohere-ai',
  'Meta-ExternalAgent',
  'DuckAssistBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
