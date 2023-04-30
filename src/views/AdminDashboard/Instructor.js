import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getInstructors, editInstructorStatus } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const Instructor = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [instructor, setInstructor] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        getInstructorList();
    }, []);

    const getInstructorList = async () => {
        setLoading(true)
        let allinstructor = await getInstructors();
        setInstructor(allinstructor.data);
        setLoading(false)
    }

    const deleteInstructor = async (id) => {
        if (window.confirm("Are you sure you want to delete this instructor")) {
            try {
                const deleteinstructor = await editInstructorStatus(id)
                if (deleteinstructor.data.status == 200) {
                    toast("✅ Instructor deleted successfully");
                    window.setTimeout(PageReload, 3000)
                }
                else {
                    toast.error("Sorry Instructor not deleted");
                }
            }
            catch (err) {
                toast.error("Error : " + err);
            }
        }
    }

    const PageReload = () => {
        navigate(0)
    }

    return (
        <div className="px-3">
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className='row' >
                            <div className='col-xl-4 col-3'>
                                <h1 className="h4 mb-4">Instructor Management</h1>
                            </div>
                            <div className='col-5'>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search instructor"
                                        style={{ borderRadius: '0' }}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <div class="input-group-append">
                                        <button class="btn btn-dark" type="button" style={{ borderRadius: '0' }}>
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className='col-xl-3 col-4 text-right pr-5'>
                                <Link to="/dashboard/admin/instructor/add" className="btn btn-dark" style={{ borderRadius: '0' }}>Add New Instructor +</Link>
                            </div>
                        </div>

                        <div className="card" style={{ borderRadius: '0' }}>

                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '30%' }} className='pl-4'>Name</th>
                                        <th scope="col" className="text-center">Email</th>
                                        <th scope="col" className="text-center">Courses</th>
                                        <th scope="col" className="text-center">Actions</th>
                                        {/* <th scope="col" className="text-center"> </th> */}
                                    </tr>
                                </thead>
                                <tbody className="p-2">
                                    {
                                        loading ?
                                            <>
                                                <tr>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                    <td className="loading">
                                                        <div className="bar"></div>
                                                    </td>
                                                </tr>
                                            </>
                                            :
                                            instructor.length ?
                                                instructor.filter(value => {
                                                    if (search === '') {
                                                        return value
                                                    }
                                                    else if (value.Name.toLowerCase().includes(search.toLowerCase())) {
                                                        return value
                                                    }
                                                })
                                                    .map((item) => (
                                                        <>
                                                            <tr key={item._id}>
                                                                <td className='align-middle '>
                                                                    <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/admin/instructor/" + (item._id)} style={{ textDecoration: "none" }}>
                                                                        <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item.ProfilePhoto} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                        <div className="pl-3 m-0">
                                                                            <span className='text-dark' style={{ fontSize: '14px' }}>{item.Name}</span>
                                                                            {/* <p className="text-body my-auto" style={{ fontSize: '13px' }}><i className="bi bi-bookmark-fill text-dark" /> {item.Category}</p> */}
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <span className="ml-3" style={{ fontSize: '14px' }}>{item.Email}</span>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <span className="ml-2" style={{ fontSize: '14px' }}>{item.Courses.length}</span>
                                                                </td>
                                                                <td className='align-middle'>
                                                                    <div className="dropdown col-5 ml-2 mt-1 mx-auto" style={{ border: '0' }}>
                                                                        <span className="bi bi-three-dots-vertical" href="#" id="Dropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
                                                                        <div className="dropdown-menu  shadow " aria-labelledby="Dropdown1" style={{ border: '0' }}>
                                                                            <Link className="dropdown-item" to={"/dashboard/admin/editinstructor/" + (item._id)}>
                                                                                <i className="bi bi-pencil-square mr-2 " />
                                                                                Edit
                                                                            </Link>
                                                                            <div className="dropdown-divider" />
                                                                            <button onClick={(e) => deleteInstructor(item._id)} className="dropdown-item">
                                                                                <i className="bi bi-trash mr-2 " />
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    {/* <button type="button" className="btn btn-danger" style={{ marginRight: 5 }} */}
                                                                    {/* //  onClick={() => deleteCourseDetails(item._id)} */}
                                                                    {/* ><i class="fa fa-trash-alt"></i> Delete</button> */}
                                                                    {/* <Link to={`/dashboard/admin/managecourse/` + (item._id)} className="btn btn-warning"><i class="fa fa-cog"></i> Manage</Link> */}
                                                                </td>
                                                            </tr>

                                                        </>
                                                    ))
                                                :
                                                <tr>
                                                    <td className="text-center text-dark" colspan="5">No Record Found</td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
            }
            <ToastContainer
                position="top-center"
                autoClose={3000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Instructor
