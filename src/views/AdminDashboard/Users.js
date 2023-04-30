import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../../services/api.js'
import Loading from '../../layouts/LoadingScreen/Loading.js'

const Users = () => {

    useEffect(() => {
        getAllUsers();
    }, [])

    const [loding, setLoading] = useState(false)

    const [users, setusers] = useState([])
    const [search, setSearch] = useState("");

    const getAllUsers = async () => {
        setLoading(true)
        const userlist = await getUsers();
        setusers(userlist.data)
        setLoading(false)
    }
    return (
        <div className="px-3">
            {
                loding ?
                    <Loading />
                    :
                    <>
                        <div className='row' >
                            <div className='col-xl-4 col-3'>
                                <h1 className="h4 mb-4">User Management</h1>
                            </div>
                            <div className='col-5'>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search user"
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
                                <Link to="/dashboard/admin/users/add" className="btn btn-dark" style={{ borderRadius: '0' }}>Add New User +</Link>
                            </div>
                        </div>

                        <div className="card" style={{ borderRadius: '0' }}>

                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '30%' }} className='pl-4'>Name</th>
                                        <th scope="col" className="text-center">Email</th>
                                        <th scope="col" className="text-center">Actions</th>
                                        {/* <th scope="col" className="text-center"> </th> */}
                                    </tr>
                                </thead>
                                <tbody className="p-2">
                                    {
                                        loding ?
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
                                                </tr>
                                            </>
                                            :
                                            users.length ?
                                                users.filter(value => {
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
                                                                    <Link className="d-flex align-items-center text-decoration-none mx-1" to={"/dashboard/admin/users/" + (item._id)} style={{ textDecoration: "none" }}>
                                                                        <img className="img-fluid" src={process.env.REACT_APP_SERVER_FILE + item.ProfilePicture} alt="" style={{ height: '2.5rem', borderRadius: '50%' }} />
                                                                        <div className="pl-3 m-0">
                                                                            <span className='text-dark' style={{ fontSize: '14px' }}>{item.Name}</span>
                                                                        </div>
                                                                    </Link>
                                                                </td>
                                                                <td className='align-middle text-center'>
                                                                    <span className="ml-3" style={{ fontSize: '14px' }}>{item.Email}</span>
                                                                </td>
                                                                <td className='align-middle'>
                                                                    <div className="dropdown col-5 ml-2 mt-1 mx-auto" style={{ border: '0' }}>
                                                                        <span className="bi bi-three-dots-vertical" href="#" id="Dropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
                                                                        <div className="dropdown-menu  shadow " aria-labelledby="Dropdown1" style={{ border: '0' }}>
                                                                            <Link className="dropdown-item" to={"/dashboard/admin/users/edit/" + (item._id)}>
                                                                                <i className="bi bi-pencil-square mr-2 " />
                                                                                Edit
                                                                            </Link>
                                                                            <div className="dropdown-divider" />
                                                                            <button className="dropdown-item">
                                                                                <i className="bi bi-trash mr-2 " />
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    </div>
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
        </div>
    )
}

export default Users
