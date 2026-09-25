import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Terms of Use | Davenport Florida Fences',
  description: 'The terms that apply when you use this Davenport Florida Fences website.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <p>
        These terms apply to your use of landingpage.davenportfloridafences.com, run by Davenport Florida Fences. By using the page you agree to them.
      </p>

      <h2>Estimates and offers</h2>
      <p>
        Requesting an estimate is free and does not commit you to anything. Prices, savings, offers and timescales on
        this page are general information and may change. A price is only confirmed in a written quote after we have
        assessed your property, and any work is governed by that quote and its terms.
      </p>

      <h2>Warranties</h2>
      <p>
        Warranty details mentioned on this page are summaries. The full warranty terms are provided with your quote and
        apply in place of these summaries.
      </p>

      <h2>Using this page</h2>
      <p>
        Please don&apos;t submit false requests or someone else&apos;s details without their permission, or try to
        disrupt or gain unauthorized access to the page.
      </p>

      <h2>Content and liability</h2>
      <p>
        The content of this page belongs to Davenport Florida Fences or its licensors. The page is provided &ldquo;as is&rdquo;; to the
        fullest extent permitted by law, we are not liable for any loss arising from your use of it.
      </p>

      <h2>Privacy</h2>
      <p>
        See our <Link href="/privacy">Privacy Policy</Link> and <Link href="/cookie-policy">Cookie Policy</Link>.
      </p>

      <h2>Governing law and contact</h2>
      <p>
        These terms are governed by the laws of the State of Florida. Questions? Contact us through the form on <Link href="/">our home page</Link> or through <a href="https://davenportfloridafences.com" target="_blank" rel="noopener noreferrer">davenportfloridafences.com</a>.
      </p>
    </LegalPage>
  );
}
