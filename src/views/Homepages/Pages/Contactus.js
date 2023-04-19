import { React, useState, useEffect } from 'react'
import { addMessage, checkMessage } from '../../../services/api.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageHeading from '../../../components/PageHeadings/PageHeading.js';

const Contactus = () => {

    const [message, setMessage] = useState({
        Name: '',
        Email: '',
        Subject: '',
        Message: '',
    })

    const onValueChange = (e) => {
        setMessage({ ...message, [e.target.name]: e.target.value })
    }

    const sendMessage = async (e) => {
        e.preventDefault()

        console.log(message)

        const Email = message.Email

        const isemailexist = await checkMessage({ Email })

        if (isemailexist.data.status == 200) {
            if (window.confirm('You have already sent a message from this email address. Do you want to send another message?')) {
                try {
                    const sendmessage = await addMessage(message);

                    if (sendmessage.data.status == 200) {
                        toast("✅  Your Message has been sent successfully");
                        window.setTimeout(PageReload, 3000)
                    }
                    else {
                        toast.error("Sorry message was unable to send");
                    }
                }
                catch (err) {
                    toast.error("Error: " + err);
                }
            }
        }
        else {
            try {
                const sendmessage = await addMessage(message);

                if (sendmessage.data.status == 200) {
                    toast("✅ Your Message has been sent successfully");
                    window.setTimeout(PageReload, 3000)
                }
                else {
                    toast.error("Sorry message was unable to send");
                }
            }
            catch (err) {
                toast.error("Error: " + err);
            }
        }
    }

    const PageReload = () => {
        window.location.reload();
    }

    return (
        <>
            <section id="contact" className="contact mt-5" style={{ Zindex: '10000'}}>
                <div className="container" data-aos="fade-up">
                    <header className="section-header">
                        <h2>Contact</h2>
                        <p>Contact Us</p>
                    </header>
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            <div className="row gy-4">
                                <div className="col-md-6">
                                    <div className="info-box">
                                        <i className="bi bi-geo-alt" />
                                        <h3>Address</h3>
                                        <p>
                                            1/A, Satyam Apartment, RC Dutt
                                            <br />
                                            Rd, Alkapuri,
                                            Vadodara - 390005
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info-box">
                                        <i className="bi bi-telephone" />
                                        <h3>Call Us</h3>
                                        <p>
                                            +91 9824354587
                                            <br />
                                            +91 265 2337070
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info-box">
                                        <i className="bi bi-envelope" />
                                        <h3>Email Us</h3>
                                        <p>
                                            info@thedigitalworkstation.in
                                            <br />
                                            contact@thedigitalworkstation.in
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="info-box">
                                        <i className="bi bi-clock" />
                                        <h3>Open Hours</h3>
                                        <p>
                                            Monday - Friday
                                            <br />
                                            9:00AM - 06:00PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <form
                                className="php-email-form"
                                onSubmit={sendMessage}
                            >
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="Name"
                                            className="form-control"
                                            placeholder="Your Name"
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6 ">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="Email"
                                            placeholder="Your Email"
                                            required
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                            onChange={(e) => onValueChange(e)}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="Subject"
                                            placeholder="Subject"
                                            onChange={(e) => onValueChange(e)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea
                                            className="form-control"
                                            name="Message"
                                            rows={6}
                                            placeholder="Message"
                                            onChange={(e) => onValueChange(e)}
                                            required
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <div className="loading">Loading</div>
                                        <div className="error-message" />
                                        <div className="sent-message">
                                            Your message has been sent. Thank you!
                                        </div>
                                        <button type="submit">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
            </section>
        </>
    )
}

export default Contactus
