import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const FilePreview = () => {

    const {id} = useParams()

    return (
        <div>
            <iframe src={'https://view.officeapps.live.com/op/embed.aspx?src='+process.env.REACT_APP_SERVER_FILES+id} width='100%' height='650px' frameborder='0'></iframe>
            {/* <iframe src={'https://view.officeapps.live.com/op/embed.aspx?src='+'/img/cafe-word.docx'} width='100%' height='650px' frameborder='0'></iframe> */}
        </div>
    )
}

export default FilePreview
