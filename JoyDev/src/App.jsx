import { useRef } from 'react';
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ReviewPage from './pages/ReviewPage';
import NotFoundPage from './pages/NotFoundPage';


const App = () => {
  const hero = useRef(null);
  const project = useRef(null);
  const experience = useRef(null);
  const skills = useRef(null);
  const contact = useRef(null);
  const sevices = useRef(null);

  const scrollToSection = (id) => {
    let ref = null;
    switch (id) {
      case 'projects': ref = project;
        break;
      case 'experience': ref = experience;
        break;
      case 'skills': ref = skills;
        break;
      case 'contact': ref = contact;
        break;
      case 'sevices': ref = sevices;
        break;
      default: ref = hero;
        break;
    }
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const ProtectedRoute = ({element})=>{
    if(!localStorage.getItem("protfoliotoken")){
      return <Navigate to="/login" replace/>;
    }
    return element;
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<><Navbar scrollToSection={scrollToSection}/><HomePage hero={hero} project={project} experience={experience} skills={skills}  contact={contact} sevices={sevices} scrollToSection={scrollToSection}/></>}/>
        <Route path='/projects' element={<ProjectPage />} />
        <Route path='/review' element={<ReviewPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<ProtectedRoute element={<AdminPage />} />} />
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App