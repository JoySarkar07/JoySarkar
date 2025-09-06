import { useContext, useEffect, useRef, useState } from "react";
import ProjectBox from "./ProjectBox";
import { motion } from "framer-motion";
import SectionWraper from "../util/SectionWraper";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const getRandomProjects = (projects)=>{
  let visibleProject = projects.filter(project=>{
    return project.liveLink !== "";
  })
  if(visibleProject.length<3){
    let nonLiveProjects = projects.filter(project=>{
      return project.liveLink === "";
    })
    nonLiveProjects = [...nonLiveProjects].sort(() => 0.5 - Math.random()).slice(0,(3-visibleProject.length));
    visibleProject = visibleProject.concat(nonLiveProjects);
  }
  const shuffled = [...visibleProject].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

const ProjectSection = () => {
  const { projects } = useContext(AppContext);
  const [visibleProject, setVisibleProject] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setVisibleProject(getRandomProjects(projects));
  }, [projects])
  
  
  return (
    <motion.div 
      className="p-5 h-full flex flex-col overflow-hidden"
    >
      <div className="text-center">
        <h1 className="text-4xl text-green-300 mb-3 text-center">Projects</h1>
      </div>
      <div className="flex flex-wrap gap-10 overflow-auto md:overflow-visible justify-center items-center">
        {
          visibleProject.length > 0 
          ? visibleProject.map((project, ind)=>{
            return (
              <ProjectBox key={ind} ind={ind} projectData={project} />
            )
          })
          : <p className="h-[50vh] flex justify-center items-center text-5xl text-yellow-500">Please wait some time ..... 🕔</p>
        }
      </div>
      <div className="flex justify-end">
        <motion.button
          initial={{x:200, opacity:0}}
          animate={{x:0, opacity:1}}
          transition={{delay:3 , duration:1}}
          whileHover={{scale:1.1}}
          onClick={()=>navigate("/projects")}
          className="bg-gradient-to-br from-green-600 to-black p-2 rounded-2xl hover:from-black hover:to-green-600 cursor-pointer"
        >
          Show All Projects
        </motion.button>
      </div>
    </motion.div>
  )
}

export default SectionWraper(ProjectSection)