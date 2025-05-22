import { ArrowBigLeft, Volume, Volume1, Volume2, VolumeX } from 'lucide-react'
import React from 'react'
import { useMenu } from './MenuContext'
import { buttonSound } from './utils/sounds';

const TopBar = ({resest}) => {
    const {Menu, setMenu, Mute, setMute} = useMenu();
  return (
    <div className={`fixed top-0 left-0 flex ${Menu=='game' ? 'justify-between' : 'justify-end'} w-full pr-5 pl-3`}>
        {Menu=='game' && <ArrowBigLeft onClick={()=>{buttonSound.play();setMenu('menu');resest(true)}} size={70} className='hover:cursor-pointer' />}
        {Mute ? <VolumeX onClick={()=>{buttonSound.play();setMute(prev=>!prev)}} size={70} className='hover:cursor-pointer'/> : <Volume2 onClick={()=>{buttonSound.play();setMute(prev=>!prev)}} size={70} className='hover:cursor-pointer'/>}
    </div>
  )
}

export default TopBar