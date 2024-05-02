import { Route, Routes } from "react-router-dom";
// import OpenRoute from './components/core/Auth/OpenRoute'
import "./App.css";
import Home from './pages/Home'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from './components/common/Navbar'
// import UpdatePassword from "./pages/UpdatePassword";
import About from './pages/About'
import Contact from "./pages/Contact";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Error from './pages/Error'
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/verify-email" element={<VerifyEmail/>} />
      <Route path="/update-password:id" element={<UpdatePassword/>} /> 
      <Route element={<PrivateRoute> <Dashboard /> </PrivateRoute>}>
        
        <Route path="/dashboard/my-profile" element={<MyProfile/>} />


        <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
      
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
   </div>
  );
}

export default App;
