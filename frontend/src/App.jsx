import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainGame from './components/MainGame'
import { CategoryProvider } from './components/CategoryContext'
import { PlayerMoveProvider } from './components/PlayerMovesContext'
import { Toaster } from './components/ui/sonner'
import MainMenu from './components/MainMenu'
import { bgMusic } from './components/utils/sounds'

function App() {
  const [screen, setScreen] = useState('menu');

  useEffect(() => {
    bgMusic.play();
    bgMusic.fade(0, 0.3, 3000);
    return () => bgMusic.stop();
  }, []);
  return (
    <div className='w-screen h-screen bg-background'>
      <PlayerMoveProvider>
        <CategoryProvider>
            {screen === 'menu' && <MainMenu onStartLocal={()=>setScreen('game')} />}
            {screen === 'game' && <MainGame />}
          <Toaster />
        </CategoryProvider>
      </PlayerMoveProvider>
    </div>
  )
}

export default App
