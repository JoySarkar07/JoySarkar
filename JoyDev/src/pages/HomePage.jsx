import HeroSection from '../components/HeroSection'
import ProjectSection from '../components/ProjectSection'
import ExperienceSection from '../components/ExperienceSection'
import SkillSection from '../components/SkillSection'
import EducationSection from '../components/EducationSection'
import MatrixeSection from '../components/MatrixeSection'
import ReviewSection from '../components/ReviewSection'
import ContactSection from '../components/ContactSection'

const HomePage = ({
  hero, 
  project, 
  experience, 
  skills, 
  contact,
  scrollToSection
}) => {
  return (
    <>
      <section ref={hero} className='h-[90vh] overflow-hidden'>
        <HeroSection scrollToSection={scrollToSection}/>
      </section>
      <hr className='m-2 text-green-900'/>
      <section ref={project} className='h-[70vh] overflow-y-auto sm:overflow-hidden bg-gradient-to-b from-black to-gray-900'>
        <ProjectSection />
      </section>
      <hr className='m-2 text-green-900'/>
      <section ref={experience}>
        <ExperienceSection />
      </section>
      <hr className='m-2 text-green-900'/>
      <section ref={skills} className='bg-gradient-to-b from-black to-gray-900'>
        <SkillSection />
      </section>
      <hr className='m-2 text-green-900'/>
      <section className='h-[80vh] overflow-y-auto'>
        <EducationSection />
      </section>
      <hr className='m-2 text-green-900'/>
      <section>
        <MatrixeSection />
      </section>
      <hr className='m-2 text-green-900'/>
      <section className='bg-gradient-to-b from-black to-gray-900'>
        <ReviewSection />
      </section>
      <hr className='m-2 text-green-900'/>
      <section ref={contact}>
        <ContactSection />
      </section>
    </>
  )
}

export default HomePage