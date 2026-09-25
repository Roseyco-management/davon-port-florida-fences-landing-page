import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import Features from '@/components/Features';
import ComparisonSection from '@/components/ComparisonSection';
import Results from '@/components/Results';
import TestimonialsSection from '@/components/TestimonialsSection';
import TrustSection from '@/components/TrustSection';
import FAQSection from '@/components/FAQSection';
import EstimateForm from '@/components/EstimateForm';
import FinalCTA from '@/components/FinalCTA';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      {/* ATTENTION: Grab them with the hook */}
      <Hero />

      {/* INTEREST: Agitate the problem, show the solution */}
      <ProblemSection />
      <Features />
      <ComparisonSection />

      {/* DESIRE: Show proof it works */}
      <Results />
      <TestimonialsSection />
      <TrustSection />

      {/* Handle objections */}
      <FAQSection />

      {/* ACTION: The form */}
      <EstimateForm />

      {/* Final push for those who scrolled past */}
      <FinalCTA />

      <AboutSection />

      <Footer />
    </main>
  );
}
