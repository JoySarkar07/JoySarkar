import contactSVG from "../assets/contact.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import SectionWraper from "../util/SectionWraper";
import { sendEmail } from "../services/apiServices";

const ContactForm = () => {
  const [emailData, setEmailData] = useState({
    email : "",
    subject : "",
    message : ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInput = (e)=>{
    const {id, value} = e.target;
    setEmailData(prev=>({
      ...prev,
      [id] : value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try{
      await sendEmail(emailData);
      setSubmitMessage("Message Successfully Send.");
      setEmailData({
        email : "",
        subject : "",
        message : ""
      });
    }catch(e){
      setSubmitMessage("Failed : ",e.message);
    }finally{
      setIsSubmitting(false);
      setTimeout(() => {
        setSubmitMessage("")
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center h-full bg-black p-5"
    >
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-5 w-full max-w-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-white text-2xl font-semibold text-center mb-8 text-shadow"
        >
          Get In Touch
        </motion.h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white/80 text-sm ml-1">
              Email
            </label>
            <motion.input
              id="email"
              type="email"
              value={emailData.email}
              onChange={handleInput}
              required
              whileFocus={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.3)" }}
              className="px-4 py-3 rounded-xl border-none bg-white/10 text-white placeholder-white/50 focus:bg-white/15 focus:outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white/80 text-sm ml-1">
              Subject
            </label>
            <motion.input
              id="subject"
              type="subject"
              value={emailData.subject}
              onChange={handleInput}
              required
              whileFocus={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.3)" }}
              className="px-4 py-3 rounded-xl border-none bg-white/10 text-white placeholder-white/50 focus:bg-white/15 focus:outline-none transition-all"
              placeholder="subject of your email"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-white/80 text-sm ml-1">
              Message
            </label>
            <motion.textarea
              id="message"
              value={emailData.message}
              onChange={handleInput}
              required
              whileFocus={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.3)" }}
              className="px-4 py-3 rounded-xl border-none bg-white/10 text-white placeholder-white/50 focus:bg-white/15 focus:outline-none transition-all min-h-[150px] resize-y"
              placeholder="Your message here..."
            />
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-400 text-white font-semibold mt-2 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              "Contact Me"
            )}
          </motion.button>
          
          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-500 text-sm text-center mt-2"
            >
              {submitMessage}
            </motion.div>
          )}
        </form>
      </div>
    </motion.div>
  );
};

const ContactSection = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="sm:flex-1/2 w-full">
        <ContactForm />
      </div>
      <div className="flex-1/2 overflow-hidden rounded-3xl hidden md:flex justify-center items-center p-20">
        <img 
          src={contactSVG} 
          alt="contactSVG" 
          className="h-[50%] rounded-4xl opacity-70"
        />
      </div>
    </div>
  )
}

export default SectionWraper(ContactSection)