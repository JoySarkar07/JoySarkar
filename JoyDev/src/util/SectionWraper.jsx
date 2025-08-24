import { motion } from "framer-motion"

const slideInLeft = {
  hidden: { opacity: 0, x: -100 }, // Start left & invisible
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const SectionWraper = (Component) => 
    function SectionWraperComponent(){
        return (
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{once:true, amount:0.25}}
          >
              <Component />
          </motion.div>
        )
    }


export default SectionWraper