import { useState } from 'react'
import portfolioData from '../data/portfolioData'

const ProjectsSection = () => {
  const [staticProjects] = useState(portfolioData.projects)

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-text mb-2">
          PROJECTS
        </h2>
        <p className="text-sm text-text-secondary mb-2">
          A selection of projects spanning AI, automation, and full-stack development.
        </p>
        <div className="w-full h-[2px] bg-border mb-8" />

        <div className="space-y-4">
          {staticProjects.map((project, idx) => (
            <div key={idx} className="border-2 border-border p-5 md:p-6 hover:bg-text/5 transition-all duration-200">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold uppercase text-text">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium tracking-wider text-text-muted uppercase">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-bold uppercase border-2 border-border px-2 py-1 hover:bg-text hover:text-bg transition-all duration-200">
                      GITHUB
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="text-xs font-bold uppercase border-2 border-border px-2 py-1 hover:bg-text hover:text-bg transition-all duration-200">
                      LIVE
                    </a>
                  )}
                </div>
              </div>

              <div className="h-[1px] bg-border my-3" />

              <p className="text-text-secondary text-sm leading-relaxed mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, techIdx) => (
                  <span key={techIdx}
                    className="text-[10px] font-bold uppercase tracking-wider text-text border-2 border-border px-2 py-0.5">
                    {tech}
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

export default ProjectsSection
