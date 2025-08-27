import { createContext, useEffect, useState } from "react";
import { getExperiences, getMatrix, getProjects, getSkills, getTestimonials } from "../services/apiServices";

const educationDetails = [
  {
    orgName : "Budge Budge Institute of Technology",
    course : "Computer Science and Engineering",
    degree : "B.Tech",
    duration : "August, 2021 - June, 2025",
    marks : 8.66,
    board : "Maulana Abul Kalam Azad University of Technology",
    location : "Kolkata, West Bengal",
    img : "./bbit.jpg"
  },
  {
    orgName : "Balurghat L.M.A.U Vidyalaya",
    course : "Science (PCM)",
    degree : "Higher Secondary",
    duration : "August, 2020 - July, 2021",
    marks : 85.6,
    board : "West Bengal Council of Higher Secondary Education (WBCHSE)",
    location : "Balurghat",
    img : "./BalurghatLMAU.jpg"
  },
  {
    orgName : "Trimohini P.C.U.M Vidyalaya",
    course : "General",
    degree : "Secondary",
    duration : "2018 - June, 2019",
    marks : 76.71,
    board : "West Bengal Board of Secondary Education (WBBSE)",
    location : "Trimohini",
    img : "./trimohiniPCUM.jpg"
  },
]

const defaultMatrix = [
  {
    "title": "Total Projects",
    "data": 0,
    "icon": "all",
  },
  {
    "title": "Total Client Projects",
    "data": 0,
    "icon": "work",
  },
  {
    "title": "Total Happy Clients",
    "data": 0,
    "icon": "person",
  }
]

const services = [
    {
      title: "Full Stack Website Development",
      description: "End-to-end development of responsive, modern websites with both frontend and backend functionality. I create seamless user experiences with robust architecture.",
      icon: "💻",
      features: ["Responsive Design", "Database Integration", "User Authentication", "Deployment & Hosting"]
    },
    {
      title: "Redesign Websites",
      description: "Transform outdated websites into modern, user-friendly experiences that convert visitors into customers.",
      icon: "🎨",
      features: ["UI/UX Improvement", "Performance Optimization", "Content Restructuring", "Modern Design Principles"]
    },
    {
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs, from desktop applications to complex business systems and tools.",
      icon: "⚙️",
      features: ["Custom Solutions", "Cross-Platform Apps", "Maintenance & Support", "Scalable Architecture"]
    },
    {
      title: "API Development",
      description: "Design and development of robust RESTful APIs endpoints that enable seamless integration between your systems and third-party services.",
      icon: "🔌",
      features: ["REST API", "Third-party Integrations", "Documentation", "Security Implementation"]
    }
  ];

export const AppContext = createContext(null);

export const AppContextProvider = ({
    children
})=>{
    const [loading, setLoading] = useState(true);
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [matrixes, setMatrixes] = useState(defaultMatrix);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
      async function fetchAllData(){
        setLoading(true);
        try{
          const projectsData = await getProjects();
          const experienceData = await getExperiences();
          const skillsData = await getSkills();
          const matrixData = await getMatrix();
          const testimonialsData = await getTestimonials();
          setProjects(projectsData);
          setExperiences(experienceData);
          setSkills(skillsData);
          setMatrixes(matrixData);
          setTestimonials(testimonialsData);
        }catch(e){
          console.error(e);
        }
      }
      
      fetchAllData();
    }, [])
    

    const contextValue = {
      loading,
      setLoading,
      experiences,
      skills,
      educationDetails,
      matrixes,
      testimonials,
      projects,
      setProjects,
      setExperiences,
      setSkills,
      setMatrixes,
      setTestimonials,
      services
    }

    return (<AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>)
}


