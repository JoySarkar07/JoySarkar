import { useContext } from 'react'
import { FaJava, FaReact } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { BiLogoSpringBoot } from "react-icons/bi";
import { SiExpress, SiMongodb, SiMysql } from "react-icons/si";
import { AppContext } from '../context/AppContext';
import TiltComponent from '../util/TiltComponent';
import SectionWraper from '../util/SectionWraper';

const SkillCard = ({
  skill
})=>{
  return (
    <TiltComponent>
      <div className='bg-gradient-to-br from-yellow-600 to-green-900 rounded-2xl flex justify-center items-center break-all p-5'>
        <h2 className='font-bold text-xl'>{skill}</h2>
      </div>
    </TiltComponent>
  );
}

const SkillBall = ({children})=>{
  return (
    <div className='p-5 bg-black rounded-3xl'>
      {children}
    </div>
  );
}

const SkillSection = () => {
  const { skills } = useContext(AppContext);
  return (
    <>
      <h1 className='text-4xl text-center indent-4 text-green-300'>Skills</h1>
      <div className='flex flex-wrap justify-around'>
        <div className="flex gap-3 flex-wrap justify-center items-center md:w-1/2 h-[50vh] overflow-y-auto">
          {
            skills.length > 0 
            ? skills.map((skillData, ind)=>{
              return (
                <SkillCard key={ind} skill={skillData.skill}/>
              );
            })
            : <p className='text-3xl font-bold text-cyan-500'>Please wait some time ..... 🕔</p>
          }
        </div>
        <div className='w-1/2 flex flex-wrap gap-2 justify-center items-center shape-border-animation'>
          <div className='w-[350px] h-[300px] flex justify-center items-center flex-wrap gap-3 p-5'>
            {
              [
                <FaReact className='text-5xl text-blue-900'/>,
                <FaJava  className='text-5xl text-orange-500'/>,
                <IoLogoJavascript  className='text-5xl text-yellow-400'/>,
                <BiLogoSpringBoot  className='text-5xl text-green-500'/>,
                <SiMongodb  className='text-5xl text-green-300'/>,
                <SiExpress  className='text-5xl text-green-500'/>,
                <SiMysql  className='text-5xl text-blue-700'/>
              ].map((icon, ind)=>{
                return <SkillBall key={ind} >{icon}</SkillBall>;
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default SectionWraper(SkillSection)