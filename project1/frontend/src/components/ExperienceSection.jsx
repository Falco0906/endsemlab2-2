import portfolioData from '../data/portfolioData'

const ExperienceSection = () => {
  const { experience } = portfolioData

  return (
    <section id="experience" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text mb-2">
          EXPERIENCE
        </h2>
        <div className="w-full h-[2px] bg-border mb-8" />

        <div className="space-y-4">
          {experience.map((exp, idx) => (
            <div key={idx} className="border-2 border-border p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold uppercase text-text">
                    {exp.role}
                  </h3>
                  <p className="text-xs font-bold tracking-wider uppercase text-text-muted">
                    {exp.company} — {exp.type}
                  </p>
                </div>
                <span className="text-xs font-bold tracking-wider text-text-muted uppercase mt-1 md:mt-0">
                  {exp.period}
                </span>
              </div>

              <div className="h-[1px] bg-border my-3" />

              <ul className="space-y-2">
                {exp.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-secondary text-sm">
                    <span className="text-text mt-1 shrink-0">■</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
