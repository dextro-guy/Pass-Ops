import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
function App() {
  return (
    <>
    <Navbar/>
    <div className='min-h-[82.4vh] bg-green bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(250,34,100,.5)_100%)]'>

     <Manager/>
    </div>
     <Footer/>
    </>
  )
}

export default App
