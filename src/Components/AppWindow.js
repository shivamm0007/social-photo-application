import React , {useState} from 'react'
import './AppWindow.css'
import ImageHolder from './ImageHolder'
import Model from './Model'
import Comment from './Comment'
function AppWindow() {
    const [selectImage, setSelectImage] = useState(null);
    const [likeClicked , setLikeClicked] = useState(false);
    const [commentClicked , setCommentClicked] = useState(false);
    const [searchTerm, setsearchTerm] = useState("");
    

    let handleSearchChange = (e) => 
    {
        let term = e.target.value;
        setsearchTerm(term);
    }


    return (
        <div className = 'AppWindow'>
           <div className = 'heading'><h3>Imaginary</h3></div>
            <div className = 'nav-options'>
            <div className="nav-flex"><p onClick={()=>{setLikeClicked(true)}}><u>Most Liked</u></p> </div>
            <div  className="nav-flex"><p onClick={()=>{setCommentClicked(true)}}><u>Most Commented</u></p></div>
            <div className="nav-search-flex"><input value={searchTerm} onChange={handleSearchChange} placeholder = 'Search images...'
            className = 'search-box'></input></div>        
            </div>
          
            <ImageHolder 
            searchTerm={searchTerm}
            likeClicked={likeClicked}
            setLikeClicked = {setLikeClicked}
            commentClicked = {commentClicked} 
            setCommentClicked = {setCommentClicked}
            setSelectImage = {setSelectImage} />
            {selectImage && <Model selectImage = {selectImage} setSelectImage = {setSelectImage}/>}
            
        </div>
    )
}

export default AppWindow
