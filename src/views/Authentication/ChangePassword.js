import { React, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { changeUserPassword } from '../../services/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {

    useEffect(() => {
        checkValidity();
    }, [])

    const [invalid, setInvalid] = useState(false)
    const [data, setData] = useState({
        newpass: ''
    })
    const [renewpass, setRenewpass] = useState('')

    const { id, time } = useParams();
    const navigate = useNavigate();

    const checkValidity = () => {
        const date = new Date();
        let currentTime = date.getTime();
        console.log(currentTime);

        let validTime = Number(time) + 300000
        console.log(time);
        console.log(validTime);


        if (currentTime > validTime) {
            setInvalid(true)
        }
        else {
            setInvalid(false)
        }
    }

    const changePassword = async (e) => {
        e.preventDefault()

        if( data.newpass === renewpass){
            const update = await changeUserPassword(id, data)

            if(update.data.status === 'ok'){
                toast.success("Password updated successfully")
                window.setTimeout(gotoLogin, 5000)
            }
        }
        else {
            toast.warning("Confirm Password Not Match")
        }
    }

    const gotoLogin = () => {
        navigate('/authentication/sign-in')
    }

    return (
        <section id="login" className="login">
            {
                invalid ?
                    <>
                        <div className="mt-2">
                            <div className="col-12 col-xl-6 col-md-6  mx-auto">
                                <form id="form" className=""
                                // onSubmit={recoverPassword}
                                >
                                    <h3 className="mt-4">Sorry this is not a valid link, or the link is expired.</h3>

                                </form>
                            </div>
                        </div>
                    </>
                    :
                    <div className="mt-2">
                        <div className="col-12 col-xl-3 col-md-6 card mx-auto">
                            <form id="form" className="card-body"
                            onSubmit={changePassword}
                            >
                                <p style={{ fontSize: '30px' }}>Change Password</p>
                                <p className="mt-4 mb-n1">Enter new Password</p>

                                <input type="text" name="newpass" className="form-control" onChange={(e) => setData({ ...data, [e.target.name] : e.target.value})} placeholder="New Password" />
                                <input type="text" name="renewpass" className="form-control" onChange={(e) => setRenewpass(e.target.value)}placeholder="Confirm Password" />

                                <button type="submit" className="submitbutton">
                                    Change Password
                                </button>
                            </form>
                        </div>
                    </div>
            }

            <ToastContainer
                position="top-center"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme="dark"
            />
        </section>
    )
}

export default ChangePassword
