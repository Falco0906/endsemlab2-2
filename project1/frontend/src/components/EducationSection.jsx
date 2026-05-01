import portfolioData from '../data/portfolioData'

const EducationSection = () => {
  const { education } = portfolioData

  return (
    <section id="education" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text mb-2">
          EDUCATION
        </h2>
        <div className="w-full h-[2px] bg-border mb-8" />

        {education.map((edu, idx) => (
          <div key={idx} className="border-2 border-border p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-base md:text-lg font-bold uppercase text-text mb-1">
                  {edu.institution}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {edu.degree}
                </p>
                <span className="text-xs font-bold uppercase tracking-wider border-2 border-border px-3 py-1">
                  CGPA: {edu.cgpa}
                </span>
              </div>
              <span className="text-xs font-bold tracking-wider text-text-muted uppercase mt-2 md:mt-0">
                {edu.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default EducationSection
