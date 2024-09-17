
import React, {useState,useEffect} from 'react'
import styles from './Posts.module.css';

export default function Posts() {
 const [posts, setposts]=useState([]);
 const [isLoading, setisLoading]=useState(true);
  
 async function getpostsHandler(){
  try {
        setisLoading(true);
    const apiRes = await fetch('https://dummyjson.com/posts');
    const result = await apiRes.json();
    console.log(result);
    if(result.posts){
        setposts(result.posts || ([]));
        setisLoading(false);
    }
  } catch (error) {
    console.error('error fetching posts',error)
    setisLoading(false);
    
  }
}

useEffect(()=>{
  getpostsHandler();
},[])
 if(isLoading) return <h3>Getting posts please wait.....</h3>
return (
  <div className={styles.body}>
  <h1 className={styles.heading}>POSTS</h1>
  <div className={styles.container}>
    {posts.length > 0 ? (
      posts.map((item)=>(
        <div key={item.id} className={styles.card}>
              <h1>POST ID: {item.id}</h1>
              <h2>USER ID: {item.userId}</h2>
              <h3 className={styles.title}>POST TITLE: {item.title.toUpperCase()}</h3>
              <p className={styles.postsText}>{item.body}</p>
              <h4>TAGS: {item.tags.join(', ')}</h4>
              <h4>views: {item.views}</h4>
              <h4></h4>
        </div>

      ))
    ):(
      <h2>posts not found</h2>
    )
  }
  </div>
    </div>
  )
}
