import { React, useState } from 'react'

export default function Rating() {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

  return (
    <div className="star-rating-tab">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="bi bi-star-fill" style={{fontSize: '20px'}}></span>
                    </button>
                );
            })}
            {/* <span className={"fa fa-star " } style={{ fontSize: Size }}></span>
            <span className={"fa fa-star " } style={{ fontSize: Size }}></span>
            <span className={"fa fa-star " } style={{ fontSize: Size }}></span>
            <span className={"fa fa-star " } style={{ fontSize: Size }}></span>
            <span className={"fa fa-star mr-2 " } style={{ fontSize: Size }} ></span> */}
        </div>
  )
}
