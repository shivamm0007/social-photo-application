import React , {useState , useEffect} from 'react'
import axios from 'axios'
import './imageholder.css'

function ImageHolder({setSelectImage,likeClicked,commentClicked,setLikeClicked,setCommentClicked,searchTerm}) {
const [data, setData] = useState([])
const [filteredData ,setFilteredData] = useState([]);
const [likeUnlike, setLikeUnlike] = useState("Like")
const[comment,setComment] = useState("");
let [likeCount, setLikeCount] = useState(0)
useEffect (async() => {
    let result = await axios.get("https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json")
    setData(result.data.pics.map((item)=>{
        return {
            ...item,
            liked: false
        }
    }))
},[])

let handleClick = (e,id) =>
{let sid = id;
    let obj = {...comment};
    obj[sid]=e.target.value;
    e.stopPropagation();
    setComment(obj);
}

let handlePostclick = (e,id) => 
{
    e.stopPropagation();
    let newData = data.map((item)=>{
        if(item.id==id)
        {
            return {
                ...item,
                comments:[...item.comments,comment[item.id]]
            }
          
        }
        else{
            return {
                ...item
            }
        }
    })
    setData(newData);
    let obj = {...comment};
    obj[id]="";
    setComment(obj);
}
const likeHandler = (e,id) => {
    e.stopPropagation()
    let newData = [...data].map((item)=>{
        if(item.id == id)
        {
            return {
                ...item,
                likes: !item.liked == true ? item.likes+1 : item.likes-1,
                liked: !item.liked
            }
        }else{
            return {
                ...item
            }
        }
    })
    setData(newData);
}

useEffect(()=>{

    if(likeClicked==true)
    {
        setData(  [...data].sort((a,b)=>{
            return b.likes-a.likes
    }))
setLikeClicked(false)
}},[likeClicked])
useEffect(()=> {
    if(commentClicked===true){
        setData([...data].sort((a,b)=>{
            return b.comments.length-a.comments.length
        }))
    }
    setCommentClicked(false)
},[commentClicked])
    return (
        <div className = 'grid'>
            {data.filter((item)=>{
                if(item.category.toLowerCase().includes(searchTerm.toLowerCase()))
                {
                    return true
                }
            }).map((item)=> {
                return (
                    <div className="card-container" key = {item.id} onClick = {() => setSelectImage(item.url)}>
                        <div>
                        <img src={item.url} className="image" alt= 'image' key={item.id}/> 
                        </div>
                        <div>
                        <div> 
                            <div className="likes-container">
                            <p className="likes" >{item.likes}</p>
                            <p className="likes-text" onClick = {(e) => likeHandler(e,item.id)}>
                                <u>{item.liked ? "Unlike" : "Like"}</u></p>
                            <p className="item-category">{item.category} </p>
                            </div>
                        </div>
                        <input onChange={(e)=>{handleClick(e,item.id)}} 
                        onClick={(e)=>{e.stopPropagation()}} 
                        value={comment[item.id]} 
                        placeholder = 'Type of your comment here...'
                        className="input-box"></input>

                        <button onClick={(e)=>{handlePostclick(e,item.id)}}>Post</button>

                        {item.comments.map((item)=>{
                            return <p className="comment-style">{item}</p>
                        })}
                    </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ImageHolder
