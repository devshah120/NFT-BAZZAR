import {Header , Footer} from './components'
import { Outlet } from 'react-router-dom'
import {NFTBazzarProvider} from '../Context/NFTBazzarContext';
function App() {
  return (
    <div className=' bg-black dark:bg-white'>
    <NFTBazzarProvider>
      <Header/>
        <Outlet/> 
      <Footer/>
      </NFTBazzarProvider>
    </div>
  )
}

export default App


// ef1d8c72942d434cadf74980e53ced77