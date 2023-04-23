import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'

import Home from './layouts/Home/Home'
import ITCategory from './layouts/Category/ITCategory';
import MultimediaCategory from './layouts/Category/MultimediaCategory';
import AllCoursesH from './layouts/Category/AllCourses';
import CourseDetailPage from './layouts/CourseDetails/CourseDetailPage';

import Login from './views/Authentication/Login';
import Signup from './views/Authentication/Signup';

import Navbar2 from './components/Navbar/Navbar2'
import Footer from './components/Footer/Footer'
import EditUser from './layouts/Edit-User/EditUser';
import EditUserProfile from './views/EditUser/EditUserProfile';
import EditPhoto from './views/EditUser/EditPhoto';
import AccountSecurity from './views/EditUser/AccountSecurity';
import CloseAccount from './views/EditUser/CloseAccount';
import MyCourses from './layouts/My-Courses/MyCourses';
import AdminDashboard from './layouts/AdminDashboard/AdminDashboard';
import Dashboard from './views/AdminDashboard/Dashboard';
import AllCourses from './views/AdminDashboard/AllCourses';
import AdminLogin from './views/Authentication/AdminLogin';
import AddCourse from './views/AdminDashboard/AddCourse';
import Instructor from './views/AdminDashboard/Instructor';
import AddInstructor from './views/AdminDashboard/AddInstructor';
import InstructorProfile from './views/AdminDashboard/InstructorProfile';
import EditInstructor from './views/AdminDashboard/EditInstructor';
import EditCourse from './views/AdminDashboard/EditCourse';
import ManageCourse from './views/AdminDashboard/ManageCourse';
import Users from './views/AdminDashboard/Users';
import Students from './views/AdminDashboard/Students';
import AddUser from './views/AdminDashboard/AddUser';
import UserProfile from './views/AdminDashboard/UserProfile';
import ActiveCourses from './views/AdminDashboard/ActiveCourses';
import Checkout from './views/Checkout/Checkout';
import Enrollment from './views/Checkout/Enrollment';
import CourseCompletion from './views/AdminDashboard/CourseCompletion';
import InactiveCourses from './views/AdminDashboard/InactiveCourses';
import Profile from './views/AdminDashboard/Profile';
import ChangePassword from './views/AdminDashboard/ChangePassword';
import ManageAttendance from './views/AdminDashboard/ManageAttendance';
import InstructorLogin from './views/Authentication/InstructorLogin';
import AddAttendance from './views/AdminDashboard/AddAttendance';
import EditAttendance from './views/AdminDashboard/EditAttendance';
import Attendance from './views/AdminDashboard/Attendance';
import Resourses from './views/AdminDashboard/Resourses';
import AddResources from './views/AdminDashboard/AddResources';
import ManageResources from './views/AdminDashboard/ManageResources';
import FilePreview from './layouts/FilePreview/FilePreview';
import Enrollments from './views/AdminDashboard/Enrollments';
import CourseEnrollment from './views/AdminDashboard/CourseEnrollment';
import EditStudent from './views/AdminDashboard/EditUser';
import InstructorDashboard from './layouts/InstructorDashboard/InstructorDashboard';

import DashboardInstructor from './views/InstructorDashboard.js/Dashboard';
import Courses from './views/InstructorDashboard.js/Courses';
import ManageCourses from './views/InstructorDashboard.js/ManageCourses';
import ICourseEnrollment from './views/InstructorDashboard.js/CourseEnrollment';
import ICourseCompletion from './views/InstructorDashboard.js/CourseCompletion';
import IStudents from './views/InstructorDashboard.js/Students';
import StudentProfile from './views/InstructorDashboard.js/StudentProfile';
import IProfile from './views/InstructorDashboard.js/Profile';
import IChangePassword from './views/InstructorDashboard.js/ChangePassword';
import IEnrollment from './views/InstructorDashboard.js/Enrollment';
import IAttendance from './views/InstructorDashboard.js/Attendance';
import IManageAttendance from './views/InstructorDashboard.js/ManageAttendance';
import IAddAttendance from './views/InstructorDashboard.js/AddAttendance';
import IResources from './views/InstructorDashboard.js/Resources';
import IManageResources from './views/InstructorDashboard.js/ManageResources';
import CourseHome from './layouts/My-Courses/CourseHome';
import HomeCourse from './layouts/My-Courses/HomeCourse';

import SAttendance from './layouts/My-Courses/Attendance'
import SResources from './layouts/My-Courses/Resources';
import SuccessEnrollment from './views/Checkout/SuccessEnrollment';
import AboutUs from './views/Homepages/Pages/AboutUs';
import Messages from './views/AdminDashboard/Messages';
import ViewMessage from './views/AdminDashboard/ViewMessage';
import ForgetPassword from './views/Authentication/ForgetPassword';
import FChangePassword from './views/Authentication/ChangePassword';
import Error from './views/Error/Error';
import Contactus from './views/Homepages/Pages/Contactus';
import Features from './views/Homepages/Pages/Features';
import ForgetPasswordINS from './views/Authentication/ForgetPasswordINS';
import ChangePasswordINS from './views/Authentication/ChangePasswordINS';

function App() {

  useEffect(() => {
    const token = sessionStorage.getItem('UserToken')
    if (token) {
      const user = jwtDecode(token)
      if (!user) {
        sessionStorage.removeItem('UserToken')
      }
      else {
        const userDetails = sessionStorage.getItem('User');
        setUser(JSON.parse(userDetails))
        setlogin(true)
      }
    }
  }, [])


  const [login, setlogin] = useState(false);
  const [user, setUser] = useState();

  return (
    <Router>


      <Routes>
        <Route path="/" element={<><Navbar2 login={login} setlogin={setlogin} /><Home login={login} setlogin={setlogin} /><Footer /></>} />
        <Route path="/it-courses" element={<><Navbar2 login={login} setlogin={setlogin} /><ITCategory /><Footer /></>} />
        <Route path="/multimedia-courses" element={<><Navbar2 login={login} setlogin={setlogin} /><MultimediaCategory /><Footer /></>} />
        <Route path="/all-courses" element={<><Navbar2 login={login} setlogin={setlogin} /><AllCoursesH /><Footer /></>} />
        <Route path="/authentication/sign-in" element={<><Navbar2 login={login} setlogin={setlogin} /><Login login={login} setlogin={setlogin} /><Footer /></>} />
        <Route path="/authentication/sign-in/admin" element={<><Navbar2 login={login} setlogin={setlogin} /><AdminLogin login={login} setlogin={setlogin} /><Footer /></>} />
        <Route path="/authentication/sign-in/instructor" element={<><Navbar2 login={login} setlogin={setlogin} /><InstructorLogin login={login} setlogin={setlogin} /><Footer /></>} />
        <Route path="/authentication/sign-up" element={<><Navbar2 login={login} setlogin={setlogin} /><Signup login={login} setlogin={setlogin} /><Footer /></>} />
        <Route path="/course/:id" element={<><Navbar2 login={login} setlogin={setlogin} /><CourseDetailPage /><Footer /></>} />
        <Route path="/my-courses" element={<><Navbar2 login={login} setlogin={setlogin} /><MyCourses /><Footer /></>} />
        <Route path="/enrollment/:id" element={<><Navbar2 login={login} setlogin={setlogin} /><Enrollment /><Footer /></>} />
        <Route path="/checkout/:id" element={<><Navbar2 login={login} setlogin={setlogin} /><Checkout /><Footer /></>} />
        <Route path="/about-us" element={<><Navbar2 login={login} setlogin={setlogin} /><AboutUs /><Footer /></>} />
        <Route path="/contact-us" element={<><Navbar2 login={login} setlogin={setlogin} /><Contactus /><Footer /></>} />
        <Route path="/features" element={<><Navbar2 login={login} setlogin={setlogin} /><Features /><Footer /></>} />
        <Route path="/file-preview/:id" element={<><FilePreview /></>} />
        <Route path="/forget-password" element={<><ForgetPassword /></>} />
        <Route path="/forget-password/instructor" element={<><ForgetPasswordINS /></>} />
        <Route path="/change-password/:time/:id" element={<><FChangePassword /></>} />
        <Route path="/change-password/instructor/:time/:id" element={<><ChangePasswordINS /></>} />
        <Route path="/enrollment-success/:id" element={<><SuccessEnrollment /></>} />
        <Route path="*" element={<><Error /></>} />


        <Route path="dashboard/admin" element={<AdminDashboard />} >
          <Route path="" element={<Dashboard />} />
          <Route path="courses/all" element={<AllCourses />} />
          <Route path="courses/active" element={<ActiveCourses />} />
          <Route path="courses/inactive" element={<InactiveCourses />} />
          <Route path="courses/completion-status" element={<CourseCompletion />} />
          <Route path="courses/create" element={<AddCourse />} />
          <Route path="courses/edit/:id" element={<EditCourse />} />
          <Route path="courses/manage/:id" element={<ManageCourse />} />
          <Route path="instructor" element={<Instructor />} />
          <Route path="instructor/:id" element={<InstructorProfile />} />
          <Route path="instructor/add" element={<AddInstructor />} />
          <Route path="editinstructor/:id" element={<EditInstructor />} />
          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<AddUser />} />
          <Route path="users/edit/:id" element={<EditStudent />} />
          <Route path="users/:id" element={<UserProfile />} />
          <Route path="students" element={<Students />} />
          <Route path="my-profile/:id" element={<Profile />} />
          <Route path="changepassword/:id" element={<ChangePassword />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="attendance/course/:id" element={<ManageAttendance />} />
          <Route path="attendance/add/:id" element={<AddAttendance />} />
          <Route path="attendance/edit/:id" element={<EditAttendance />} />
          <Route path="resources" element={<Resourses />} />
          <Route path="resources/course/:id" element={<ManageResources />} />
          <Route path="resources/add/:id" element={<AddResources />} />
          <Route path="enrollments" element={<Enrollments />} />
          <Route path="enrollments/course/:id" element={<CourseEnrollment />} />
          <Route path="Messages" element={<Messages />} />
          <Route path="Message/:id" element={<ViewMessage />} />
        </Route>


        <Route path="dashboard/instructor" element={<InstructorDashboard />} >
          <Route path="home" element={<DashboardInstructor />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/manage/:id" element={<ManageCourses />} />
          <Route path="enrollments" element={<IEnrollment />} />
          <Route path="enrollments/course/:id" element={<ICourseEnrollment />} />
          <Route path="courses/completion-status" element={<ICourseCompletion />} />
          <Route path="students" element={<IStudents />} />
          <Route path="users/:id" element={<StudentProfile />} />
          <Route path="my-profile/:id" element={<IProfile />} />
          <Route path="changepassword/:id" element={<IChangePassword />} />
          <Route path="attendance" element={<IAttendance />} />
          <Route path="attendance/course/:id" element={<IManageAttendance />} />
          <Route path="attendance/add/:id" element={<IAddAttendance />} />
          <Route path="resources" element={<IResources />} />
          <Route path="resources/course/:id" element={<IManageResources />} />
          <Route path="resources/add/:id" element={<AddResources />} />
        </Route>


        <Route path="/user" element={<><Navbar2 login={login} setlogin={setlogin} /><EditUser /><Footer /></>} >
          <Route path="edit-profile" element={<EditUserProfile />} />
          <Route path="edit-photo" element={<EditPhoto />} />
          <Route path="edit-account" element={<AccountSecurity />} />
          <Route path="close-account" element={<CloseAccount />} />
        </Route>

        <Route path="/my-courses/enrolled/:id" element={<><Navbar2 login={login} setlogin={setlogin} /><CourseHome /><Footer /></>} >
          <Route path="home" element={<HomeCourse />} />
          <Route path="attendance" element={<SAttendance />} />
          <Route path="resources" element={<SResources />} />
        </Route>

      </Routes>


    </Router>
  );
}

export default App;
