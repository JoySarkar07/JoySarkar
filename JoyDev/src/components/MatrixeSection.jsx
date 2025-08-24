import { useContext, useEffect, useRef } from "react"
import { AppContext } from "../context/AppContext"
import { MdOutlineWork } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import TiltComponent from "../util/TiltComponent";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionWraper from "../util/SectionWraper";

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // 👈 re-trigger every time in view

  const count = useMotionValue(0);
  const spring = useSpring(count, { duration: 3, stiffness: 100 });
  const rounded = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      count.set(0);        // reset to 0
      setTimeout(() => {
        count.set(value);  // animate to target value
      }, 100);
    }
  }, [isInView, value, count]);

  return (
    <motion.p 
      ref={ref}
      className="text-2xl font-bold text-green-600"
    >
      {rounded}
    </motion.p>
  );
};

const getIcon = (icon)=>{
  switch(icon){
    case "person" : return <IoPerson className="text-3xl text-green-400"/>;
    case "work" : return <MdOutlineWork className="text-3xl text-green-400"/>;
    default : return <TiTick className="text-3xl text-green-400"/>;
  }
}

const MatrixBox = ({data})=>{
  return (
    <TiltComponent>
      <div className="gradient-border-background w-[300px] rounded-2xl flex gap-3 items-center shadow-2xl/30">
        <div className="p-5 m-2 rounded-4xl shadow-lg shadow-green-500">
          {getIcon(data.icon)}
        </div>
        <div>
          <h2>{data.title}</h2>
          <span className="flex gap-1 items-center">
            <AnimatedNumber value={data.data} />
            <p className="text-3xl text-green-600 font-medium">+</p>
          </span>
        </div>
      </div>
    </TiltComponent>
  );
}

const MatrixeSection = () => {
  const { matrixes } = useContext(AppContext);
  return (
    <div 
      className="flex gap-3 flex-wrap items-center justify-around p-5"
    >
      {
        matrixes.map((data, ind)=>{
          return (
            <MatrixBox key={ind} data={data} />
          );
        })
      }
    </div>
  )
}

export default SectionWraper(MatrixeSection)