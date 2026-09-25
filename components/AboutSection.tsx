export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-16">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">About Davenport Florida Fences</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">Premium vinyl fencing with lifetime warranty. Locally owned, family operated. Serving Davenport, Haines City, Kissimmee, and all of Central Florida.</p>
        <p className="mt-4 text-gray-600 leading-relaxed">
          This website was designed and built by{' '}
          <a
            href="https://www.roseyco.com/uk/services/web-development"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline underline-offset-2"
          >
            Rosey Co&apos;s web development team
          </a>
          , a marketing agency helping local businesses rank on Google. Read{' '}
          <a
            href="https://www.roseyco.com/uk/case-studies/davenport-florida-fences"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 underline underline-offset-2"
          >
            the Davenport Florida Fences case study
          </a>
          .
        </p>
      </div>
    </section>
  );
}
