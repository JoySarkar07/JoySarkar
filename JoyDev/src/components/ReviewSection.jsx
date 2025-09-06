import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa6";
import qote from "../assets/quotation.svg";
import SectionWraper from "../util/SectionWraper";
import { getFormattedDate } from "../services/generalService";

const TestimonialCard = ({ data, isCenter }) => {
  return (
    <motion.div
      className="w-[400px] h-[200px] rounded-2xl bg-gradient-to-br from-gray-600 to-green-500 shadow-lg flex flex-col justify-start items-start px-16 py-3 sm:p-3 shrink-0"
      animate={{
        scale: isCenter ? 1.1 : 0.85,
        opacity: isCenter ? 1 : 0.5,
        filter: isCenter ? "blur(0px)" : "blur(0.5px)",
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center w-full">
        <img 
          src={qote} 
          alt="quotation"
          className="h-10"
        />
        <p className="w-full text-sm text-gray-200 text-end">{getFormattedDate(data.createdAt)}</p>
      </div>
      <p className="font-semibold text-xl">{data.name}</p>
      <p className="text-gray-100 text-center px-4 max-h-30 overflow-y-auto">{data.review}</p>
      <div className="flex-1" />
      <p className="flex gap-1 mb-3">
        {
          Array.from({ length: data.rating }).map((_, idx) => (
            <span key={idx}><FaStar className="text-yellow-300"/></span>
          ))
        }
        {
          Array.from({ length: 5-data.rating }).map((_, idx) => (
            <span key={idx}><FaStar /></span>
          ))
        }
      </p>
    </motion.div>
  );
};

const ReviewSection = () => {
  const { testimonials } = useContext(AppContext);
  const [index, setIndex] = useState(0);

  // Auto move every 3s
  useEffect(() => {
    if(testimonials.length==0)return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Compute positions (previous, center, next)
  const prevIndex = (index - 1 + testimonials.length) % testimonials.length;
  const nextIndex = (index + 1) % testimonials.length;

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
    <h1 className="text-4xl text-green-300 text-center">Testimonials</h1>
    <h1 className="text-lg text-green-500 text-center break-words p-3">Hear from people who’ve worked with me</h1>
    <div 
      className="h-[30vh] flex flex-col justify-center items-center gap-6"
    >
      <div 
        className="relative flex justify-center items-center w-[90vw] max-w-[1500px] overflow-hidden"
      >
        {/* Prev Button */}
        {
          testimonials.length > 0 && <button
                                      onClick={handlePrev}
                                      className="absolute cursor-pointer -left-2 sm:left-2 z-10 bg-gradient-to-br from-green-800 to-black shadow-md rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100"
                                    >
                                      <FaArrowLeft className="text-green-300"/>
                                    </button>
        }

        <div 
          className="flex justify-center items-center gap-6"
        >
          {
            testimonials.length > 0 
            ? [testimonials[prevIndex], testimonials[index], testimonials[nextIndex]].map((testimonial, ind)=>{
              return <TestimonialCard key={ind} data={testimonial} isCenter={ind===1?true:false} />;
            })
            : <p className="text-2xl text-cyan-700">No testimonials</p>
          }
        </div>

        {/* Next Button */}
        {
          testimonials.length > 0 && <button
                                        onClick={handleNext}
                                        className="absolute cursor-pointer -right-2 sm:right-2 z-10 bg-gradient-to-br from-green-800 to-black shadow-md rounded-full w-10 h-10 flex items-center justify-center text-xl hover:bg-gray-100"
                                      >
                                        <FaArrowRight  className="text-green-300"/>
                                      </button>
        }
      </div>
    </div>
    </>
  );
};

export default SectionWraper(ReviewSection)
