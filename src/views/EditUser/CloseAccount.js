import { React, useState, useEffect } from 'react';
import { NavHashLink } from 'react-router-hash-link'
import jwtDecode from 'jwt-decode';
import Topbar from '../../components/Edit-User/Topbar.js'

function CloseAccount() {
    return (
        <>
            <Topbar Title="Close Account" Description="Close your account permanently." />

            <div className='card3'>
                <div className="container">
                    <div className="card-body card-form">
                        <span style={{ fontSize: '16px' }}>
                            <span style={{ color: '#C4370F', fontWeight: 'bold', fontSize: '16px' }}>Warning: </span>
                            If you close your account, you will be unenroll from all your 0 courses, and will lose access forever.
                        </span>
                        <br />
                        <button className="submitbutton">Close account</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CloseAccount
