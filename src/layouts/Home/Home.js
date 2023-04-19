import { React, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import '../../assets/css/Style1.css'
import '../../assets/css/vendor/bootstrap/css/bootstrap.css'
import '../../assets/css/vendor/bootstrap-icons/bootstrap-icons.css'
import '../../assets/css/vendor/glightbox/css/glightbox.css'
import '../../assets/css/vendor/remixicon/remixicon.css'
import '../../assets/css/Style.css'

import Navbar from '../../components/Navbar/Navbar'
import Navbar2 from '../../components/Navbar/Navbar2'
import Footer from '../../components/Footer/Footer'
import Hero from '../../views/Homepages/Hero'
import About from '../../views/Homepages/About'
import Contact from '../../views/Homepages/Contact'
import Counts from '../../views/Homepages/Counts'
import Courses from '../../views/Homepages/Courses'
import NewsLetter from '../../views/Homepages/NewsLetter'

function Home({ login, setlogin }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  return (
    <div>
      {/* <Navbar /> */}
      <Hero login={login} setlogin={setlogin} />
      <About />
      <Counts />
      <Courses />
      <Contact />
      <NewsLetter />
    </div>
  )
}

export default Home
