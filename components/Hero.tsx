'use client';

import ScrollLink from './ScrollLink';
import { Check } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-br from-emerald-900 via-emerald-950 to-green-950 overflow-hidden px-6 py-10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl animate-fade-in-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-2 rounded-full text-white text-sm font-medium mb-6">
          <span className="flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full"><Check className="w-3 h-3" aria-hidden="true" /></span>
          500+ Happy Homeowners in Davenport
        </div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
          Your Dream Fence, Installed This Month
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
          Premium vinyl fencing that lasts 30+ years — without the premium price tag.
        </p>

        {/* Offer Cards */}
        <div className="flex flex-wrap justify-center gap-5 mb-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6 text-center min-w-[140px] hover:bg-white/15 hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300">
            <span className="block text-4xl font-extrabold text-emerald-400">$0</span>
            <span className="block text-white/90 text-sm font-medium mt-2">Down</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6 text-center min-w-[140px] hover:bg-white/15 hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300">
            <span className="block text-4xl font-extrabold text-emerald-400">$0</span>
            <span className="block text-white/90 text-sm font-medium mt-2">Installation</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6 text-center min-w-[140px] hover:bg-white/15 hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300">
            <span className="block text-4xl font-extrabold text-emerald-400">0%</span>
            <span className="block text-white/90 text-sm font-medium mt-2">Interest O.A.C</span>
          </div>
        </div>

        {/* CTA Text */}
        <p className="text-white/90 text-xl mb-6">
          Limited spots available this month — claim yours now
        </p>

        {/* CTA Button */}
        <ScrollLink
          href="#estimate-form"
          className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-9 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300"
        >
          <span>Get My Free Quote</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </ScrollLink>

        {/* Trust indicator */}
        <p className="text-white/60 text-sm mt-6">
          No pressure. No obligation. Just honest pricing.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-xl relative">
          <div className="w-1 h-2 bg-white/60 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-scroll" />
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
