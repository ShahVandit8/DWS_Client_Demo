import { React, useState } from 'react'

function Star(props) {

    const { rating, size } = props

    return (
        <div className="star-rating-tab">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (rating) ? "on" : "off"}
                    >
                        <span className="bi bi-star-fill" style={{fontSize: size}}></span>
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

Star.defaultProps = {
    size : '15px'
}

export default Star
