import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Davenport Florida Fences',
  description: 'How Davenport Florida Fences collects, uses and protects the information you share when you request a free estimate.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This policy explains how Davenport Florida Fences (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects and uses personal information
        on landingpage.davenportfloridafences.com. We are a locally owned business in Davenport, Florida.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Estimate requests:</strong> your first and last name, email address, phone number, street address, city, state and ZIP code, preferred appointment date and time, and any notes you add.
        </li>
        <li>
          <strong>Website usage:</strong> pages viewed, device and browser type, approximate location and how you found
          us, collected by the analytics and advertising tools listed below.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>to contact you about your request and arrange your vinyl fence estimates;</li>
        <li>to keep a record of enquiries and quotes;</li>
        <li>to understand how the page is used and measure our advertising;</li>
        <li>to protect the page from spam and misuse.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Who we share it with</h2>
      <ul>
        <li><strong>Vercel</strong> hosts this website.</li>
        <li><strong>Resend</strong> delivers your request to us by email.</li>
        <li>
          <strong>Rosey Co</strong>, our marketing agency, runs this page for us and receives a copy of each enquiry so
          it can make sure requests are followed up.
        </li>
        <li><strong>Google, Meta and Microsoft</strong> provide the analytics and advertising tools listed below.</li>
      </ul>
      <p>We may also disclose information where the law requires it.</p>

      <h2>Cookies and tracking</h2>
      <p>This page uses:</p>
      <ul>
            <li>
              <strong>Google Analytics</strong>: counts visits and shows how the page is used (cookies _ga, _ga_*; up to 2 years).
            </li>
            <li>
              <strong>Meta Pixel</strong>: measures our Facebook and Instagram adverts (cookie _fbp; 90 days).
            </li>
            <li>
              <strong>Microsoft Clarity</strong>: heatmaps and session recordings of how the page is used (cookies _clck, _clsk; up to 1 year).
            </li>
      </ul>
      <p>
        See our <Link href="/cookie-policy">Cookie Policy</Link> for how to control these.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep estimate requests for as long as we need them to respond, provide our services and keep business
        records. You can ask us to delete your information sooner.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You can ask to see, correct or delete the personal information we hold about you. Depending on the state you
        live in, you may have additional rights under state privacy law; we will honor these where they apply and will
        not treat you differently for using them.
      </p>

      <h2>Children</h2>
      <p>This page is not intended for children under 13, and we do not knowingly collect their information.</p>

      <h2>Contact</h2>
      <p>
        For privacy questions or requests, contact us through the form on <Link href="/">our home page</Link> or through <a href="https://davenportfloridafences.com" target="_blank" rel="noopener noreferrer">davenportfloridafences.com</a>.
      </p>
    </LegalPage>
  );
}
