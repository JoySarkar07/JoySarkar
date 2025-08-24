import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit, MdLocationOn, MdStar, MdStarBorder, MdStarHalf } from 'react-icons/md';
import { addProject, updateProject, deleteProjectById, addSkill, deleteSkillById, updateMatrixById, deleteRewiewById, updateReview, addExperience, updateExperience, deleteExperienceById } from '../services/apiServices';
import FileUpload from '../components/FileUpload';

const Chip = ({content, onDelete, classes=""})=>{
  return (
    <div className={`${classes} flex items-center bg-gray-500 justify-between p-2 rounded-2xl`}>
      <p>{content}</p>
      <button 
        onClick={onDelete}
        className='bg-black p-1 rounded-2xl cursor-pointer m-1'>
        <MdDelete className='text-xl text-red-600' />
      </button>
    </div>
  );
}

const ProjectCard = ({project, setForEdit, deleteProject})=>{
  return (
    <div className='h-20 rounded-2xl p-2 mb-2 flex gap-2 bg-gradient-to-br from-gray-500 to-violet-900'>
      <img className='rounded-2xl' src={project.imageUrl} alt="projectImage" />
      <div className='flex-1 max-w-[70%] overflow-x-auto p-1'>
        <span className='flex gap-2'>title <p>: {project.title}</p></span>
        <span className='flex gap-2'>github <p>: {project.githubLink}</p></span>
      </div>
      <div className='flex flex-col gap-3 justify-center items-center'>
        <button title='delete' className='p-2 bg-gray-900 rounded-xl cursor-pointer' onClick={()=>deleteProject(project._id)}><MdDelete className='text-red-300'/></button>
        <button title='edit' className='p-2 bg-gray-900 rounded-xl cursor-pointer' onClick={setForEdit}><MdEdit className='text-blue-300' /></button>
      </div>
    </div>
  );
}

const ExperienceCard = ({ experience, setForEdit, deleteExperience }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl border border-gray-100 dark:border-gray-700"
    >
      <div className="flex justify-between items-start">
        {/* Experience Content */}
        <div className="flex-1 pr-4">
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4">
              {experience.companyName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-bold text-xl text-gray-800 dark:text-white">
                {experience.companyName}
              </h2>
              <div className="flex items-center text-gray-600 dark:text-gray-300 mt-1">
                <MdLocationOn className="mr-1 text-blue-500" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>
          
          {/* Additional details (if available) */}
          {experience.position && (
            <p className="text-gray-700 dark:text-gray-200 font-medium mb-2">
              {experience.position}
            </p>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className='flex flex-col gap-3 transition-opacity duration-200'>
          <button 
            onClick={() => deleteExperience(experience._id)}
            title="Delete"
            className="p-2 bg-white dark:bg-gray-700 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <MdDelete className="text-red-400 hover:text-red-500 text-xl" />
          </button>
          <button 
            onClick={setForEdit}
            title="Edit/View"
            className="p-2 bg-white dark:bg-gray-700 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <MdEdit className="text-blue-400 hover:text-blue-500 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [comment, setComment] = useState(review.review);
  const [edit, setEdit] = useState(false);
  
  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<MdStar key={i} className="text-yellow-400 text-lg" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<MdStarHalf key={i} className="text-yellow-400 text-lg" />);
      } else {
        stars.push(<MdStarBorder key={i} className="text-yellow-400 text-lg" />);
      }
    }
    
    return stars;
  };

  const editReview = (id)=>{
    const newEdit = !edit;
    setEdit(newEdit);
    if(newEdit) return;
    if(review.review===comment) return;
    onEdit(id, comment);
  }
  

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl border border-gray-100 dark:border-gray-700 ${
        isHovered ? 'ring-2 ring-blue-100 dark:ring-blue-900' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-start">
        {/* Review Content */}
        <div className="flex-1 pr-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-3">
              {review.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">{review.name}</h3>
              <div className="flex items-center mt-1">
                <div className="flex mr-2">
                  {renderStars(review.rating)}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{review.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          {
            edit
            ? <textarea name="review" id="review" className='w-full border rounded-2xl p-2' value={comment} onChange={(e)=>setComment(e.target.value)}></textarea>
            : <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                "{review.review}"
              </p>
          }
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <button 
            onClick={()=>onDelete(review._id)}
            title="Delete"
            className="p-2 bg-white dark:bg-gray-700 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500"
          >
            <MdDelete className="text-red-400 hover:text-red-500 text-xl" />
          </button>
          <button 
            onClick={()=>editReview(review._id)}
            title="Edit"
            className="p-2 bg-white dark:bg-gray-700 rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-500"
          >
            <MdEdit className="text-blue-400 hover:text-blue-500 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};


const AdminPage = () => {

  const { projects, setProjects, skills, setSkills, matrixes, setMatrixes, testimonials, setTestimonials, experiences, setExperiences } = useContext(AppContext);
  const navigate = useNavigate();

  const [projectInputs, setProjectInputs] = useState({
    title: "",
    description : [],
    imageUrl : "",
    techStack : [],
    githubLink : "",
    liveLink : "",
    isClientProject : false
  })
  const [experienceInputs, setExperienceInputs] = useState({
    companyName: "",
    jobTitle: "",
    description : [],
    startDate: "",
    endDate: "",
    location : ""
  })
  const [descriptionInput, setDescriptionInput] = useState("");
  const [expdescriptionInput, setExpDescriptionInput] = useState("");
  const [tech, setTech] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    setFilteredReviews(testimonials);
  }, [testimonials])

  const clearMessage = ()=>{
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }
  

  const updateMatrixProjectAndClient = async (isClient, action="inc")=>{
    let matrix = matrixes;
    if(isClient){
      const cmatrix = matrixes.filter(mat=>mat.title==="Total Client Projects")[0];
      const val = action==="inc"? Number(cmatrix.data)+1 : Number(cmatrix.data)-1;
      await updateMatrixById(cmatrix._id, val);
      matrix = matrix.map(mat=>{
        if(mat._id===cmatrix._id){
          return {...mat, data: val};
        }
        return mat;
      });
    }
    const pmatrix = matrixes.filter(mat=>mat.title==="Total Projects")[0];
    const val = action==="inc"? Number(pmatrix.data)+1 : Number(pmatrix.data)-1;
    await updateMatrixById(pmatrix._id, val);
    matrix = matrix.map(mat=>{
        if(mat._id===pmatrix._id){
          return {...mat, data: val};
        }
        return mat;
      });
    setMatrixes(matrix);
  }


  const hadleInputs = (e, setInput)=>{
    const { id, value, checked, type } = e.target;
    setInput(prev=>({
      ...prev,
      [id] : type==="checkbox"?checked:value
    }))
  }

  const handleKeyPress = (e, setFunction, input, setInput) => {
    const { name } = e.target;
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault();
      setFunction((prev) => ({
        ...prev,
        [name]: [...prev[name], input.trim()]
      }));
      setInput("") // clear input field after adding
    }
  };

  const handleKeyPressInSkiils = async (e) => {
    if (e.key === "Enter" && skillsInput.trim() !== "") {
      e.preventDefault();
      try{
        const response = await addSkill({skill: skillsInput});
        setSkills(prev=>[...prev, response]);
        setSkillsInput("")
        setMessage("New skills added 👍");
      }catch(e){
        setMessage(e.message);
      }finally{
        clearMessage();
      }
    }
  };

  const handleProjectSubmit = async (e)=>{
    e.preventDefault();
    if(!projectInputs.title || !projectInputs.githubLink || !projectInputs.imageUrl || projectInputs.description.length===0 || projectInputs.techStack.length===0) return;
    try{
      if(projectInputs._id){
        const response = await updateProject(projectInputs, projectInputs._id);
        const updatedProjects = projects.map(project=>{
          if(project._id===projectInputs._id) return response;
          return project;
        })
        setProjects(updatedProjects);
        setMessage("New Project updated successfully 👍");
      }else{
        const response = await addProject(projectInputs);
        updateMatrixProjectAndClient(projectInputs.isClientProject, "inc");
        setProjects(prev=>[...prev, response]);
        setMessage("New Project added successfully 👍");
      }
      setProjectInputs({
        title: "",
        description : [],
        imageUrl : "",
        techStack : [],
        githubLink : "",
        liveLink : "",
        isClientProject : false
      });
    }catch(e){
      setMessage(e.message);
    }finally{
      clearMessage();
    }
  }

  const setForEdit = (fields, setForm)=>{
    if(fields.startDate){
      fields.startDate = fields.startDate.substring(0,10);
      fields.endDate = fields.endDate.substring(0,10);
    }
    setForm(fields);
  }

  const deleteProject = async (id)=>{
    try{
      await deleteProjectById(id);
      let isClient;
      const updatedProjects = projects.filter(project=>{
        if(project._id!==id){
          return project;
        }
        isClient = project.isClientProject;
      });
      updateMatrixProjectAndClient(isClient, "dec");
      setProjects(updatedProjects);
      setMessage("Project deleted successfully 👍");
    }catch(e){
      setMessage(e.message);
    }finally{
      clearMessage();
    }
  }

  const handleDescDelete = (e, id, inputs, setInputs)=>{
    e.preventDefault();
    const updateDesc = inputs.description.filter((_, ind) => ind !== id);
    setInputs(prev=>({
      ...prev,
      description : updateDesc
    }))
  }

  const handleTechStackDelete = (e, id)=>{
    e.preventDefault();
    const updateTechStack = projectInputs.techStack.filter((_, ind)=>ind!==id);
    setProjectInputs(prev=>({
      ...prev,
      techStack : updateTechStack
    }))
  }

  const logout = ()=>{
    localStorage.removeItem("protfoliotoken");
    navigate("/login");
  }

  const deleteSkill = async (e, id)=>{
    e.preventDefault();
    try{
      await deleteSkillById(id);
      const updatedSkills = skills.filter(skill=>skill._id!==id);
      setSkills(updatedSkills);
      setMessage("Skill removed successfully 👍");
    }catch(e){
      setMessage(e.message);
    }finally{
      clearMessage();
    }
  }

  const updateMatrix = async (e, mid)=>{
    const { value } = e.target;
    try{
      await updateMatrixById(mid, value);
      const mat = matrixes.map(matrix=>{
        if(matrix._id===mid){
          return {...matrix, data:value};
        }
        return matrix;
      })
      setMatrixes(mat);
      setMessage("Matrix updated successfully 👍");
    }catch(e){
      setMessage(e.message);
    }finally{
      clearMessage();
    }
  }

  const onReviewUpdate = async (id, comment)=>{
    try{
      const response = await updateReview(id, {review: comment});
      const updated = testimonials.map(review=>{
        if(review._id===id) return response;
        return review;
      })
      setTestimonials(updated);
      setMessage("Review Updated Successfully 👍");
    }catch(e){
      setMessage(e.message);
    }finally{
      clearMessage();
    }
  }

  const onReviewDelete = async (id)=>{
    try{
      await deleteRewiewById(id);
      const updated = testimonials.filter(tes=>tes._id!==id);
      setTestimonials(updated);
      setMessage("Review Deleted Successfully 👍")
    }catch(e){
      setMessage(e.message);
    }finally{
      clearMessage();
    }
  }

  const searchReview = (e)=>{
    const reviews = testimonials.filter(review=>review.name.toLowerCase().match(e.target.value.toLowerCase()));
    setFilteredReviews(reviews)
  }

  const handleExperienceSubmit = async (e)=>{
    e.preventDefault();
    try{
      let updatedExp = experiences;
      if(experienceInputs._id){
        const response = await updateExperience(experienceInputs, experienceInputs._id);
        updatedExp = updatedExp.map(exp=>{
          if(exp._id===experienceInputs._id){
            return response;
          }
          return exp;
        })
        setMessage("Experience Updated successfully !!");
      }else{
        const response = await addExperience(experienceInputs);
        updatedExp = [...updatedExp, response];
        setMessage("New Experience added successfully !!");
      }
      setExperiences(updatedExp);
      setExperienceInputs({
        companyName: "",
        jobTitle: "",
        description : [],
        startDate: "",
        endDate: "",
        location : ""
      })
    }catch(error){
      setMessage(error.message);
    }finally{
      clearMessage();
    }
  }

  const deleteExperience = async (id)=>{
    try{
      await deleteExperienceById(id);
      const updatedExp = experiences.filter(exp=>exp._id!==id);
      setExperiences(updatedExp);
      setMessage("Experience deleted successfully !!")
    }catch(e){
      setMessage(e.message);
    }finally{
      clearMessage();
    }
  }


  return (
    <>
    <div className='h-screen flex'>
      {
        message && <p className='absolute bg-black p-3 top-1 left-1 rounded-2xl'>{message}</p>
      }
      <button 
        onClick={logout}
        className='absolute p-2 top-2 right-2 cursor-pointer bg-teal-900 rounded-4xl'>
        Logout
      </button>
      <div className='flex-1/3 bg-gradient-to-t from-cyan-600 to-gray-500'>
        <p className='text-2xl text-green-300 text-center'>Add New Project</p>
        <form onSubmit={handleProjectSubmit} className='border-green-300 flex flex-col gap-2 p-2 rounded-2xl h-[50vh] overflow-y-auto'>
          <input type="text" id='title' required value={projectInputs.title} onChange={(e)=>hadleInputs(e, setProjectInputs)} className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' placeholder='Enter Project Title'/>
          <div className='flex gap-2'>
            <input type="text" id='liveLink' value={projectInputs.liveLink} onChange={(e)=>hadleInputs(e, setProjectInputs)} className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' placeholder='Enter Project live url if live'/>
            <input type="text" id='githubLink' required value={projectInputs.githubLink} onChange={(e)=>hadleInputs(e, setProjectInputs)}  className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' placeholder='Enter Project github url'/>
          </div>
          <input type="text" id='imageUrl' required value={projectInputs.imageUrl} onChange={(e)=>hadleInputs(e, setProjectInputs)} className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' placeholder='Enter Project image Url.'/>
          {
            projectInputs.imageUrl && <img className='rounded-2xl' src={projectInputs.imageUrl} alt="projectImage" />
          }
          <div className='border p-1 rounded-2xl'>
              <input className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" type="text" name="description" id="description" value={descriptionInput} onChange={(e)=>setDescriptionInput(e.target.value)} onKeyDown={(e)=>handleKeyPress(e, setProjectInputs, descriptionInput, setDescriptionInput)} placeholder='press enter for add description'/>
              <div className='border h-40 overflow-y-auto rounded-2xl p-2 mt-2 flex flex-col gap-1'>
                {
                  projectInputs.description.map((desc, ind)=>{
                    return <Chip key={ind} content={desc} onDelete={(e)=>handleDescDelete(e, ind, projectInputs, setProjectInputs)}/>
                  })
                }
              </div>
          </div>
          <div className='border p-1 rounded-2xl'>
              <input className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" type="text" name="techStack" id="techStack" value={tech} onChange={(e)=>setTech(e.target.value)} onKeyDown={(e)=>handleKeyPress(e, setProjectInputs, tech, setTech)} placeholder='press enter for add techstack'/>
              <div className='border h-40 overflow-y-auto rounded-2xl p-2 mt-2 flex flex-wrap gap-1'>
                {
                  projectInputs.techStack.map((desc, ind)=>{
                    return <Chip key={ind} content={desc} id={ind} onDelete={handleTechStackDelete} classes='w-fit h-fit'/>
                  })
                }
              </div>
          </div>
          <span className='ml-5'><input type="checkbox" name="isClientProject" id="isClientProject" checked={projectInputs.isClientProject} onChange={(e)=>hadleInputs(e, setProjectInputs)}/> This is a client Project.</span>
          <button
            type='submit'
            className='p-2 shadow-2xl/50 cursor-pointer rounded-2xl bg-gradient-to-bl from-yellow-500 to-indigo-600'
          >
            {
              projectInputs._id ? "Update" : "Submit"
            }
          </button>
        </form>
        <div className='bg-black h-[45vh] overflow-y-auto p-2'>
            {
              projects.length > 0 
              ? projects.map((project, ind)=>{
                return <ProjectCard key={ind} project={project} setForEdit={()=>setForEdit(project, setProjectInputs)} deleteProject={deleteProject}/>;
              })
              : <p className='h-full flex justify-center items-center text-4xl text-green-400'>No Projects to show</p>
            }
        </div>
      </div>
      <div className='border-x border-green-500 mx-2 px-1 flex-1/3'>
       <p className='text-2xl text-green-300 text-center'>Add New Experience</p>
        <form onSubmit={handleExperienceSubmit} className='border-green-300 flex flex-col gap-2 p-2 rounded-2xl h-[50vh] overflow-y-auto'>
          <input type="text" id='companyName' required value={experienceInputs.companyName} onChange={(e)=>hadleInputs(e, setExperienceInputs)} className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' placeholder='Enter Company Name'/>
          <input type="text" id='jobTitle' required value={experienceInputs.jobTitle} onChange={(e)=>hadleInputs(e, setExperienceInputs)} className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' placeholder='Enter JOB Title'/>
          <div className='flex gap-2'>
            <input type="date" id='startDate' value={experienceInputs.startDate} onChange={(e)=>hadleInputs(e, setExperienceInputs)} className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' />
            <input type="date" id='endDate' required value={experienceInputs.endDate} onChange={(e)=>hadleInputs(e, setExperienceInputs)}  className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' />
          </div>
          <input type="text" id='location' required value={experienceInputs.location} onChange={(e)=>hadleInputs(e, setExperienceInputs)} className='w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition' placeholder='Enter Location'/>
          <div className='border p-1 rounded-2xl'>
              <input className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" type="text" name="description" id="expdescription" value={expdescriptionInput} onChange={(e)=>setExpDescriptionInput(e.target.value)} onKeyDown={(e)=>handleKeyPress(e, setExperienceInputs, expdescriptionInput, setExpDescriptionInput)} placeholder='press enter for add experience description'/>
              <div className='border h-40 overflow-y-auto rounded-2xl p-2 mt-2 flex flex-col gap-1'>
                {
                  experienceInputs.description.map((desc, ind)=>{
                    return <Chip key={ind} content={desc} onDelete={(e)=>handleDescDelete(e, ind, experienceInputs, setExperienceInputs)}/>
                  })
                }
              </div>
          </div>          
          <button
            type='submit'
            className='p-2 shadow-2xl/50 cursor-pointer rounded-2xl bg-gradient-to-bl from-yellow-500 to-indigo-600'
          >
            {
              experienceInputs._id ? "Update" : "Submit"
            }
          </button>
        </form>
        <div className='bg-black h-[45vh] overflow-y-auto p-2 flex flex-col gap-2'>
            {
              experiences.length > 0 
              ? experiences.map((exp, ind)=>{
                return <ExperienceCard key={ind} experience={exp} setForEdit={()=>setForEdit(exp, setExperienceInputs)} deleteExperience={deleteExperience}/>;
              })
              : <p className='h-full flex justify-center items-center text-4xl text-green-400'>No Experience to show</p>
            }
        </div>
      </div>
      <div className='flex-1/3 flex flex-col'>
        <div className='flex-1/3'>
            <p className='text-2xl text-green-400 text-center'>Skills</p>
            <div className='border p-1 rounded-2xl'>
              <input 
                className="w-full bg-slate-700 border border-slate-600 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                type="text" 
                name="skill" 
                id="skill" 
                value={skillsInput} 
                onChange={(e)=>setSkillsInput(e.target.value)} 
                onKeyDown={handleKeyPressInSkiils} 
                placeholder='press enter for add skill'
              />
              <div className='border h-40 overflow-y-auto rounded-2xl p-2 mt-2 flex flex-wrap gap-1'>
                {
                  skills.map((skillData, ind)=>{
                    return <Chip key={ind} content={skillData.skill} id={skillData._id} onDelete={deleteSkill} classes='w-fit h-fit'/>
                  })
                }
              </div>
          </div>
        </div>
        <div className='border-y border-green-500 my-2 py-1'>
          <p className='text-2xl text-green-400 text-center'>Matrixes</p>
          {
            matrixes.map((mat, ind)=>{
              return <span key={ind} className='flex gap-5 p-2 items-center'>
                  <h1 className='text-xl'>{mat.title}</h1>
                  <input type="number" min={0} className='w-20 bg-gray-500 text-center p-2 rounded-2xl' value={mat.data} onChange={(e)=>updateMatrix(e, mat._id)}/>
                </span>;
            })
          }
        </div>
        <div className='flex-1/3 flex flex-col gap-3 overflow-y-auto p-2'>
          <div>
            <input type="text" name="search" id="search" className='border w-full p-2 rounded-2xl' placeholder='Search comment by name' onChange={searchReview}/>
          </div>
          {
            filteredReviews.map((review, ind)=>{
              return <ReviewCard key={ind} review={review} onDelete={onReviewDelete} onEdit={onReviewUpdate}/>
            })
          }
        </div>
      </div>
    </div>
    <FileUpload setMessage={setMessage}/>
    </>
  )
}

export default AdminPage