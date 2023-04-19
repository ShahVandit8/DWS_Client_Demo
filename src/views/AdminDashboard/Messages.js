import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllMessages, deleteMessage } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../layouts/LoadingScreen/Loading';

const Messages = () => {

    useEffect(() => {
        getMessages();
    }, [])

    const navigate = useNavigate();

    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const getMessages = async () => {
        setLoading(true)
        const result = await getAllMessages();
        setMessages(result.data.data)
        setLoading(false)
    }

    const deleteaMessage = async (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                const deletemessage = await deleteMessage(id)
                if (deletemessage.data.status == 200) {
                    toast("✅ Message Deleted successfully");
                    window.setTimeout(PageReload, 3000)
                }
                else {
                    toast.error("Sorry something went wrong.");
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
                            <div className='col-4'>
                                <h1 className="h4 mb-4">Contact Messages</h1>
                            </div>
                            <div className='col-5'>
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search name"
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
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>

                        <div className="card" style={{ borderRadius: '0' }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Subject</th>
                                        <th style={{ width: '35%' }}>Message</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ?
                                            <></>
                                            :
                                            messages.filter(value => {
                                                if (search === '') {
                                                    return value
                                                }
                                                else if (value.Name.toLowerCase().includes(search.toLowerCase())) {
                                                    return value
                                                }
                                            }).map((item, index) => (
                                                <tr key={index} style={{ fontSize: '14px' }}>
                                                    <td className="text-align">{item.Name}</td>
                                                    <td className="text-align">{item.Email}</td>
                                                    <td className="text-align">{(item.Subject).slice(0, 25)}</td>
                                                    <td className="text-align">{(item.Message).slice(0, 50)}</td>
                                                    <td className="text-align">
                                                        <div className="dropdown col-5 ml-2 mt-1" style={{ border: '0' }}>
                                                            <span className="bi bi-three-dots-vertical" href="#" id="Dropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
                                                            <div className="dropdown-menu  shadow " aria-labelledby="Dropdown1" style={{ border: '0' }}>
                                                                <Link className="dropdown-item" to={"/dashboard/admin/message/" + (item._id)}>
                                                                    <i className="bi bi-eye mr-2 " />
                                                                    View
                                                                </Link>
                                                                <div className="dropdown-divider" />
                                                                <button onClick={(e) => deleteaMessage(item._id)} className="dropdown-item">
                                                                    <i className="bi bi-trash mr-2 " />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
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

export default Messages
