import { motion, AnimatePresence } from 'framer-motion';
import { buttonSound } from './utils/sounds';
import { useEffect, useState } from 'react';
import TopBar from './TopBar';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default function MainMenu({ onHTP}) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const onCreateRoom = () => {
    const customId = nanoid(8);
    navigate(`/game/${customId}`)
  }

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#cdc1b4] text-[#4d4d4d]">
      <TopBar />
      <motion.h1 className="text-6xl md:text-8xl font-extrabold tracking-wide text-[#4d351f] mb-8" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{textShadow: '0 0 5px #bbada0, 0 0 15px #d6b99e, 0 0 25px #cdc1b4'}}>
        Blink Tac Toe
      </motion.h1>

      <AnimatePresence mode='wait'>
        {!expanded ? (
        <motion.div className='flex flex-col space-y-4' initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
            <motion.button  className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8  py-4 text-xl font-semibold rounded-xl shadow-md transition-all" key="start" onClick={() => {buttonSound.play();setExpanded(true)}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.1 }}>
                Start Game
            </motion.button>
            <motion.button  className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8  py-4 text-xl font-semibold rounded-xl shadow-md transition-all" key="HTP" onClick={()=>{buttonSound.play();onHTP()}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.1 }}>
                How to Play
            </motion.button>
        </motion.div>
        ) : (
          <motion.div className="flex flex-col space-y-4" key="options" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}>
            <motion.button className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8 py-4 text-xl font-semibold rounded-xl shadow-md transition-all" onClick={()=>{buttonSound.play();navigate('/local')}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Local
            </motion.button>
            <motion.button className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8 py-4 text-xl font-semibold rounded-xl shadow-md transition-all" onClick={()=>{buttonSound.play();onCreateRoom()}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Create Room
            </motion.button>
            <motion.button className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8 py-4 text-xl font-semibold rounded-xl shadow-md transition-all" onClick={()=>{buttonSound.play();setExpanded(false)}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Back
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
