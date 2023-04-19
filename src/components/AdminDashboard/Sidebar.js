import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { NavHashLink } from 'react-router-hash-link'

function Sidebar( props ) {

    const { toggled, setToggled, toggleSwitch } = props

    const navigate = useNavigate();
    const [userid, setUserId] = useState("")

    useEffect(() => {

        const token = sessionStorage.getItem('UserToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('UserToken')
            }
            else {
                const userDetails = sessionStorage.getItem('User');
                const userDets = JSON.parse(userDetails)
                setUserId((userDets._id))
            }
        }

    }, [])


    return (
        <>
            <ul className={toggled ? 'navbar-nav sidebar sidebar-dark bg-dark accordion toggled' : 'navbar-nav sidebar sidebar-dark bg-dark accordion'} id="accordionSidebar" style={{ zIndex: '101'}}>
                {/* "navbar-nav sidebar sidebar-dark bg-primary accordion" */}
                {/* style={{position:'fixed', left:'0'}} */}
                {/* #42A2C3 */}
                {/* style={{ backgroundColor: '#120f2d' }} */}

                <div
                    style={{ position: 'sticky', left: '0', top: '0' }}
                >
                    <Link className="sidebar-brand d-flex align-items-center justify-content-center my-2" to="/dashboard/admin">
                        <div className="sidebar-brand-icon">
                            {
                                toggled ?
                                    <img
                                        src="/img/dws_white_logo_half.png"
                                        className="img-fluid"
                                        alt=""
                                        style={{ height: '60px' }}
                                    />
                                    :
                                    <>
                                    <img
                                        src="/img/dws_white_half_logo.png"
                                        className="img-fluid d-none d-md-flex"
                                        alt=""
                                        style={{ height: '80px' }}
                                    />
                                    <img
                                        src="/img/dws_white_logo_half.png"
                                        className="d-flex d-md-none"
                                        alt=""
                                        style={{ height: '60px' }}
                                    />
                                    </>
                                    
                            }
 
                        </div>

                    </Link>

                    <hr className="sidebar-divider my-1" />

                    <li className="nav-item active">
                        <NavHashLink className="nav-link" to="/dashboard/admin ">
                            <i className="bi bi-house-door-fill" />
                            <span>Home</span></NavHashLink>
                    </li>

                    <hr className="sidebar-divider my-1" />


                    <li className="nav-item ">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#ordermanagement" aria-expanded="true" aria-controls="ordermanagement">
                            <i
                            //  className="fas fa-fw fa-book"
                             className="bi bi-folder-fill"
                              />
                            <span >Courses</span>
                        </a>
                        <div id="ordermanagement" className="collapse" aria-labelledby="ordermanagement" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner">
                                {/* <h6 className="collapse-header">Select</h6> */}
                                <NavHashLink className="collapse-item" data-toggle="collapse" data-target="#ordermanagement" to="/dashboard/admin/courses/all">All Courses</NavHashLink>
                                <hr style={{ margin: 1 }} />
                                <NavHashLink className="collapse-item" data-toggle="collapse" data-target="#ordermanagement" to="/dashboard/admin/courses/active">Active Courses</NavHashLink>
                                <NavHashLink className="collapse-item" data-toggle="collapse" data-target="#ordermanagement" to="/dashboard/admin/courses/inactive">Inactive Courses</NavHashLink>
                                {/* <Link className="collapse-item" to="/dashboard/totalorders">Total Orders</Link> */}
                            </div>
                        </div>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                            <i
                            //  className="fas fa-fw fa-folder"
                             className="bi bi-nut-fill"
                              />
                            <span >Tools</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner">
                                <NavHashLink className="collapse-item" data-toggle="collapse" data-target="#collapsePages" to="/dashboard/admin/attendance">Attendance</NavHashLink>
                                <NavHashLink className="collapse-item" data-toggle="collapse" data-target="#collapsePages" to="/dashboard/admin/resources">Resources</NavHashLink>
                            </div>
                        </div>
                    </li>


                    <hr className="sidebar-divider my-1" />

                    {/* <li className="nav-item">
            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
              <i className="fas fa-fw fa-bell" />
              <span style={{ fontSize: 16 }}>Notifications</span>
            </a>
            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <NavHashLink className="collapse-item" to="/dashboard/tablemanagement">Table Management</NavHashLink>
                <NavHashLink className="collapse-item" to="/dashboard/configuretable">Configure Table</NavHashLink>
              </div>
            </div>
          </li> */}

                    <li className="nav-item">
                        <NavHashLink className="nav-link" to="/dashboard/admin/enrollments">
                            <i className="bi bi-clipboard2-check" />
                            <span>Enrollments</span></NavHashLink>
                    </li>

                    <li className="nav-item">
                        <NavHashLink className="nav-link" to="/dashboard/admin/instructor">
                            <i
                            //  className="fas fa-fw fa-user"
                             className="bi bi-person-workspace"
                              />
                            <span>Instructor</span></NavHashLink>
                    </li>

                    <li className="nav-item">
                        <NavHashLink className="nav-link" to="/dashboard/admin/students" >
                            <i
                            //  className="fas fa-fw fa-users"
                             className="bi bi-person-fill-check"
                              />
                            <span>Student</span></NavHashLink>
                    </li>

                    <li className="nav-item">
                        <NavHashLink className="nav-link" to="/dashboard/admin/users">
                            <i 
                            // className="fas fa-fw fa-user-circle"
                            className="bi bi-people-fill"
                             />
                            <span>Users</span></NavHashLink>
                    </li>

                    <li className="nav-item">
                        <NavHashLink className="nav-link" to="/dashboard/admin/messages">
                            <i 
                            // className="fas fa-fw fa-user-circle"
                            className="bi bi-envelope-at-fill"
                             />
                            <span>Messages</span></NavHashLink>
                    </li>

                    <hr className="sidebar-divider d-none d-md-block my-1" />


                    <div className="text-center mx-auto mt-2">
                        <button onClick={toggleSwitch} className="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>

                </div>


            </ul>
        </>
    )
}

export default Sidebar
