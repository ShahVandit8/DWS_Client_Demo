import axios from 'axios';

const ServerURL = process.env.REACT_APP_SERVER_URL;
// const ServerURL = 'http://192.168.0.108:8000/api';

export const registerUser = async (data) => {
    try {
        return await axios.post(`${ServerURL}/register` ,data)
    }
    catch (err) {
        console.log("Error occured while calling registerUser api", err);
    }
}

export const loginUser = async (data) => {
    try {
        return await axios.post(`${ServerURL}/login` ,data, { withCredentials: true})

    }
    catch (err) {
        console.log("Error occured while calling loginUser api", err);
    }
}

export const edituserbasicdetails = async (id, data) => {
    try {
        return await axios.post(`${ServerURL}/edituserbasicdetails/${id}` ,data)

    }
    catch (err) {
        console.log("Error occured while calling edituserbasicdetails api", err);
    }
}

export const edituserphoto = async (id, data) => {
    try {
        return await axios.post(`${ServerURL}/edituserphoto/${id}` ,data)

    }
    catch (err) {
        console.log("Error occured while calling edituserphoto api", err);
    }
}

export const edituserpassword = async (id, data) => {
    try {
        return await axios.post(`${ServerURL}/edituserpassword/${id}` ,data)

    }
    catch (err) {
        console.log("Error occured while calling edituserpassword api", err);
    }
}

export const editwholedetails = async (id, data) => {
    try {
        return await axios.post(`${ServerURL}/editwholeuser/${id}` ,data)
    }
    catch (err) {
        console.log("Error occured while calling editwholedetails api", err);
    }
}


export const getUserByID = async (id) => {
    try {
        return await axios.get(`${ServerURL}/userdetails/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getUserByID api", err);
    }
}

export const getStudentsAsPerCourse = async (id) => {
    try {
        return await axios.get(`${ServerURL}/students-list/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getStudentsAsPerCourse api", err);
    }
}

export const getStudentsAsMultipleCourse = async (data) => {
    try {
        return await axios.post(`${ServerURL}/all-student-courses`, data)
    }
    catch (err) {
        console.log("Error occured while calling getStudentsAsMultipleCourse api", err);
    }
}

export const getAllStudentsAsPerCourse = async (id) => {
    try {
        return await axios.get(`${ServerURL}/all-students-list/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getStudentsAsPerCourse api", err);
    }
}





export const loginAdmin = async (data) => {
    try {
        return await axios.post(`${ServerURL}/login-admin` ,data, { withCredentials: true})

    }
    catch (err) {
        console.log("Error occured while calling loginAdmin api", err);
    }
}

export const getAdminById = async (id) => {
    try {
        return await axios.get(`${ServerURL}/admin/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getAdminById api", err);
    }
}

export const editAdminDetails = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/edit-admin/${id}`, data)
    }
    catch (err) {
        console.log("Error occured while calling editAdminDetails api", err);
    }
}

export const UpdateAdminPassword = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/updatepass/${id}`, data)
    }
    catch (err) {
        console.log("Error occured while calling UpdateAdminPassword api", err);
    }
}





export const getCoursesByID = async (id) => {
    try {
        return await axios.get(`${ServerURL}/coursedetail/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getCoursesByID api", err);
    }
}

export const getCoursesByIDList = async (data) => {
    try {
        return await axios.post(`${ServerURL}/courses-detail`, data)
    }
    catch (err) {
        console.log("Error occured while calling getCoursesByIDList api", err);
    }
}

export const getCourses = async () => {
    try {
        return await axios.get(`${ServerURL}/allcourses`)
    }
    catch (err) {
        console.log("Error occured while calling getCourses api", err);
    }
}

export const getITCourses = async () => {
    try {
        return await axios.get(`${ServerURL}/it-courses`)
    }
    catch (err) {
        console.log("Error occured while calling getITCourses api", err);
    }
}

export const getMultimediaCourses = async () => {
    try {
        return await axios.get(`${ServerURL}/multimedia-courses`)
    }
    catch (err) {
        console.log("Error occured while calling getMultimediaCourses api", err);
    }
}


export const getCourseCount = async () => {
    try {
        return await axios.get(`${ServerURL}/coursecount`)
    }
    catch (err) {
        console.log("Error occured while calling getCourseCount api", err);
    }
}

export const getActiveCourses = async () => {
    try {
        return await axios.get(`${ServerURL}/active-courses`)
    }
    catch (err) {
        console.log("Error occured while calling getActiveCourses api", err);
    }
}

export const getInactiveCourses = async () => {
    try {
        return await axios.get(`${ServerURL}/inactive-courses`)
    }
    catch (err) {
        console.log("Error occured while calling getInactiveCourses api", err);
    }
}

export const changeStatusofCourse = async (id) => {
    try {
        return await axios.get(`${ServerURL}/editcoursestatus/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling changeStatusofCourse api", err);
    }
}

export const getCoursesByInstructorId = async (id) => {
    try {
        return await axios.get(`${ServerURL}/courses-instructor/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getCoursesByInstructorId api", err);
    }
}





export const registerInstructor = async (data) => {
    try {
        return await axios.post(`${ServerURL}/addinstructor` ,data)
    }
    catch (err) {
        console.log("Error occured while calling registerInstructor api", err);
    }
}

export const loginInstructor = async (data) => {
    try {
        return await axios.post(`${ServerURL}/login-instructor` ,data, { withCredentials: true})

    }
    catch (err) {
        console.log("Error occured while calling loginInstructor api", err);
    }
}

export const getInstructors = async () => {
    try {
        return await axios.get(`${ServerURL}/allinstructors`)
    }
    catch (err) {
        console.log("Error occured while calling getInstructors api", err);
    }
}


export const getInstructorByID = async (id) => {
    try {
        return await axios.get(`${ServerURL}/instructor/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getInstructorByID api", err);
    }
}

export const editInstructor = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/editinstructor/${id}` ,data)

    }
    catch (err) {
        console.log("Error occured while calling editInstructor api", err);
    }
}

export const editInstructorProfile = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/editinstructor/profile/${id}` ,data)

    }
    catch (err) {
        console.log("Error occured while calling editInstructorProfile api", err);
    }
}

export const UpdateInstructorPassword = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/update-instructor-pass/${id}`, data)
    }
    catch (err) {
        console.log("Error occured while calling UpdateInstructorPassword api", err);
    }
}

export const getInstructorCount = async () => {
    try {
        return await axios.get(`${ServerURL}/instructorcount`)
    }
    catch (err) {
        console.log("Error occured while calling getInstructorCount api", err);
    }
}

export const registercourse = async (data) => {
    try {
        return await axios.post(`${ServerURL}/addcourse` ,data)
    }
    catch (err) {
        console.log("Error occured while calling registercourse api", err);
    }
}

export const editInstructorforCourse = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/editinstructorcourse/${id}` ,data)

    }
    catch (err) {
        console.log("Error occured while calling editInstructorforCourse api", err);
    }
}

export const editcoursedetails = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/editcourse/${id}` ,data)

    }
    catch (err) {
        console.log("Error occured while calling editcoursedetails api", err);
    }
}

export const editCourseModulesStatus = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/editcoursemodulesstatus/${id}`, data)
    }
    catch (err) {
        console.log("Error occured while calling editCourseModulesStatus api", err);
    }
}

export const editCourseInstructor = async (data, id) => {
    try {
        return await axios.post(`${ServerURL}/editcourseinstructor/${id}`, data)
    }
    catch (err) {
        console.log("Error occured while calling editCourseInstructor api", err);
    }
}

export const editInstructorStatus = async (id) => {
    try {
        return await axios.get(`${ServerURL}/update-instructor-status/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling editInstructorStatus api", err);
    }
}






export const getUsers = async () => {
    try {
        return await axios.get(`${ServerURL}/allusers`)
    }
    catch (err) {
        console.log("Error occured while calling getUsers api", err);
    }
}

export const getStudents = async () => {
    try {
        return await axios.get(`${ServerURL}/all-student`)
    }
    catch (err) {
        console.log("Error occured while calling getStudents api", err);
    }
}




export const addenrollment = async (data) => {
    try {
        return await axios.post(`${ServerURL}/add-enrollment`, data)
    }
    catch (err) {
        console.log("Error occured while calling addenrollment api", err);
    }
}

export const getEnrollments = async () => {
    try {
        return await axios.get(`${ServerURL}/all-enrollments`)
    }
    catch (err) {
        console.log("Error occured while calling getEnrollments api", err);
    }
}

export const getEnrollmentsByCourseId = async (id) => {
    try {
        return await axios.get(`${ServerURL}/all-enrollments/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getEnrollmentsByCourseId api", err);
    }
}

export const getEnrollmentsByMultiCourseId = async (data) => {
    try {
        return await axios.post(`${ServerURL}/all-enrollments-courses`, data)
    }
    catch (err) {
        console.log("Error occured while calling getEnrollmentsByMultiCourseId api", err);
    }
}

export const getActiveEnrollments = async () => {
    try {
        return await axios.get(`${ServerURL}/active-enrollments`)
    }
    catch (err) {
        console.log("Error occured while calling getActiveEnrollments api", err);
    }
}

export const getRecentEnrollments = async () => {
    try {
        return await axios.get(`${ServerURL}/recent-enrollments`)
    }
    catch (err) {
        console.log("Error occured while calling getRecentEnrollments api", err);
    }
}

export const getTotalRevenue = async () => {
    try {
        return await axios.get(`${ServerURL}/total-revenue`)
    }
    catch (err) {
        console.log("Error occured while calling getTotalRevenue api", err);
    }
}

export const getRevenueCourseWise = async (id) => {
    try {
        return await axios.get(`${ServerURL}/revenue/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getRevenueCourseWise api", err);
    }
}

export const editEnrollmentPassedOut = async (id) => {
    try {
        return await axios.get(`${ServerURL}/enrollment-update/passedout/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling editEnrollmentPassedOut api", err);
    }
}

export const editEnrollmentTermiate = async (id) => {
    try {
        return await axios.get(`${ServerURL}/enrollment-update/terminated/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling editEnrollmentTermiate api", err);
    }
}

export const editEnrollmentActive = async (id) => {
    try {
        return await axios.get(`${ServerURL}/enrollment-update/active/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling editEnrollmentActive api", err);
    }
}






export const addNewAttendance = async (data) => {
    try {
        return await axios.post(`${ServerURL}/add-attendance`, data)
    }
    catch (err) {
        console.log("Error occured while calling addNewAttendance api", err);
    }
}

export const getAttendanceByDateByCourse = async (id, data) => {
    try {
        return await axios.post(`${ServerURL}/attendance-bydate/${id}`, data)
    }
    catch (err) {
        console.log("Error occured while calling addNewAttendance api", err);
    }
}

export const getAttendanceByStudent = async (id, data) => {
    try {
        return await axios.post(`${ServerURL}/attendance-bystudent/${id}`, data)
    }
    catch (err) {
        console.log("Error occured while calling getAttendanceByStudent api", err);
    }
}

export const editAttendance = async (data) => {
    try {
        return await axios.post(`${ServerURL}/edit-attendance`, data)
    }
    catch (err) {
        console.log("Error occured while calling editAttendance api", err);
    }
}

export const getAttendanceListByOnlyDate = async (data) => {
    try {
        return await axios.post(`${ServerURL}/date-attendance`, data)
    }
    catch (err) {
        console.log("Error occured while calling getAttendanceListByOnlyDate api", err);
    }
}





export const addFile = async (data) => {
    try {
        return await axios.post(`${ServerURL}/add-file`, data)
    }
    catch (err) {
        console.log("Error occured while calling addFile api", err);
    }
}

export const getFilesByCourse = async (id, data) => {
    try {
        return await axios.get(`${ServerURL}/get-files/${id}`, data)
    }
    catch (err) {
        console.log("Error occured while calling getFilesByCourse api", err);
    }
}

export const getFilesByMultiCourse = async (data) => {
    try {
        return await axios.post(`${ServerURL}/get-files-courses`, data)
    }
    catch (err) {
        console.log("Error occured while calling getFilesByMultiCourse api", err);
    }
}

export const deleteFile = async (id) => {
    try {
        return await axios.get(`${ServerURL}/delete-file/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling deleteFile api", err);
    }
}

export const getAllFiles = async () => {
    try {
        return await axios.get(`${ServerURL}/get-all-files`)
    }
    catch (err) {
        console.log("Error occured while calling getAllFiles api", err);
    }
}





export const addMessage = async (data) => {
    try {
        return await axios.post(`${ServerURL}/create-message`, data)
    }
    catch (err) {
        console.log("Error occured while calling addMessage api", err);
    }
}

export const getAllMessages = async () => {
    try {
        return await axios.get(`${ServerURL}/messages`)
    }
    catch (err) {
        console.log("Error occured while calling getAllMessages api", err);
    }
}

export const getMessagesById = async (id) => {
    try {
        return await axios.get(`${ServerURL}/message/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling getMessagesById api", err);
    }
}

export const deleteMessage = async (id) => {
    try {
        return await axios.get(`${ServerURL}/delete-message/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling deleteMessage api", err);
    }
}

export const checkMessage = async (data) => {
    try {
        return await axios.post(`${ServerURL}/check-message/`, data)
    }
    catch (err) {
        console.log("Error occured while calling checkMessage api", err);
    }
}




export const pwdforgot = async (id) => {
    try {
        return await axios.get(`${ServerURL}/forget-password/${id}`)
    }
    catch (err) {
        console.log("Error occured while calling pwdforgot api", err);
    }
}