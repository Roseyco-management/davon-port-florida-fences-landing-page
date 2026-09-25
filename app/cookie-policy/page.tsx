import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';

export const metadata: Metadata = {
  title: 'Cookie Policy | Davenport Florida Fences',
  description: 'Which cookies this Davenport Florida Fences page uses and how to control them.',
  alternates: { canonical: '/cookie-policy' },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>Cookies are small files a website stores on your device. This page uses the following tools that set cookies:</p>
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

      <h2>Controlling cookies</h2>
      <p>
        You can block or delete cookies in your browser settings. You can also opt out of Google Analytics with
        Google&apos;s{' '}
        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          opt-out add-on
        </a>{' '}
        and manage Meta ad preferences in your Facebook or Instagram settings. The page still works if you block these
        cookies.
      </p>

      <h2>More information</h2>
      <p>
        See our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
