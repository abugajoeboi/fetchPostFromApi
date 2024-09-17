import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import Posts from './Components/Posts.jsx';
import './index.css'
import Products from './Components/Products.jsx'
import PostsButton from './Components/PostsButton.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Posts/> */}
    {/* <PostsButton/> */}
    <Products/>
  </StrictMode>,
)
