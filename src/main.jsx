import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home, Item, Profile, Explore, CreateNFT, Collections, Auction } from './pages'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='item' element={<Item/>}/>
      <Route path='explore' element={<Explore/>}/>
      <Route path='create-nft' element={<CreateNFT/>}/>
      <Route path='collections' element={<Collections/>}/>
      <Route path='auction' element={<Auction/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
