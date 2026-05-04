import { Hero } from '@/components/Hero/Hero';
import { PortfolioNarrative } from '@/components/PortfolioNarrative/PortfolioNarrative';
import { ContactFooter } from '@/components/ContactFooter/ContactFooter';

export default function Page() {
  return (
    <>
      <Hero />
      <PortfolioNarrative />
      <ContactFooter />
    </>
  );
}
