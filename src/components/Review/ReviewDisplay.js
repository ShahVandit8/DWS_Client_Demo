import React from 'react'
import Star from '../Rating-Star/Star'

function ReviewDisplay(props) {

    const {profilepicture, username, time, rating, description} = props;

    return (
        <>
            <div className="row my-3" style={{ borderBottom: '2px solid #f2f2f2', borderColor: '#f2f2f2'}}>
                <div className="col-1">
                    <img src={process.env.REACT_APP_SERVER_FILE + profilepicture}  className='rating-profilepic' />
                </div>
                <div className="col-11 pl-4">
                    <div className="">
                        <span className='text-dark mr-2' style={{ fontSize: '16px' }}><strong>{username}</strong></span>
                        <span className='text-dark mt-n1' style={{ fontSize: '12px' }}>{time}</span>
                    </div>
                    <div className="text-dark">
                        <Star rating={rating} />
                    </div>
                    <div className="text-dark mt-2">
                        <p>
                            {description}
                            {/* Lectures were at a really good pace and I never felt lost. The instructor was well informed and allowed me to learn and navigate Figma easily. */}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

ReviewDisplay.defaultProps = {
    profilepicture: '/img/profile.jpg', 
    username: 'Harshit Shah', 
    time: '2 Days ago', 
    rating: '4', 
    description: 'Good Course'
}

export default ReviewDisplay
