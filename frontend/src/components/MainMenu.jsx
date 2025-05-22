import { motion, AnimatePresence } from 'framer-motion';
import { buttonSound } from './utils/sounds';
import { useEffect, useState } from 'react';

export default function MainMenu({ onStartLocal, onCreateRoom, onSettings, onHelp}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-[#cdc1b4] text-[#4d4d4d]">
      <motion.h1 className="text-6xl md:text-8xl font-extrabold tracking-wide text-[#4d351f] mb-8" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} style={{textShadow: '0 0 5px #bbada0, 0 0 15px #d6b99e, 0 0 25px #cdc1b4'}}>
        Blink Tac Toe
      </motion.h1>

      <AnimatePresence>
        {!expanded ? (
        <motion.div className='flex flex-col space-y-4'>
            <motion.button  className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8  py-4 text-xl font-semibold rounded-xl shadow-md transition-all" key="start" onClick={() => {buttonSound.play();setExpanded(true)}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.1 }}>
                Start Game
            </motion.button>
            <motion.button  className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8  py-4 text-xl font-semibold rounded-xl shadow-md transition-all" key="help" onClick={()=>{buttonSound.play();onHelp()}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.1 }}>
                Help
            </motion.button>
            <motion.button  className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8  py-4 text-xl font-semibold rounded-xl shadow-md transition-all" key="settings" onClick={()=>{buttonSound.play();onHelp()}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.1 }}>
                Settings
            </motion.button>
        </motion.div>
        ) : (
          <motion.div className="flex flex-col space-y-4" key="options" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
            <motion.button className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#4d4d4d] px-8 py-4 text-xl font-semibold rounded-xl shadow-md transition-all" onClick={()=>{buttonSound.play();onStartLocal()}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
