import Spline from '@splinetool/react-spline'
import heroVideo from "../assets/heroVideo.mp4";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { motion } from 'framer-motion';
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from 'react-icons/fa6';
import { BsPersonCheck } from 'react-icons/bs';

const IconButton = ({childern, link})=>{
  return (
    <motion.button
      whileHover={{scale: 1.1}}
      onClick={()=>window.open(link, "_blank")}
      className='cursor-pointer border p-2 bg-gradient-to-br from-cyan-800 to-black shadow-xl/30 rounded-2xl border-green-300'
    >
      {childern}
    </motion.button>
  );
}

const Button = ({children, title, background, onClick})=>{
  return (
    <motion.button
      onClick={onClick}
      whileHover={{scale:1.1}}
      className={`px-2 sm:px-5 py-1 sm:py-2 text-black font-normal rounded-4xl cursor-pointer flex gap-3 items-center justify-center ${background}`}
    >
      {children}
      {title}
    </motion.button>
  );
}

const HeroSection = ({scrollToSection}) => {
  return (
    <div className='mt-20 h-full flex'>
      <div className='absolute -z-5 top-0 h-[90vh] overflow-hidden opacity-60'>
        <video 
          src={heroVideo} 
          autoPlay
          loop
          muted
          playsInline
          className='w-[100vw] h-full scale-300 md:scale-150'
        />
      </div>
      <div className='ml-10 w-[2px] bg-gradient-to-b from-green-300 to-green-950 h-[70%] mt-10 relative'>
        <div className='h-5 w-5 absolute bg-green-500 rounded-4xl -top-0.5 -left-2.5' />
      </div>
      <motion.div 
        className='flex-1/2 p-10 pl-4 leading-8'
        initial={{x:-100, opacity:0}}
        animate={{
          x:0,
          opacity:1
        }}
        transition={{duration:1}}
      >
        <span className='text-green-200 text-lg font-thin italic'>Hi, My name is</span>
        <h1 className='font-bold text-4xl sm:text-6xl text-green-200'>Joy Sarkar</h1>
        <h3 className='my-4 font-bold text-green-100'>I build things for web.</h3>
        <p className='text-gray-400'>
          I’m a passionate Full Stack <span className='text-green-300 font-extralight'>Web Developer</span> specializing in creating scalable, high-performance, and user-friendly web applications.
          <br />
          From responsive <span className='text-green-300 font-extralight'>front-end</span>  designs to robust <span className='text-green-300 font-extralight'>back-end</span>  architectures, I turn ideas into impactful digital experiences.
        </p>
        <div className='h-5 sm:h-15'></div>
        <div className="flex items-center gap-2">
          <Button 
            children={<IoCloudDownloadSharp className='text-xl' /> } 
            title={"Get My CV"} 
            background={"bg-gradient-to-br from-green-600 to-green-300"}
            onClick={()=>console.log("CV Downloaded...")}
          />
          <Button 
            children={<BsPersonCheck className='text-2xl' />} 
            title={"Hire Me"} 
            background={"bg-gradient-to-br from-amber-300 to-yellow-800"}
            onClick={()=>scrollToSection("contact")}
          />
        </div>
      </motion.div>
        <div className='h-[50vh] z-20 absolute p-2 top-25 right-5 flex flex-col gap-5 items-center justify-center'>
          <IconButton childern={<FaGithub className='text-3xl'/>} link={"https://github.com/JoySarkar07"} />
          <IconButton childern={<FaLinkedin className='text-3xl text-blue-500'/>} link={"https://www.linkedin.com/in/dev-joysarkar"} />
          <IconButton childern={<FaXTwitter className='text-3xl text-gray-500'/>} link={"https://x.com/sarkarJoyDev07"} />
          <IconButton childern={<FaFacebookF  className='text-3xl text-blue-500'/>} link={"https://www.facebook.com/profile.php?id=61562047807690"} />
        </div>
      <div className='flex-1/2 hidden md:block p-5'>
        <Spline scene="https://prod.spline.design/gx7rN0TN4d5piPlt/scene.splinecode" />
      </div>
    </div>
  )
}

export default HeroSection