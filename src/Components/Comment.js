import React,{useState,useEffect} from 'react'
import './imageholder.css'
import axios from 'axios'
function Comment() {
    const[comment,setComment] = useState("");
    const [data, setData] = useState([])
    useEffect (async() => {
        let result = await axios.get("https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json")
        setData(result.data.pics)
        console.log(data)
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
    return (<div>
        {data.map((item) => {
            return (
                <div>
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
            )
        })}
</div>
       
    )
}

export default Comment
