import React from 'react'
import './model.css'
const Model = ({selectImage , setSelectImage})  => {
    console.log(selectImage)
    const handleClick = (e) => {
        setSelectImage(null)
    }
    return (
        <div className = 'backdrop' onClick = {handleClick}>
            <img src = {selectImage} alt = 'enlarged image' />
        </div>
    )
}
export default Model