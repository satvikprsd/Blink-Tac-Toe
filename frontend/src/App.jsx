import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainGame from './components/MainGame'
import { CategoryProvider } from './components/CategoryContext'
import { PlayerMoveProvider } from './components/PlayerMovesContext'

function App() {

  return (
    <div className='w-screen h-screen bg-background'>
      <PlayerMoveProvider>
        <CategoryProvider>
          <MainGame />
        </CategoryProvider>
      </PlayerMoveProvider>
    </div>
  )
}

export default App
