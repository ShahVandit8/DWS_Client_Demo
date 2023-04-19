import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function Topbar(props) {

    const { toggled, setToggled, toggleSwitch } = props

    const SearchList = [
        {
            id: 0,
            Link: '/dashboard/admin/courses/all',
            name: 'Total Courses'
        },
        {
            id: 1,
            Link: '/dashboard/admin/courses/active',
            name: 'Active Courses'
        },
        {
            id: 2,
            Link: '/dashboard/admin/courses/inactive',
            name: 'Inactive Courses'
        },
        {
            id: 3,
            Link: '/dashboard/admin/users',
            name: 'Registered Users'
        },
        {
            id: 4,
            Link: '/dashboard/admin/students',
            name: 'Students'
        },
        {
            id: 5,
            Link: '/dashboard/admin/instructor',
            name: 'Instructor'
        },
        {
            id: 6,
            Link: '/dashboard/admin/enrollments',
            name: 'Enrollments'
        },
        {
            id: 7,
            Link: '/dashboard/admin/attendance',
            name: 'Attendance System'
        },
        {
            id: 8,
            Link: '/dashboard/admin/resources',
            name: 'Files and Resources'
        }
        ,
        {
            id: 9,
            Link: '/dashboard/admin/messages',
            name: 'Contact Form Messages'
        }
    ]

    const handleOnSelect = (item) => {
        navigate(item.Link)
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left', cursor: 'pointer' }}>{item.name}</span>
            </>
        )
    }

    const navigate = useNavigate();
    const [userprofile, setUserProfile] = useState("")
    const [username, setusername] = useState("")
    const [userid, setUserId] = useState("")

    useEffect(() => {

        const token = sessionStorage.getItem('AdminToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('AdminToken')
            }
            else {
                const userDetails = sessionStorage.getItem('Admin');
                const userDets = JSON.parse(userDetails)
                setUserProfile(userDets.ProfileCover)
                setusername(userDets.Name)
                setUserId((userDets._id))
            }
        }

    }, [])

    const logoutUser = () => {
        if (window.confirm('Are you sure you want to Logout ?')) {
            sessionStorage.removeItem('AdminToken');
            window.location = '/'
        } else {
            alert('User in not logout from the system')
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow px-3" style={{ position: 'sticky', top: '0', zIndex: '105' }}>
                {/* <span style={{ fontSize: 20 }}> &nbsp; Admin's Dashboard</span> */}
                {/* Sidebar Toggle (Topbar) */}
                <button onClick={toggleSwitch} id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars" />
                </button>

                <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search" style={{ boxShadow: 'none' }}>
                    <div>
                        <ReactSearchAutocomplete
                            items={SearchList}
                            onSelect={handleOnSelect}
                            formatResult={formatResult}
                            placeholder={"Search for anything"}
                            styling={
                                {
                                    boxShadow: "none !important",
                                    hoverboxShadow: "none !important",
                                    borderRadius: "0",
                                    hoverBackgroundColor: "#fff",
                                }
                            }
                            className="shadow"
                        />
                        {/* <input
                            type="text"
                            className="form-control small"
                            style={{ border: '1px solid #CBD5E1' }}
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                        /> */}
                    </div>
                </form>



                {/* Topbar Navbar */}
                <ul className="navbar-nav ml-auto">
                    {/* Nav Item - Search Dropdown (Visible Only XS) */}
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        {/* Dropdown - Messages */}
                        <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>

                    <div className="my-auto">
                        <a href="/" target="_blank" className="btn btn-sm btn-outline-dark" style={{borderRadius: '0'}} type="button">View Website</a>
                    </div>

                    {/* Nav Item - Messages */}
                    <div className="topbar-divider d-none d-sm-block" />
                    {/* Nav Item - User Information */}
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-dark" style={{ fontSize: '15px', fontFamily: "Nunito" }}>{username}</span>
                            {/* <img src='/img/user.png' style={{ height: '20px', marginRight: '3px'}} /> */}
                            {/* <i className="fas fa-fw fa-user-circle" /> */}
                            <img className="img-profile rounded-circle" src={process.env.REACT_APP_SERVER_FILE + userprofile} />
                        </a>
                        {/* Dropdown - User Information */}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <Link className="dropdown-item" to={"/dashboard/admin/my-profile/" + userid}>
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                Profile
                            </Link>
                            <Link className="dropdown-item" to={"/dashboard/admin/changepassword/" + userid}>
                                <i className="fas fa-unlock fa-sm fa-fw mr-2 text-gray-400" />
                                Change Password
                            </Link>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item" onClick={logoutUser}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Topbar
