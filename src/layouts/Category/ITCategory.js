import { React, useEffect, useState } from 'react'
import { getITCourses } from '../../services/api'

import PageHeading from '../../components/PageHeadings/PageHeading'
import CourseGrid from '../../components/Cards/Courses/CourseGrid'

function ITCategory() {

  useEffect(() => {
    window.scroll(0,0)
    getITCoursesList();
  }, [])

  const [itcourses, setITCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  const getITCoursesList = async () => {
    setLoading(true)
    const courselist = await getITCourses()
    setITCourses(courselist.data)
    setLoading(false)
  }

  return (
    <div>
      <PageHeading Title="Information Technology Courses" Description={"More than " + itcourses.length + "+ courses are available"} />
      <section className="container px-3">
        <div>
          <div className='col-md-5 col-12 mb-4 mx-auto'>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search course"
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
        </div>
        <div className='row justify-content-center features'>
          {
            loading ?
              <>
                <div className="col-sm-6 col-md-3">
                  <div className="movie--isloading">
                    <div className="loading-image" />
                    <div className="loading-content">
                      <div className="loading-text-container">
                        <div className="loading-main-text" />
                        <div className="loading-sub-text" />
                      </div>
                      <div className="loading-btn" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="movie--isloading">
                    <div className="loading-image" />
                    <div className="loading-content">
                      <div className="loading-text-container">
                        <div className="loading-main-text" />
                        <div className="loading-sub-text" />
                      </div>
                      <div className="loading-btn" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="movie--isloading">
                    <div className="loading-image" />
                    <div className="loading-content">
                      <div className="loading-text-container">
                        <div className="loading-main-text" />
                        <div className="loading-sub-text" />
                      </div>
                      <div className="loading-btn" />
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-3">
                  <div className="movie--isloading">
                    <div className="loading-image" />
                    <div className="loading-content">
                      <div className="loading-text-container">
                        <div className="loading-main-text" />
                        <div className="loading-sub-text" />
                      </div>
                      <div className="loading-btn" />
                    </div>
                  </div>
                </div>
              </>
              :
              itcourses.filter(value => {
                if (search === '') {
                  return value
                }
                else if (value.Name.toLowerCase().includes(search.toLowerCase())) {
                  return value
                }
              }).map((item) => (
                <CourseGrid id={item._id} Title={item.Name} CoverPicture={process.env.REACT_APP_SERVER_FILE + item.CoverImage} Section={item.Modules.length} Duration={item.Duration} Rating={item.Rating} RatingOutOf={item.RatingOutOf} Price={item.SellingPrice} Level={item.Level} />
              ))
          }
        </div>
      </section>
    </div>
  )
}

export default ITCategory
