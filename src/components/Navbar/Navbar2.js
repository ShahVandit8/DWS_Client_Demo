import { React, useState, useEffect } from 'react'
import { Link, useAsyncError, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { getActiveCourses, getITCourses, getMultimediaCourses } from '../../services/api'
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

function Navbar2({ login, setlogin }) {

    useEffect(() => {
        const token = sessionStorage.getItem('UserToken')
        if (token) {
            const user = jwtDecode(token)
            if (!user) {
                sessionStorage.removeItem('UserToken')
            }
            else {
                const userDetails = sessionStorage.getItem('User');
                const userdets = JSON.parse(userDetails)
                setUser(userdets)
                setImage(userdets.ProfilePicture)
                setUsername(userdets.Name)
                setUserEmail(userdets.Email)
            }
        }

        getitcourses();
        getallcourses();
        getmulticourses();
    }, [])

    const [navbar, setNavbar] = useState(true);
    const [navtoggle, setNavToggle] = useState('bi-list');
    const [user, setUser] = useState();
    const [image, setImage] = useState('')
    const [username, setUsername] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [itcourses, setITCourses] = useState([])
    const [multicourses, setMultiCourses] = useState([])
    const [allcourses, setAllcourses] = useState([])

    const [ulprofile, setUlprofile] = useState(false)
    const [loading, setLoading] = useState(false)


    // const [login, setlogin] = useState(false);

    const navigation = useNavigate()

    const ToggleChange = () => {
        if (navtoggle === 'bi-list') {
            setNavbar(false);
            setNavToggle('bi-x')
        }
        else if (navtoggle === 'bi-x') {
            setNavbar(true);
            setNavToggle('bi-list')
        }
    }

    const gotologin = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/authentication/sign-in')
    }

    const gotoProfile = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/user/edit-profile')
    }

    const gotoAccountSetting = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/user/edit-account')
    }

    const gotosignup = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/authentication/sign-up')
    }

    const gotomycourses = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/my-courses')
    }

    const gotoitcourses = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/it-courses')
    }

    const gotomulticourses = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/multimedia-courses')
    }

    const gotohome = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/')
    }
    const gotoabout = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/about-us')
    }
    const gotocontact = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/contact-us')
    }
    const gotofeature = () => {
        if (navbar === false) {
            setNavbar(true);
            setNavToggle('bi-list')
        }
        navigation('/features')
    }


    const ToggleULProfile = () => {
        if (ulprofile === true) {
            setUlprofile(false)
        }
        else if (ulprofile === false) {
            setUlprofile(true)
        }
    }

    const logoutUser = () => {
        if (window.confirm('Are you sure you want to Logout ?')) {
            sessionStorage.removeItem('UserToken');
            sessionStorage.removeItem('User');
            setlogin(false)
            if (navbar === false) {
                setNavbar(true);
                setNavToggle('bi-list');
            }
            navigation('/')
        } else {
            alert('User in not logout from the system')
        }
    }

    const getitcourses = async () => {
        const courselist = await getITCourses()
        setITCourses(courselist.data)
    }
    const getmulticourses = async () => {
        const courselist = await getMultimediaCourses()
        setMultiCourses(courselist.data)
    }

    const getallcourses = async () => {
        setLoading(true)
        const courselist = await getActiveCourses()
        setAllcourses(courselist.data)
        if (courselist.data) {
            const list = []
            courselist.data.map(item => (
                list.push({
                    id: item._id,
                    Link: '/course/' + item._id,
                    name: item.Name
                })
            ))
            setSearchList(list)
            setLoading(false)
        }
    }

    // const SearchList = [
    //     {
    //         id: 0,
    //         Link: '/dashboard/instructor/courses',
    //         name: 'My Courses'
    //     },
    //     {
    //         id: 1,
    //         Link: '/dashboard/instructor/students',
    //         name: 'Students'
    //     },
    //     {
    //         id: 2,
    //         Link: '/dashboard/instructor/enrollments',
    //         name: 'Student Enrollments'
    //     },
    //     {
    //         id: 3,
    //         Link: '/dashboard/instructor/resources',
    //         name: 'Files and Resources'
    //     },
    //     {
    //         id: 4,
    //         Link: '/dashboard/instructor/attendance',
    //         name: 'Attendance'
    //     }
    // ]

    const [SearchList, setSearchList] = useState([])

    const handleOnSelect = (item) => {
        navigation(item.Link)
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item) => {
        return (
            <>
                <a style={{ display: 'block', textAlign: 'left', cursor: 'pointer'  }}>
                    {item.name}
                </a>
            </>
        )
    }


    return (
        <div>
            <header id="header1" className="header1 fixed-top">
                <div className="container-fluid d-flex align-items-center justify-content-between">
                    {/* <span className='badge badge-pill badge-primary'>3</span> */}
                    <Link to="/" className="logo d-flex align-items-center">
                        {/* <img src="/img/dws_logo.png" alt="" /> */}
                        <img className="d-none d-md-flex" src="/img/dws_logo2.png" alt="" />
                        <img src="/img/dws_logo1.png" alt="" />
                    </Link>

                    <div className="col-lg-5 col-6 d-md-block d-none">
                        <div className="row">
                            <div className="col-10">
                                {
                                    loading ?
                                        <></>
                                        :
                                        <ReactSearchAutocomplete
                                            items={SearchList}
                                            onSelect={handleOnSelect}
                                            onFocus={handleOnFocus}
                                            formatResult={formatResult}
                                            placeholder={"Search for anything"}
                                            styling={
                                                {
                                                    boxShadow: "none !important",
                                                    hoverboxShadow: "none !important",
                                                    hoverBackgroundColor: "#fff",
                                                }
                                            }
                                            className="shadow"
                                        />

                                }

                                {/* <div className="searchicon">
                                    <i className="bi bi-search"></i>
                                </div>
                                <input className="searchbar" placeholder="Search for anything"></input> */}
                            </div>
                            <div className='col-2 my-auto'>
                                <nav id="navbar" className="navbar1">
                                    <ul>
                                        <li className="dropdown d-none d-lg-flex mr-3">
                                            <div className='d-none d-md-flex category-navbar'><span >Categories</span> <i className="bi bi-chevron-down" /></div>
                                            <ul>
                                                <li className="dropdown">
                                                    <Link to="/it-courses">
                                                        <span>Information Technology</span>{" "}
                                                        <i className="bi bi-chevron-right" />
                                                    </Link>
                                                    <ul>
                                                        {
                                                            itcourses.map(item => (
                                                                <li>
                                                                    <a href={"/course/" + item._id}>
                                                                        {item.Name}
                                                                    </a>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </li>

                                                <li className="dropdown">
                                                    <Link to="/multimedia-courses">
                                                        <span>Multimedia</span>{" "}
                                                        <i className="bi bi-chevron-right" />
                                                    </Link>
                                                    <ul>
                                                        {
                                                            multicourses.map(item => (
                                                                <li>
                                                                    <a href={"/course/" + item._id}>
                                                                        {item.Name}
                                                                    </a>
                                                                </li>
                                                            ))
                                                        }
                                                        {/* <li>
                                                            <a href="#">Deep Drop Down 1</a>
                                                        </li> */}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>


                    {
                        login ?
                            // if Login is True then this will work
                            navbar ?
                                // if Navbar is true then this will work (User is Loged in and view is from Desktop) 
                                <nav id="navbar" className="navbar1">
                                    <ul>
                                        <li className='d-none d-md-flex'>
                                            <Link className='d-flex notification-navbar' to='/my-courses'><span className='my-learnings'>My Courses</span></Link>
                                        </li>
                                        <li className='dropdown-left d-flex'>
                                            <i className='bi bi-bell d-flex notification-navbar'></i>
                                            <ul>
                                                <li>
                                                    <a>No new notifications</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className='profile-mobile dropdown-left'>
                                            <img src={process.env.REACT_APP_SERVER_FILE + image} className="img-profile img-profile-mobile border" alt="" />
                                            <ul style={{ width: '270px' }}>
                                                <li onClick={gotoProfile}>
                                                    <div style={{ cursor: 'pointer' }} className="row p-2">
                                                        <div className='col-3'>
                                                            <img src={process.env.REACT_APP_SERVER_FILE + image} className="img-profile-hover border" alt="" />
                                                        </div>
                                                        <div className="col-7">
                                                            <div className="d-inline-block">
                                                                <p style={{ fontSize: '15px', fontWeight: 'bolder', padding: 0, marginBottom: '-5px', marginTop: '3px' }}>{username}</p>
                                                                <span style={{ fontSize: '13px', }}>{useremail}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <hr style={{ marginTop: '5px', marginBottom: '6px', border: '1px' }} />
                                                <li style={{ cursor: 'pointer' }} onClick={gotomycourses} className='categories-list p-1 ml-2'>
                                                    <span style={{ fontSize: '14px' }}>
                                                        My Courses
                                                    </span>
                                                </li>
                                                {/* <hr style={{ marginTop: '5px', marginBottom: '6px', border: '1px' }} /> */}
                                                <li style={{ cursor: 'pointer' }} onClick={gotoProfile} className='categories-list p-1 ml-2'>
                                                    <span style={{ fontSize: '14px' }}>
                                                        Edit Profile
                                                    </span>
                                                </li>
                                                <li style={{ cursor: 'pointer' }} onClick={gotoAccountSetting} className='categories-list p-1 ml-2'>
                                                    <span style={{ fontSize: '14px' }}>
                                                        Account Settings
                                                    </span>
                                                </li>
                                                <hr style={{ marginTop: '5px', marginBottom: '6px', border: '1px' }} />
                                                <li onClick={logoutUser} className='categories-list row' style={{ marginLeft: '1px', cursor: 'pointer' }}>
                                                    <div className="col-9">
                                                        <span style={{ fontSize: '14px' }}>
                                                            Log Out
                                                        </span>
                                                    </div>
                                                    <div className="col-1">
                                                        <span className='bi bi-box-arrow-right text-left'></span>
                                                    </div>

                                                </li>
                                            </ul>
                                            {/* <img src="/img/profile.jpg" className="img-profile img-profile-mobile" alt="" /> */}
                                        </li>
                                    </ul>
                                    {/* <i className="bi bi-list mobile-nav-toggle" /> */}
                                    <i className={'bi mobile-nav-toggle ' + navtoggle} onClick={ToggleChange} />
                                </nav>

                                :
                                // if Navbar is false then this will work (User is Logged in and view is Mobile View) 
                                <nav id="navbar" className="navbar-mobile">
                                    {
                                        ulprofile ?
                                            // if ulProfile is true then this will work (User Menu is Opened)
                                            <ul>
                                                <li>
                                                    <div style={{ cursor: 'pointer', backgroundColor: '#f2f2f2' }} className="row p-3">
                                                        <div className='col-1'>
                                                            <span className="bi bi-caret-left-fill"></span>
                                                        </div>
                                                        <div onClick={ToggleULProfile} className="col-10">
                                                            <span style={{ fontSize: '18px', color: '#000', marginLeft: '5px' }}>
                                                                Menu
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='d-flex d-lg-none'>
                                                    <span className='categories-list-title'>
                                                        Account
                                                    </span>
                                                </li>
                                                <li onClick={gotoProfile} className='categories-list d-flex d-lg-none'>
                                                    <span>
                                                        Edit Profile
                                                    </span>
                                                </li>
                                                <li onClick={gotoAccountSetting} className='categories-list d-flex d-lg-none'>
                                                    <span >
                                                        Account Settings
                                                    </span>
                                                </li>
                                                <hr style={{ border: '0px' }} />
                                                <li className='categories-list row '>
                                                    <div onClick={logoutUser} className='col-10'>
                                                        <span>
                                                            Log out
                                                        </span>
                                                    </div>
                                                    <div className="col-1">
                                                        <span className="bi bi-box-arrow-right"></span>
                                                    </div>
                                                </li>

                                            </ul>
                                            :
                                            // if ulProfile is false then this will work (Mobile Navbar is Opened)
                                            <ul>
                                                <li className='row profile-mobile dropdown-left'>
                                                    <div className='col-3'>
                                                        <img src={process.env.REACT_APP_SERVER_FILE + image} className="img-profile img-profile-mobile border" alt="" />
                                                    </div>
                                                    {/* <img src="/img/profile.jpg" className="img-profile img-profile-mobile" alt="" /> */}
                                                    <div className="col-7 d-flex d-md-none align-items-center">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <span style={{ fontSize: '16px', fontWeight: 'bolder' }}>Hi, {username}</span>
                                                            </div>
                                                            <div className='col-12'>
                                                                <span style={{ fontSize: '14px', color: '' }}>Welcome Back</span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div onClick={ToggleULProfile} className="col-1  d-flex d-md-none align-items-center">
                                                        <span className='bi bi-caret-right-fill'></span>
                                                    </div>
                                                </li>

                                                <li className='d-flex d-lg-none mt-2'>
                                                    <span className='categories-list-title'>
                                                        Learn
                                                    </span>
                                                </li>
                                                <li onClick={gotomycourses} className='categories-list d-flex d-lg-none'>
                                                    <span>
                                                        • My Courses
                                                    </span>
                                                </li>

                                                <hr />
                                                <li className='d-flex d-lg-none'>
                                                    <span className='categories-list-title'>
                                                        Categories
                                                    </span>
                                                </li>
                                                <li onClick={gotoitcourses} className='categories-list d-flex d-lg-none'>
                                                    <span>
                                                        • Information Technology
                                                    </span>
                                                </li>
                                                <li onClick={gotomulticourses} className='categories-list d-flex d-lg-none'>
                                                    <span >
                                                        • Multimedia
                                                    </span>
                                                </li>
                                                <hr />
                                                <li className='d-flex d-lg-none'>
                                                    <span className='categories-list-title'>
                                                        More from DWS
                                                    </span>
                                                </li>
                                                <li onClick={gotohome} className='categories-list d-flex d-lg-none'>
                                                    <span>
                                                        • Home
                                                    </span>
                                                </li>
                                                <li onClick={gotoabout} className='categories-list d-flex d-lg-none'>
                                                    <span>
                                                        • About
                                                    </span>
                                                </li>
                                                <li onClick={gotocontact} className='categories-list d-flex d-lg-none'>
                                                    <span>
                                                        • Contact
                                                    </span>
                                                </li>
                                                <li onClick={gotofeature} className='categories-list d-flex d-lg-none'>
                                                    <span>
                                                        • Features
                                                    </span>
                                                </li>

                                            </ul>
                                    }

                                    {/* <i className="bi bi-list mobile-nav-toggle" /> */}
                                    <i className={'bi mobile-nav-toggle ' + navtoggle} onClick={ToggleChange} />
                                </nav>

                            :
                            // if login is false then this will work 
                            navbar ?
                                // if Navbar is True then this will work (User is not logged in and View is Desktop View) 
                                <nav id="navbar" className="navbar1">
                                    <ul>
                                        <li>
                                            <button onClick={gotologin} className="signin" style={{ borderRadius: 0 }}>
                                                Log In
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={gotosignup} className="getstarted" style={{ borderRadius: 0 }}>
                                                Sign Up
                                            </button>
                                        </li>
                                        <hr />
                                    </ul>
                                    <i className={'bi mobile-nav-toggle ' + navtoggle} onClick={ToggleChange} />
                                </nav>

                                :
                                // if Navbar is false then this will work (User is not logged in and View is Mobile View) 
                                <nav id="navbar" className="navbar-mobile">
                                    <ul>
                                        <li className="mt-2">
                                            <button onClick={gotologin} className="signin" style={{ borderRadius: 0 }}>
                                                Log In
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={gotosignup} className="getstarted" style={{ borderRadius: 0 }}>
                                                Sign Up
                                            </button>
                                        </li>
                                        <hr />
                                        <li className='d-flex d-lg-none'>
                                            <span className='categories-list-title'>
                                                Categories
                                            </span>
                                        </li>
                                        <li onClick={gotoitcourses} className='categories-list d-flex d-lg-none'>
                                            <span>
                                                • Innformation Technology
                                            </span>
                                        </li>
                                        <li onClick={gotomulticourses} className='categories-list d-flex d-lg-none'>
                                            <span >
                                                • Multimedia
                                            </span>
                                        </li>
                                        <hr />
                                        <li className='d-flex d-lg-none'>
                                            <span className='categories-list-title'>
                                                More from DWS
                                            </span>
                                        </li>
                                        <li onClick={gotohome} className='categories-list d-flex d-lg-none'>
                                            <span>
                                                • Home
                                            </span>
                                        </li>
                                        <li onClick={gotoabout} className='categories-list d-flex d-lg-none'>
                                            <span>
                                                • About
                                            </span>
                                        </li>
                                        <li onClick={gotocontact} className='categories-list d-flex d-lg-none'>
                                            <span>
                                                • Contact
                                            </span>
                                        </li>
                                        <li onClick={gotofeature} className='categories-list d-flex d-lg-none'>
                                            <span>
                                                • Features
                                            </span>
                                        </li>
                                    </ul>
                                    <i className={'bi mobile-nav-toggle ' + navtoggle} onClick={ToggleChange} />
                                </nav>
                    }

                    {/* .navbar */}
                </div>
            </header>

        </div>
    )
}


export default Navbar2
