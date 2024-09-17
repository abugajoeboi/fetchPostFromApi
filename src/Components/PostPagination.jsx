import React, { useState, useEffect } from 'react';
import styles from './PostPagination.module.css';

const POSTS_PER_PAGE = 3; // Number of posts to display per page

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  async function getPostsHandler() {
    try {
      setIsLoading(true);
      const apiRes = await fetch('https://dummyjson.com/posts');
      const result = await apiRes.json();
      console.log(result);
      if (result.posts) {
        setPosts(result.posts || []);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching posts', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPostsHandler();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  if (isLoading) return <h3>Getting posts, please wait.....</h3>;

  return (
    <div className={styles.body}>
      <h1 className={styles.heading}>POSTS</h1>
        {paginatedPosts.length > 0 ? (
          <div className={styles.container}>
            {paginatedPosts.map((item) => (
              <div key={item.id} className={styles.card}>
                <h1>POST ID: {item.id}</h1>
                <h2>USER ID: {item.userId}</h2>
                <h3 className={styles.title}>POST TITLE: {item.title.toUpperCase()}</h3>
                <p className={styles.postsText}>{item.body}</p>
                <h4>TAGS: {item.tags.join(', ')}</h4>
                <h4>views: {item.views}</h4>
              </div>
            ))}
          </div>
        ) : (
          <h2>Posts not found</h2>
        )}
      
      <div className={styles.pagination}>
        <button
          className={styles.arrowButton}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &laquo; {/* Left Arrow */}
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.pageButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.arrowButton}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &raquo; {/* Right Arrow */}
        </button>
      </div>
    </div>
  );
}
