import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMessagesById } from '../../services/api';
import Loading from '../../layouts/LoadingScreen/Loading';

const ViewMessage = () => {

    useEffect(() => {
        getMessageDetails();
    }, [])

    const { id } = useParams()
    const navigate = useNavigate()

    const [message, setMessage] = useState({})
    const [loading, setLoading] = useState(false)

    const getMessageDetails = async () => {
        setLoading(true)
        const result = await getMessagesById(id)
        setMessage(result.data.data)
        setLoading(false)
    }

    return (
        <div className="px-3">
            {
                loading ?
                    <Loading />
                    :
                    <>
                        <div className='row' >
                            <div className='col-9 float-left'>
                                <h1 className="h4 mb-4">View Message</h1>
                            </div>
                            <div className='col-3 text-right pr-5'>
                                <button onClick={() => navigate(-1)} className="btn btn-dark" style={{ borderRadius: '0' }}><i className="bi bi-chevron-left mr-1"></i>Back</button>
                            </div>
                        </div>

                        <section className="container">
                            <div className="col-6 mx-auto">
                                <div className="card p-5" style={{ borderRadius: '0' }}>
                                    {
                                        loading ?
                                            <>Loading...</>
                                            :
                                            <form
                                                className="php-email-form"
                                            // onSubmit={sendMessage}
                                            >
                                                <div className="row gy-4">
                                                    <div className="col-md-6">
                                                        <input
                                                            type="text"
                                                            name="Name"
                                                            className="form-control bg-white"
                                                            style={{ borderRadius: '0' }}
                                                            value={message.Name}
                                                            readOnly
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-6 ">
                                                        <input
                                                            type="email"
                                                            className="form-control bg-white"
                                                            name="Email"
                                                            style={{ borderRadius: '0' }}
                                                            value={message.Email}
                                                            readOnly
                                                            required
                                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <input
                                                            type="text"
                                                            className="form-control bg-white"
                                                            name="Subject"
                                                            style={{ borderRadius: '0' }}
                                                            value={message.Subject}
                                                            readOnly
                                                            required
                                                        />
                                                    </div>
                                                    <div className="col-md-12">
                                                        <textarea
                                                            className="form-control bg-white"
                                                            name="Message"
                                                            rows={6}
                                                            style={{ borderRadius: '0' }}
                                                            value={message.Message}
                                                            readOnly
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </form>
                                    }

                                </div>


                            </div>
                        </section>
                    </>
            }
        </div>
    )
}

export default ViewMessage
