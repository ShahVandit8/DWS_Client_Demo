import { React, useEffect, useState } from 'react'
import PageHeading from '../../../components/PageHeadings/PageHeading.js'

const AboutUs = () => {

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    return (
        <div>
                    <>
                        <PageHeading Title="About us" Description="Who we are ?" />
                        <section style={{ backgroundColor: '#F6F9FF' }}>
                            <div className="container">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">About us</li>
                                    </ol>
                                </nav>
                                <p>
                                    The Digital Workstation was started more than 15 Years ago with a concept of imparting quality education to professionals and career seekers in the field of Information Technology, Software Development, Multimedia as well as commercial art, adverting, Web Publishing, Animation, Engineering Design etc.
                                </p>
                                <p>
                                    With the increase in demand of professionals in the field of Digital Technology it has become a necessity to provide a platform to upgrade their skills with info Tech tools to make a place in fast changing market scenario. The Digital Workstation takes pride in making this mission successful in areas where skills count for success.
                                </p>
                                <p>
                                    The Digital Workstation has trained more than 2,000 students and professional till date. Apart from this The Digital Workstation has been associated with various Universities and Cooperates in providing training and upgrading their skills.
                                </p>
                                <p>
                                    We at The Digital Workstation, offer wide range of unique and innovative course for students and professionals from various industries. We can also customise and design new course as per the requirement of our client.
                                </p>
                            </div>
                        </section>
                    </>
        </div>
    )
}

export default AboutUs
