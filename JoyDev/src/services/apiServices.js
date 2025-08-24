import axios from "axios";

const getApiLink = (endpoint)=>{
    const ENV = VITE_ENV;
    if(ENV) return "https://joysarkar.onrender.com/api/v1/"+endpoint;
    return `http://localhost:3000/api/v1/${endpoint}`;
}

// Services for all user

export const getProjects = async ()=>{
    const response = await axios.get(getApiLink("project"));
    return response.data.data;
}

export const getExperiences = async ()=>{
    const response = await axios.get(getApiLink("experience"));
    return response.data.data;
}

export const getMatrix = async ()=>{
    const response = await axios.get(getApiLink("matrix"));
    return response.data.data;
}

export const getTestimonials = async ()=>{
    const response = await axios.get(getApiLink("review"));
    return response.data.data;
}

export const getSkills = async ()=>{
    const response = await axios.get(getApiLink("skill"));
    return response.data.data;
}

export const sendEmail = async (emailData)=>{
    await axios.post(getApiLink("email"), emailData);
}

export const addReview = async (reviewData)=>{
    const response = await axios.post(getApiLink("review"), reviewData);
    return response.data.data;
}

export const updateReview = async (id, updatedData)=>{
    const response = await axios.patch(getApiLink(`review/${id}`), updatedData);
    return response.data.data;
}



// Services for only admin

export const login = async (loginData)=>{
    const response = await axios.post(getApiLink("user/login"), loginData);
    return response.data;
}

export const addProject = async (projectData)=>{
    const token = localStorage.getItem("protfoliotoken");
    const response = await axios.post(getApiLink("project"), projectData, {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
    return response.data.data;
}

export const updateProject = async (updatedData, id)=>{
    const token = localStorage.getItem("protfoliotoken");
    const response = await axios.patch(getApiLink(`project/${id}`), updatedData, {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
    return response.data.data;
}

export const deleteProjectById = async (id)=>{
    const token = localStorage.getItem("protfoliotoken");
    await axios.delete(getApiLink(`project/${id}`), {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
}

export const addSkill = async (skillData)=>{
    const token = localStorage.getItem("protfoliotoken");
    const response = await axios.post(getApiLink("skill"), skillData, {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
    return response.data.data;
}

export const deleteSkillById = async (id)=>{
    const token = localStorage.getItem("protfoliotoken");
    await axios.delete(getApiLink(`skill/${id}`), {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
}

export const updateMatrixById = async (id, data)=>{
    const token = localStorage.getItem("protfoliotoken");
    await axios.patch(getApiLink(`matrix/${id}`), {data}, {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
}

export const deleteRewiewById = async (id)=>{
    const token = localStorage.getItem("protfoliotoken");
    await axios.delete(getApiLink(`review/${id}`), {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
}

export const addExperience = async (experienceData)=>{
    const token = localStorage.getItem("protfoliotoken");
    const response = await axios.post(getApiLink("experience"), experienceData, {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
    return response.data.data;
}

export const updateExperience = async (updatedData, id)=>{
    const token = localStorage.getItem("protfoliotoken");
    const response = await axios.patch(getApiLink(`experience/${id}`), updatedData, {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
    return response.data.data;
}

export const deleteExperienceById = async (id)=>{
    const token = localStorage.getItem("protfoliotoken");
    await axios.delete(getApiLink(`experience/${id}`), {
        headers : {
            "Authorization" : `Bearer ${token}`
        }
    });
}