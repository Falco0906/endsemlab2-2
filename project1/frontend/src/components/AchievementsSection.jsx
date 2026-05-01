import portfolioData from '../data/portfolioData'

const AchievementsSection = () => {
  const { achievements, certifications, research } = portfolioData

  return (
    <section id="achievements" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text mb-2">
          ACHIEVEMENTS
        </h2>
        <div className="w-full h-[2px] bg-border mb-8" />

        {/* Achievements */}
        <div className="space-y-3 mb-10">
          {achievements.map((item, idx) => (
            <div key={idx} className="border-2 border-border p-4 flex items-start gap-3 hover:bg-text/5 transition-all duration-200">
              <span className="text-text font-bold text-xs mt-0.5 shrink-0">■</span>
              <p className="text-text-secondary text-sm">{item}</p>
            </div>
          ))}
        </div>

        {/* Research */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-text mb-3">RESEARCH</h3>
        <div className="h-[1px] bg-border mb-4" />
        {research.map((r, idx) => (
          <div key={idx} className="border-2 border-border p-4 mb-8">
            <p className="text-sm font-bold text-text mb-2">{r.title}</p>
            <div className="flex flex-wrap gap-2">
              {r.areas.map((area, i) => (
                <span key={i} className="text-[10px] font-bold uppercase tracking-wider text-text border-2 border-border px-2 py-0.5">
                  {area}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Certifications */}
        <h3 className="text-sm font-bold uppercase tracking-wider text-text mb-3">CERTIFICATIONS</h3>
        <div className="h-[1px] bg-border mb-4" />
        <div className="space-y-2">
          {certifications.map((cert, idx) => (
            <div key={idx} className="border-2 border-border p-4 flex items-center gap-3 hover:bg-text/5 transition-all duration-200">
              <span className="text-text text-xs shrink-0">★</span>
              <p className="text-sm text-text-secondary">{cert}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection
