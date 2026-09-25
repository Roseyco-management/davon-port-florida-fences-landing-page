import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-emerald-950 pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">
              Davenport Florida Fences
            </h3>
            <p className="text-gray-400">
              Premium vinyl fencing with lifetime warranty. Locally owned, family operated. Serving Davenport, Haines City, Kissimmee, and all of Central Florida.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Contact Us</h4>
            <p className="text-gray-400">Davenport, Florida</p>
            <Link
              href="https://davenportfloridafences.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-emerald-400 transition-colors"
            >
              davenportfloridafences.com
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-emerald-900 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Davenport Florida Fences. All rights reserved.
          </p>
          <nav aria-label="Legal" className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Use</Link>
            <Link href="/cookie-policy" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link>
          </nav>
          <p className="text-xs text-gray-600/50 mt-2">Built by <a href="https://www.roseyco.com/uk/services/web-development" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Rosey Co</a></p>
        </div>
      </div>
    </footer>
  );
}
