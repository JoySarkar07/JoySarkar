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

export const AppContext = createContext(null);

export const AppContextProvider = ({
    children
})=>{
    const [experiences, setExperiences] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [matrixes, setMatrixes] = useState(defaultMatrix);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
      async function fetchAllData(){
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
      setTestimonials
    }

    return (<AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>)
}


