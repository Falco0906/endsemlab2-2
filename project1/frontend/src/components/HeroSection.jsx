import portfolioData from '../data/portfolioData'

const HeroSection = () => {
  const { name, tagline, links } = portfolioData

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 pt-16">
      <div className="text-center max-w-3xl">
        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-6 text-text">
          {name}
        </h1>

        {/* Divider */}
        <div className="w-full max-w-md h-[2px] bg-border mx-auto mb-6" />

        {/* Tagline */}
        <p className="text-sm md:text-base font-medium tracking-wider uppercase text-text-secondary mb-10">
          {tagline}
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase border-2 border-border px-4 py-2 hover:bg-text hover:text-bg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GITHUB
          </a>

          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase border-2 border-border px-4 py-2 hover:bg-text hover:text-bg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LINKEDIN
          </a>

          <a
            href={links.codechef}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase border-2 border-border px-4 py-2 hover:bg-text hover:text-bg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.007.22C5.318.456.737 5.148.509 10.89c-.21 5.31 3.596 9.776 8.655 10.75a.568.568 0 0 0 .332-.038c.1-.044.18-.121.22-.22.17-.45-.054-.94-.506-1.09-3.804-.8-6.75-4.18-6.75-8.19 0-4.59 3.71-8.31 8.32-8.31s8.32 3.72 8.32 8.31c0 4.01-2.94 7.39-6.75 8.19-.45.15-.68.64-.5 1.09.04.1.12.18.22.22.11.05.23.06.34.04 5.06-.98 8.86-5.44 8.65-10.75C20.827 5.148 16.246.456 10.557.22h.45z"/></svg>
            CODECHEF
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-text-muted">SCROLL</span>
        <div className="w-[2px] h-8 bg-border" />
      </div>
    </section>
  )
}

export default HeroSection
