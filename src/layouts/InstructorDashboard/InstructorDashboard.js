import { React, useState, useEffect } from 'react';
import Sidebar from '../../components/InstructorDashboard/Sidebar';
import Topbar from '../../components/InstructorDashboard/Topbar';
import { useNavigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const InstructorDashboard = () => {

    const navigate = useNavigate();

    const [instructor, setInstructor] = useState({});

    useEffect(() => {

        const token = sessionStorage.getItem('InstructorToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('InstructorToken')
                navigate('/')
            } else {
                const instructorDetails = sessionStorage.getItem('Instructor');
                setInstructor(JSON.parse(instructorDetails))
                console.log('Token matched!!!')
            }
        }
        else {
            window.location = "/"
        }
    }, [])

    const [toggled, setToggled] = useState(false)

    const toggleSwitch = () => {
        if (toggled === false) {
            setToggled(true)
        }
        else if (toggled === true) {
            setToggled(false)
        }
    }

    return (
        <>
            <div id="wrapper">
                <Sidebar toggleSwitch={toggleSwitch} toggled={toggled} setToggled={setToggled} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content" style={{ position: 'sticky', 'z-index': '99' }}>
                        <Topbar toggleSwitch={toggleSwitch} toggled={toggled} setToggled={setToggled} />
                        <Outlet />
                        <a href="#" class="btn btn-lg btn-primary rounded-0 btn-lg-square back-to-top"><i class="fa fa-angle-double-up"></i></a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default InstructorDashboard
