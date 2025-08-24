import { FaGithub } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import TiltComponent from "../util/TiltComponent";
import { getFormattedDate } from "../services/generalService";

const ProjectBox = ({
    projectData,
    ind
}) => {
  return (
    <TiltComponent>
        <motion.div 
            className="gradient-border-background m-2 p-2 cursor-pointer rounded-2xl h-[55vh] sm:h-[50vh] w-[300px] overflow-hidden shadow-xl/30 "
            initial={{x:-100, opacity:0}}
            whileInView={{x:0, opacity:1}}
            transition={{delay:(ind+0.05)}}
        >
            <div className='flex items-center relative'>
                <h2 className='flex items-center border-l border-green-300 pl-2 bg-gradient-to-r from-green-900 via-green-950 to-black h-10 text-center'>{projectData.title}</h2>
                <span className="absolute top-0 right-0 flex gap-2">
                    <a 
                        href={projectData.githubLink}
                        target="blank"
                        title="github"
                    >
                        <FaGithub 
                            className="text-xl"
                        />
                    </a>
                    {
                        projectData.liveLink && <a 
                                                    href={projectData.liveLink}
                                                    title="live"
                                                >
                                                    <IoEarthSharp 
                                                        className="text-xl text-red-500"
                                                    />
                                                </a>
                    }
                </span>
            </div>
            <div className='my-2 h-[1px] w-[75%] bg-gradient-to-r from-green-700 to-green-950'/>
            <img src={projectData.imageUrl} alt="project1" />
            <ul className='text-sm text-gray-300 h-[30%] overflow-y-auto pl-10'>
                {
                    projectData.description.map((desc, ind)=>{
                        return <li key={ind} style={{ listStyle: "initial" }}>{ desc }</li>
                    })
                }
            </ul>
            <div className="h-7 flex flex-wrap overflow-y-auto">
                {
                    projectData.techStack.map((item, ind)=>{
                        return (
                            <span 
                                key={ind}
                                className='px-2 py-1 rounded-2xl text-sm bg-gradient-to-br from-gray-500 to-black shadow-xl/30'
                            >
                                {item}
                            </span>
                        );
                    })
                }
            </div>
            <p className="text-sm text-gray-300 text-center p-2">Posted on {getFormattedDate(projectData.createdAt)}</p>
        </motion.div>
    </TiltComponent>
    
  )
}

export default ProjectBox