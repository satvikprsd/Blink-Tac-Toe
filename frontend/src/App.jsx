import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainGame from './components/MainGame'
import { CategoryProvider } from './components/CategoryContext'

function App() {

  return (
    <div className='w-screen h-screen bg-background'>
      <CategoryProvider>
        <MainGame />
      </CategoryProvider>
    </div>
  )
}

export default App
