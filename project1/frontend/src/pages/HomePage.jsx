import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import SkillsSection from '../components/SkillsSection'
import ProjectsSection from '../components/ProjectsSection'
import ExperienceSection from '../components/ExperienceSection'
import EducationSection from '../components/EducationSection'
import AchievementsSection from '../components/AchievementsSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Navbar />
      <HeroSection />
      
      {isAuthenticated && (
        <>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <AchievementsSection />
          <ContactSection />
        </>
      )}
      
      <Footer />
    </div>
  )
}

export default HomePage
