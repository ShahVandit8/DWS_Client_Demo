import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getCoursesByID } from '../../services/api.js'

import CourseDetail from '../../views/Course-Details/CourseDetail'
import CourseTitle from '../../views/Course-Details/CourseTitle'
import Loading from '../LoadingScreen/Loading.js';

function CourseDetailPage() {

  useEffect(() => {
    window.scrollTo(0, 0);
    getCourseByID();
  }, []);

  const [Course, setCourseDets] = useState({})
  const [modules, setModules] = useState([])
  const [ratinglist, setRatingList] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const getCourseByID = async () => {
    setLoading(true)
    let CourseDetailOfOne = await getCoursesByID(id);
    setCourseDets(CourseDetailOfOne.data);
    setModules(CourseDetailOfOne.data.Modules);
    setRatingList(CourseDetailOfOne.data.RatingList);
    setLoading(false)
  }

  // const Course1 = {
  //   Name: 'Java Programming',
  //   CoverImage: '/img/javascript.jpg',
  //   ShortDescription: 'Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!',
  //   StudentCount: '800',
  //   Rating: '4.5',
  //   RatingOutOf: '130',
  //   RatingList:
  //     [
  //       {
  //         id: 0,
  //         profileimg: '/img/profile.jpg',
  //         StudentName: 'Vandit Shah',
  //         Rating: '3',
  //         Description: 'Average Course',
  //         Date: '2023-03-25',
  //       },
  //       {
  //         id: 1,
  //         profileimg: '/img/profile1.jpeg',
  //         StudentName: 'Harshit Shah',
  //         Rating: '5',
  //         Description: 'This is the Best course out there in the market',
  //         Date: '2023-03-22',
  //       },
  //       {
  //         id: 2,
  //         profileimg: '/img/profile2.jpg',
  //         StudentName: 'Kenny Patel',
  //         Rating: '4',
  //         Description: 'The Teachers are very friendly',
  //         Date: '2023-03-20',
  //       },
  //       {
  //         id: 3,
  //         profileimg: '/img/profile3.jpg',
  //         StudentName: 'Arpita Khan',
  //         Rating: '0',
  //         Description: 'Worst Experiance Course',
  //         Date: '2023-03-10',
  //       },
  //     ],
  //   Level: 'Intermediate',
  //   Duration: '8 Weeks',
  //   Modules:
  //     [
  //       {
  //         id: 0,
  //         ModuleName: 'Introduction to JavaScript',
  //         ModuleGoal: 'In this module, you will learn the concepts of scripting on client-side and fundamentals of JavaScript',
  //         ModuleObjective:
  //           [
  //             { id: 0, Title: 'Understand the basics of JavaScript programming' },
  //             { id: 1, Title: 'Reduce the load of the server' },
  //             { id: 2, Title: 'Use variables and their datatypes' },
  //             { id: 3, Title: 'Handle conditional statements in your program' },
  //           ],
  //         ModuleTopics:
  //           [
  //             { id: 0, Title: 'History and Introduction' },
  //             { id: 1, Title: 'Variables' },
  //             { id: 2, Title: 'Data types' },
  //             { id: 3, Title: 'Type Conversions' },
  //             { id: 4, Title: 'Operators' },
  //             { id: 5, Title: 'Conditional statements' },
  //           ]

  //       },
  //       {
  //         id: 1,
  //         ModuleName: 'Functions and Internal Memory Management',
  //         ModuleGoal: 'In this module, you will learn the memory management and process of function execution',
  //         ModuleObjective:
  //           [
  //             { id: 0, Title: 'Minimize your code size by using reusable codes i.e., Functions' },
  //             { id: 1, Title: 'Analyze Internal Memory Management in JavaScriptr' },
  //             { id: 2, Title: 'Identify the type of declaration that should be applied for a variable' },
  //             { id: 3, Title: 'Explain the concept of Variable Shadowing and Closures' },
  //             { id: 4, Title: 'Understand the role of Garbage Collectors in JavaScript' },
  //           ],
  //         ModuleTopics:
  //           [
  //             { id: 0, Title: 'Functions' },
  //             { id: 1, Title: 'Function Execution & Memory Management' },
  //             { id: 2, Title: 'Variable Shadowing & Closures' },
  //             { id: 3, Title: 'Garbage Collection' },
  //           ]
  //       },
  //       {
  //         id: 2,
  //         ModuleName: 'Objects and Event Handling',
  //         ModuleGoal: 'In this module, you will learn to use the benefits of Objects and Event Handling in JavaScript',
  //         ModuleObjective:
  //           [
  //             { id: 0, Title: 'Create and use objects' },
  //             { id: 1, Title: 'Access BOM methods and elements' },
  //             { id: 2, Title: 'Access HTML Elements through DOM objects' },
  //             { id: 3, Title: 'Understand how to change HTML Element style with DOM' },
  //             { id: 4, Title: 'Attach Event Listeners to DOM elements' },
  //             { id: 5, Title: 'Validate HTML forms before sending a request to the Server' },
  //           ],
  //         ModuleTopics:
  //           [
  //             { id: 0, Title: 'Objects' },
  //             { id: 1, Title: 'Browser Object Model (BOM)' },
  //             { id: 2, Title: 'Document Object Model (DOM)' },
  //             { id: 3, Title: 'Events' },
  //             { id: 4, Title: 'Validations' },
  //           ]
  //       },
  //       {
  //         id: 3,
  //         ModuleName: 'Libraries and Frameworks',
  //         ModuleGoal: ' In this module, you will learn the different libraries and frameworks of JavaScript',
  //         ModuleObjective:
  //           [
  //             { id: 0, Title: 'Identify and work with errors/exceptions' },
  //             { id: 1, Title: 'Use JSON and AJAX' },
  //             { id: 2, Title: 'Identify the difference between libraries, frameworks and tools' },
  //             { id: 3, Title: 'Differentiate between JQuery and JavaScript' },
  //           ],
  //         ModuleTopics:
  //           [
  //             { id: 0, Title: 'Errors' },
  //             { id: 1, Title: 'JSON' },
  //             { id: 2, Title: 'AJAX' },
  //             { id: 3, Title: 'Libraries and frameworks' },
  //             { id: 4, Title: 'JQuery' },
  //             { id: 5, Title: 'Difference between JavaScript and JQuery' },
  //           ]
  //       },
  //       {
  //         id: 4,
  //         ModuleName: 'JQuery – Functions & DOM',
  //         ModuleGoal: 'In this module, you will learn to validate forms and handle events using JQuery',
  //         ModuleObjective:
  //           [
  //             { id: 0, Title: 'Use functions with JQuery' },
  //             { id: 1, Title: 'Understand the usage of selectors in JQuery' },
  //             { id: 2, Title: 'Traverse through and modify the DOM elements using JQuery' },
  //             { id: 3, Title: 'Apply effects and animations in DOM' },
  //           ],
  //         ModuleTopics:
  //           [
  //             { id: 0, Title: 'Functions' },
  //             { id: 1, Title: 'JQuery Forms' },
  //             { id: 2, Title: 'Form Validations' },
  //             { id: 3, Title: 'Event Handling' },
  //             { id: 4, Title: 'AJAX with JQuery' },
  //             { id: 5, Title: 'Plugins' },
  //           ]
  //       },
  //     ],
  //   LongDescription: 'The Java programming language course is designed to teach the fundamentals of object-oriented programming using Java. Participants will learn to write Java programs, create classes and objects, handle exceptions, and use Java libraries to develop robust applications. The course covers topics such as data types, control structures, methods, arrays, inheritance, polymorphism, and GUI programming. Participants will also gain knowledge about software engineering principles such as design patterns and code organization. The course provides hands-on practice with coding exercises and assignments to reinforce learning. By the end of the course, participants will be equipped with the skills needed to develop Java applications and will have a strong foundation in object-oriented programming.',
  //   Price: '9000',
  //   SellingPrice: '1200'
  // }

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
      {
        loading ?
          <Loading />
          :
          <>
            <CourseTitle
              CourseName={Course.Name}
              ShortDescription={Course.ShortDescription}
              StudentCount={Course.StudentCount}
              Rating={Course.Rating}
              RatingOutOf={Course.RatingOutOf}
              Level={Course.Level}
              Duration={Course.Duration}
            />

            <CourseDetail
              id={Course._id}
              CoverImage={Course.CoverImage}
              Modules={modules}
              LongDescription={Course.LongDescription}
              Price={Course.Price}
              SellingPrice={Course.SellingPrice}
              RatingList={ratinglist}
              Rating={Course.Rating}
              RatingOutOf={Course.RatingOutOf}
              StartDate={Course.StartDate}
              Category={Course.Category}
            />
          </>
      }

    </div>
  )
}

export default CourseDetailPage
