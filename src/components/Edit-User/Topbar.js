import React from 'react'

function Topbar(props) {

    const {Title, Description} = props;

    return (
        <div className="">
            <div className="col-12">
                <h4 className='text-center mt-3' style={{ color: '#000', fontWeight: 'bold' }}>{Title}</h4>
                <p className='text-center' style={{ marginTop: '-8px', fontSize: '16px' }}>{Description}</p>
            </div>
        </div>
    )
}

export default Topbar
