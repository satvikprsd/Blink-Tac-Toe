import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { buttonSound } from "./utils/sounds";
import { useCategory } from "./CategoryContext";
import { useNavigate } from "react-router-dom";
import { usePlayerMoves } from "./PlayerMovesContext";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { toast } from "sonner";

export default function WiningAnimation({winner, onRestart, onBack}) {
  const [show, setShow] = useState(false);
  const [split, setSplit] = useState(false);
  const navigate = useNavigate();
  const { playersCategory } = useCategory();
  const {Score} = usePlayerMoves();
  const {width, height} = useWindowSize();
  const {isLucky} = usePlayerMoves();

  if (isLucky) toast.success('You just hit a 1 in 168 chance win. Letss Goo 🤗🤗🤗')
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col gap-10 items-center justify-center bg-black" style={{opacity: show ? 0.7 : 0, transition: "opacity 1s ease-in-out 0.5s"}}>
      {isLucky && <ReactConfetti width={width} height={height} />}
      <h1 className={`text-white text-4xl sm:text-6xl md:text-8xl font-bold opacity-0 transform scale-90 transition-all duration-3000 ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        {`Team ${playersCategory[winner]} Wins!`}
        {`\t${Score[1]} - ${Score[2]}`}
      </h1>
      <AnimatePresence>
        {!split ? (
        <motion.div className='flex gap-10'>
            <motion.button  className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#000] px-8 py-4 text-xl font-bold rounded-xl shadow-md transition-all" key="restart" onClick={() => {buttonSound.play();setSplit(true)}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.1 }}>
                Play Again
            </motion.button>
            <motion.button  className=" bg-[#d6b99e] hover:bg-[#bbada0] text-[#000] px-8 py-4 text-xl font-bold rounded-xl shadow-md transition-all" key="exit" onClick={() => {buttonSound.play();onBack();navigate('/')}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.1 }}>
                Exit
            </motion.button>
        </motion.div>
        ) : (
            <motion.div className="flex flex-col space-y-4" key="options" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}>
              <motion.button className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#000] px-8 py-4 text-xl font-bold rounded-xl shadow-md transition-all" onClick={()=>{buttonSound.play();onRestart(false)}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Restart with Same Category
              </motion.button>
              <motion.button className="bg-[#d6b99e] hover:bg-[#bbada0] text-[#000] px-8 py-4 text-xl font-bold rounded-xl shadow-md transition-all" onClick={()=>{buttonSound.play();onRestart(true)}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Restart with Different Category
              </motion.button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}