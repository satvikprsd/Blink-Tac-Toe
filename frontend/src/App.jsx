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
import { useMenu } from './components/MenuContext'
import HTPDialog from './components/HTPDialog'

function App() {
  const { Menu, setMenu, Mute } = useMenu();
  const [openHTP, setOpenHTP ] = useState(false);
  useEffect(() => {
    bgMusic.play();
    bgMusic.fade(0, 0.2, 3000);
    return () => bgMusic.stop();
  }, []);

  useEffect(()=>{
    if (Mute) bgMusic.volume(0);
    else bgMusic.volume(0.2);
  },[Mute])

  return (
    <div className='w-screen h-screen bg-background'>
      <PlayerMoveProvider>
        <CategoryProvider>
          <HTPDialog openHTP={openHTP} setOpenHTP={setOpenHTP} />
            {Menu === 'menu' && <MainMenu onStartLocal={()=>setMenu('game')} onHTP={()=>setOpenHTP(true)} />}
            {Menu === 'game' && <MainGame />}
          <Toaster />
        </CategoryProvider>
      </PlayerMoveProvider>
    </div>
  )
}

export default App
