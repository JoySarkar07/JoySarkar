import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { MdOutlineWork } from "react-icons/md";
import { GoOrganization } from "react-icons/go";
import { getFormattedDate } from "../services/generalService";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const ExperienceCard = ({
  experience
})=>{
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{
        background: "transparent", // let wrapper handle gradient
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        padding: 0, // remove default padding so wrapper works
        border: "none"
      }}
      contentArrowStyle={{ borderRight: "7px solid rgb(42 152 51)" }}
      date={getFormattedDate(experience.startDate)+" - "+getFormattedDate(experience.endDate)}
      iconStyle={{ background: "#232631" }}
      icon={<MdOutlineWork className="text-green-300" />}
    >
      {/* Gradient Border Wrapper */}
      <div
        style={{
          borderRadius: "12px",
          padding: "2px", // border thickness
          background: "linear-gradient(135deg, rgb(1 26 8), rgb(65 157 91))"
        }}
      >
        {/* Inner Card */}
        <div
          style={{
            borderRadius: "10px",
            background: "linear-gradient(135deg, rgb(4 75 15), rgb(1 11 1))",
            padding: "16px",
            color: "#fff"
          }}
        >
          <h3 className="text-white vertical-timeline-element-title">
            {experience.jobTitle}
          </h3>
          <span className="text-gray-400 vertical-timeline-element-subtitle flex items-center gap-2">
            <GoOrganization 
              className="text-white text-2xl"
            />
            {experience.companyName}
          </span>
          <ul className="text-gray-200 pl-5 mt-2">
            {experience.description.map((point, ind) => (
              <li key={ind} style={{ listStyle: "initial" }}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </VerticalTimelineElement>
  );
}


const ExperienceSection = () => {
  const { experiences } = useContext(AppContext);
  return (
    <div className="relative">
      <h1 className="text-4xl text-green-300 mb-3 text-center">ExperienceSection</h1>
      <div>
        {
          experiences.length > 0
          ? <VerticalTimeline>
              {
                experiences.map((experience, ind)=>{
                  return <ExperienceCard key={ind} experience={experience}/>
                })
              }
            </VerticalTimeline>
          : <p className="text-center text-4xl text-indigo-500 p-5">No Experiences</p>
        }
        
      </div>
    </div>
  )
}

export default ExperienceSection