import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home, Item, Profile, Explore, CreateNFT, Collections, Auction,NFT, Register, CollectionDetail} from './pages'
import AuthLayout from './utils/AuthLayout.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { NFTBazzarProvider } from '../Context/NFTBazzarContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}/>
      <Route path='profile' element={<AuthLayout><Profile/></AuthLayout>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='item' element={<Item/>}/>
      <Route path='NFT/:tokenId' element={<Item/>}/>
      <Route path='explore' element={<Explore/>}/>
      <Route path='create-nft' element={<AuthLayout><CreateNFT/></AuthLayout>}/>
      <Route path='collections' element={<Collections/>}/>
      <Route path='collections/:cat' element={<CollectionDetail/>}/>
      <Route path='auction' element={<Auction/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <NFTBazzarProvider>
        <RouterProvider router={router}/>
      </NFTBazzarProvider>
    </Provider>,
)
