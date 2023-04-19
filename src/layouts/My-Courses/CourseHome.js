import React from 'react'
import { Outlet } from 'react-router-dom';
import CourseSidebar from '../../components/CourseHome/CourseSidebar';

const CourseHome = () => {
    return (
        <section id="edit-user" className="edit-user">

            <div className="container">
                <div className="row justify-content-center">

                    <CourseSidebar />

                    <div className="col-lg-8 col-12 card2 p-0">

                        <Outlet />

                    </div>

                </div>
            </div>
        </section>
    )
}

export default CourseHome
