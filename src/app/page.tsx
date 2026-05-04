import { Hero } from '@/components/Hero/Hero';
import { Background } from '@/components/Background/Background';
import { PortfolioNarrative } from '@/components/PortfolioNarrative/PortfolioNarrative';
import { RoadAhead } from '@/components/RoadAhead/RoadAhead';
import { ContactFooter } from '@/components/ContactFooter/ContactFooter';

export default function Page() {
  return (
    <>
      <Hero />
      <Background />
      <PortfolioNarrative />
      <RoadAhead />
      <ContactFooter />
    </>
  );
}
