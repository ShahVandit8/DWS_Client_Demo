import React from 'react'
import { Link, useParams } from 'react-router-dom'

const SuccessEnrollment = () => {

    const { id } = useParams();

    return (
        <>
            <div style={{ width: '100%', height: '100%' }}>


                <div className="container mt-4 mb-4">
                    <div className="card mx-auto">
                        <div>
                            <img src="/img/enrollsuccess.gif" className="mx-auto d-block mt-3" style={{ height: '8rem' }}/>
                        </div>

                        <div className="mt-5">
                            <h3 className="text-center" style={{ color: 'black' }}>You have Successfully Enrolled in Course </h3>
                            <p className="text-center mt-5" >Your Enrollment id : {id}</p>
                            <p className="text-center mt-5" >You will be contact shortly by our instructor</p>
                            <p className="text-center" >Classes details will be shared via Email</p>
                        </div>

                        <a href='/' className="small m-4 text-center">Back to Home Page</a>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SuccessEnrollment
