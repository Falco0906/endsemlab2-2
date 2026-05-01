import portfolioData from '../data/portfolioData'

const SkillsSection = () => {
  const { skills } = portfolioData

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text mb-2">
          TECHNICAL SKILLS
        </h2>
        <div className="w-full h-[2px] bg-border mb-8" />

        <div className="space-y-4">
          {skills.map((group, idx) => (
            <div key={idx} className="border-2 border-border p-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-text mb-3">
                {group.category}
              </h3>
              <div className="h-[1px] bg-border mb-3" />
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="text-xs font-medium text-text border-2 border-border px-3 py-1.5 hover:bg-text hover:text-bg transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
