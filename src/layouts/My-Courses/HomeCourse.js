import { React, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Topbar from '../../components/Edit-User/Topbar'
import { getCoursesByID } from '../../services/api';
import Loading from '../LoadingScreen/Loading';

const HomeCourse = () => {

    useEffect(() => {
        getAllCourses();
    }, [])

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const [course, setCourse] = useState({})
    const [modules, setModules] = useState([])

    const getAllCourses = async () => {
        setLoading(true)
        const result = await getCoursesByID(id);
        setCourse(result.data)
        setModules(result.data.Modules)
        setLoading(false)
    }


    return (
        <div>
            <Topbar Title="Home" Description={course.Name} />

            <div className='card3'>
                <div className="container">

                    <div className="card my-3 mt-2 p-2" style={{ borderRadius: '0'}}>
                        <span>There are total {modules.length} Modules</span>

                        <table className='table'>
                            <thead>
                                <tr>
                                    <th style={{ width: '60%' }}>Module Name</th>
                                    <th>Topics</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ?
                                        <>Loading...</>
                                        :
                                        modules.length ?
                                            modules.map(item => (
                                                <>
                                                    <tr>
                                                        <td className="align-middle">
                                                            <span>{item.ModuleName}</span>
                                                        </td>
                                                        <td className="align-middle">
                                                            <span>{item.ModuleTopics.length}</span>
                                                        </td>
                                                        <td className="align-middle">
                                                            {
                                                                item.Status == 1 ?
                                                                    <span className="badge " style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>Completed</span>
                                                                    :
                                                                    item.Status == 0 ?
                                                                        <span className="badge " style={{ fontSize: '13px', backgroundColor: 'rgba(117, 79, 254, 0.1)', color: '#754FFE', borderRadius: '0' }}>Remaining</span>
                                                                        :
                                                                        <></>
                                                            }
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                            :
                                            <></>
                                }
                            </tbody>
                        </table>

                        {/* <ul class="list-group my-2" style={{ border: '0', borderRadius: '0' }}>
                            {
                                loading ?
                                    <></>
                                    :
                                    modules.length ?
                                        modules.map(item => (
                                            <li className="list-group-item border">
                                                <span className='float-left'>{item.ModuleName}</span>
                                                {
                                                    item.Status == 1 ?
                                                        <span className="badge float-right" style={{ fontSize: '13px', backgroundColor: '#EBF5F0', color: '#38A169', borderRadius: '0' }}>Completed</span>
                                                        :
                                                        item.Status == 0 ?
                                                            <span className="badge float-right" style={{ fontSize: '13px', backgroundColor: 'rgba(117, 79, 254, 0.1)', color: '#754FFE', borderRadius: '0' }}>Remaining</span>
                                                            :
                                                            <></>
                                                }
                                            </li>
                                        ))
                                        :
                                        <></>
                            }
                        </ul> */}

                    </div>

                </div>
            </div>


        </div>
    )
}

export default HomeCourse
