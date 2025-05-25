import { ArrowBigLeft, Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import React from 'react'
import { buttonSound } from './utils/sounds';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAudio} from './AudioContext';

const TopBar = ({resest,roomId, isConnected, role}) => {
    const {Mute, setMute} = useAudio();
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <div className={`fixed top-0 left-0 flex ${location.pathname!='/' ? 'justify-between' : 'justify-end'} w-full pr-2 pl-0`}>
        {location.pathname!='/' && <ArrowBigLeft onClick={()=>{buttonSound.play();navigate('/');resest(true)}} size={55} className='hover:cursor-pointer' />}
        {roomId && <div className='fixed top-0 sm:top-3 left-25'>
          <h2 className='text-xl font-bold'>Room: {roomId}</h2>
          <div className='flex items-center gap-2'>
            <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
            {role && <span className='ml-2'>({role})</span>}
          </div>
        </div>}
        {Mute ? <VolumeX onClick={()=>{buttonSound.play();setMute(prev=>!prev)}} size={50} className='hover:cursor-pointer'/> : <Volume2 onClick={()=>{buttonSound.play();setMute(prev=>!prev)}} size={50} className='hover:cursor-pointer'/>}
    </div>
  )
}

export default TopBar