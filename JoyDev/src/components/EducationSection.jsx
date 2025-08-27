import { useContext } from "react"
import { AppContext } from "../context/AppContext";
import { FaGraduationCap, FaLocationDot, FaSchool } from "react-icons/fa6";
import SectionWraper from "../util/SectionWraper";
import { motion } from "framer-motion";

const Educard = ({org, ind})=>{
  return (
    <motion.div 
      initial={{x:-100, opacity:0}}
      whileInView={{x:(ind), opacity:1, transition:{delay:(ind+1), duration:1}}}
      className="w-[300px] sm:w-[450px] max-h-[300px] min-h-[550px] h-[75vh] sm:h-[70vh] rounded-3xl overflow-hidden"
    >
      <div className="rounded-3xl overflow-hidden h-[250px]">
        <img src={org.img} alt="image" className="object-cover w-full"/>
      </div>
      <div className="pl-4 p-2 bg-gradient-to-b from-black to-yellow-900 h-[55%] flex flex-col gap-1 justify-between">
        <div>
          <span className="flex gap-2 items-center"><FaSchool className="text-2xl"/><h2 className="text-xl sm:text-2xl text-green-400">{org.orgName}</h2></span>
          <h5 className="flex gap-2 items-center text-gray-300"><FaLocationDot />{org.location}</h5>
          <p className="flex gap-2 items-center text-sm sm:text-xl"><FaGraduationCap />{org.course} ({org.degree})</p>
          <h5 className="mt-3 text-sm text-gray-400">{org.board}</h5>
          <h5 className="text-gray-300 my-2">
            {
              ind===0? "SGPA " : "Percentage "
            }
            : <span className="text-white font-medium italic">{org.marks}{ind===0?'':' %'}</span>
          </h5>
        </div>
        <h5 className="mb-5">{org.duration}</h5>
      </div>
    </motion.div>
  );
}


const EducationSection = () => {
  const { educationDetails } = useContext(AppContext);
  return (
    <>
    <h1 className="text-4xl text-green-300 mb-3 text-center">Education</h1>
      <div className="flex gap-3 flex-wrap justify-center">
        {
          educationDetails.map((org, ind)=>{
            return <Educard key={ind} org={org} ind={ind}/>
          })
        }
      </div>
    </>
  )
}

export default SectionWraper(EducationSection)