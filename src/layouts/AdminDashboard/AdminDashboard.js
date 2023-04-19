import { React, useState, useEffect } from 'react';
import Sidebar from '../../components/AdminDashboard/Sidebar'
import Topbar from '../../components/AdminDashboard/Topbar'
import { Outlet, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import Loading from '../LoadingScreen/Loading';
// import '../../assets/css/Style1.css'

function AdminDashboard() {

    const navigate = useNavigate();
    const [admindets, setAdmindets] = useState()


    useEffect(() => {

        const token = sessionStorage.getItem('AdminToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('token')
                navigate('/')
            } else {
                const adminDetails = sessionStorage.getItem('Admin');
                setAdmindets(JSON.parse(adminDetails))
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

export default AdminDashboard
