import portfolioData from '../data/portfolioData'

const AboutSection = () => {
  const { about, contact } = portfolioData

  return (
    <section id="about" className="section-padding">
      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text mb-2">
          ABOUT
        </h2>
        <div className="w-full h-[2px] bg-border mb-8" />

        {/* Content */}
        <div className="border-2 border-border p-6 md:p-8">
          <p className="text-text-secondary text-sm md:text-base leading-relaxed mb-6">
            {about}
          </p>

          <div className="h-[1px] bg-border mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text mb-1">LOCATION</p>
              <p className="text-sm text-text-secondary">{contact.location}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text mb-1">EMAIL</p>
              <a href={`mailto:${contact.email}`} className="text-sm text-text-secondary hover:text-text underline">
                {contact.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-text mb-1">PHONE</p>
              <p className="text-sm text-text-secondary">{contact.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
