import { ArrowBigLeft, Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import React from 'react'
import { buttonSound } from './utils/sounds';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAudio} from './AudioContext';

const TopBar = ({resest}) => {
    const {Mute, setMute} = useAudio();
    const navigate = useNavigate();
    const location = useLocation();
  return (
    <div className={`fixed top-0 left-0 flex ${location.pathname!='/' ? 'justify-between' : 'justify-end'} w-full pr-5 pl-3`}>
        {location.pathname!='/' && <ArrowBigLeft onClick={()=>{buttonSound.play();navigate('/');resest(true)}} size={70} className='hover:cursor-pointer' />}
        {Mute ? <VolumeX onClick={()=>{buttonSound.play();setMute(prev=>!prev)}} size={70} className='hover:cursor-pointer'/> : <Volume2 onClick={()=>{buttonSound.play();setMute(prev=>!prev)}} size={70} className='hover:cursor-pointer'/>}
    </div>
  )
}

export default TopBar