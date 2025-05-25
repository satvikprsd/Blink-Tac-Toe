import { useEffect, useState } from 'react'
import './App.css'
import MainGame from './components/MainGame'
import { CategoryProvider } from './components/CategoryContext'
import { PlayerMoveProvider } from './components/PlayerMovesContext'
import { Toaster } from './components/ui/sonner'
import MainMenu from './components/MainMenu'
import { bgMusic } from './components/utils/sounds'
import { useAudio } from './components/AudioContext'
import HTPDialog from './components/HTPDialog'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GameLobby from './components/GameLobby'
import SocketGameProvider from './components/SocketGameContext'
import About from './components/About'

function App() {
  const { Mute } = useAudio();
  const [openHTP, setOpenHTP ] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const router = createBrowserRouter([
    {path: '/', element: <MainMenu onHTP={()=>setOpenHTP(true)} onAbout={()=>setOpenAbout(true)}/>},
    {path: '/local', element: <MainGame />},
    {path: '/game/:roomId', element: <GameLobby />}
  ])

  useEffect(() => {
    bgMusic.play();
    bgMusic.fade(0, 0.2, 3000);
    const handleVisibilityChange = () => {
      if (document.hidden) {
        bgMusic.pause();
      } else {
        bgMusic.play();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {bgMusic.stop();document.removeEventListener('visibilitychange', handleVisibilityChange);};
  }, []);

  useEffect(()=>{
    if (Mute) bgMusic.volume(0);
    else bgMusic.volume(0.2);
  },[Mute])

  return (
    <div className='w-screen h-screen bg-background'>
      
        <PlayerMoveProvider>
          <CategoryProvider>
            <SocketGameProvider>
              <HTPDialog openHTP={openHTP} setOpenHTP={setOpenHTP} />
              <About openAbout={openAbout} setOpenAbout={setOpenAbout} />
              <RouterProvider router={router}/>
              <Toaster />
            </SocketGameProvider>
          </CategoryProvider>
        </PlayerMoveProvider>
    </div>
  )
}

export default App
