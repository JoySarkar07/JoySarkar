import { useContext } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { AppContext } from '../context/AppContext'
import ProjectBox from '../components/ProjectBox';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjectPage = () => {
  const { projects } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className='p-2 h-[99vh] overflow-hidden'>
      <div className='flex gap-3 bg-gray-600 rounded-2xl p-2'>
        <h1 className='flex-1 text-center text-3xl text-green-400 font-medium'>All Projects</h1>
        <motion.button
          whileHover={{scale:1.1}}
          onClick={()=>navigate("/")}
          className='flex gap-2 items-center justify-center bg-gradient-to-bl from-gray-800 to-yellow-700 p-2 rounded-2xl cursor-pointer'
        >
          <FaArrowLeftLong />
          Back To Home
        </motion.button>
      </div>
      <div className='h-[90%] my-5 flex flex-wrap justify-around overflow-y-auto'>
        {
          projects.length > 0 
          ? projects.map((project, ind)=>{
            return <ProjectBox key={ind} projectData={project} />;
          })
          :<p className="h-full flex justify-center items-center text-5xl text-yellow-500">Nothing to Show</p>
        }
      </div>
    </div>
  )
}

export default ProjectPage