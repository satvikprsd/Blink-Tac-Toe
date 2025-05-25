import React from 'react'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { XIcon } from 'lucide-react';
import { buttonSound } from './utils/sounds';

const About = ({openAbout, setOpenAbout}) => {
  return (
        <Dialog open={openAbout}>
        <DialogContent className='flex flex-col pt-3 px-0 w-md focus:outline-none focus:ring-0' onInteractOutside={()=> setOpenAbout(false)}>
            <div className='w-full flex items-center gap-3'>
                <div className='w-full flex-1 text-center font-bold'>
                    <DialogTitle><h2 className="text-xl font-bold">About Me</h2></DialogTitle>
                </div>
                <XIcon onClick={()=>{buttonSound.play();setOpenAbout(false)}} className="absolute right-2 hover:cursor-pointer"/>  
            </div>
            <hr className="border-t-2 p-0"/>
            <div className='w-full flex flex-col gap-3 justify-center items-center'>
                <img className='w-100 rounded-full' src='https://media.licdn.com/dms/image/v2/D5603AQGkQAbUQWMrvw/profile-displayphoto-shrink_400_400/B56ZQzIDaGH0Ag-/0/1736024537153?e=1753920000&v=beta&t=yh2qK84-Qti19W-lHrMQ9bug7GGpt4J7_ZddFf4gsfQ' />
                <h1 className='font-bold text-2xl'>Satvik Prasad</h1>
                <div className="text-center px-4 space-y-4">
                    Passionate about technology with expertise in JavaScript, Python, and Robotics, recognized through various awards. Solved 200+ LeetCode problems, earning 2 medals, and constantly explore new technologies to solve real-world problems creatively.
                </div>
                {/* I downloaded Svgs from online. Did not edit it myself */}
                <div className="w-[90%] h-[100%] bg-[#d8cfbc] overflow-hidden rounded-2xl flex boxanimation min-h-[50px]">
                    <a onClick={()=>buttonSound.play()} href="https://www.linkedin.com/in/satvik-prasad-5218b9271/" className="w-1/3 h-full rounded-[16px] flex items-center justify-center overflow-hidden transition duration-300 min-h-[50px] hover:bg-[#00acee]">
                        <svg className="w-[17px] fill-white" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>
                    </a>
                    
                    <a onClick={()=>buttonSound.play()} href="https://github.com/satvikprsd" className="w-1/3 h-full rounded-[16px] flex items-center justify-center overflow-hidden transition duration-300 min-h-[50px] hover:bg-[#000]">
                        <svg className="w-[17px] fill-white" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.39 0-.19-.01-.84-.01-1.54-2.01.44-2.43-.48-2.58-.92-.09-.23-.49-.92-.84-1.11-.29-.16-.7-.56-.01-.57.65-.01 1.11.61 1.26.87.73 1.23 1.92.88 2.4.67.07-.53.28-.88.5-1.08-1.77-.2-3.63-.89-3.63-3.96 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.84.63-.18 1.31-.27 2-.27s1.37.09 2 .27c1.53-1.06 2.2-.84 2.2-.84.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.86 3.76-3.63 3.96.29.25.55.74.55 1.49 0 1.08-.01 1.95-.01 2.21 0 .22.15.46.55.39C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/></svg>
                    </a>  

                    <a onClick={()=>buttonSound.play()} href="https://leetcode.com/u/Igris78" className="w-1/3 h-full rounded-[16px] flex items-center justify-center overflow-hidden transition duration-300 min-h-[50px] hover:bg-[#eca646]">
                        <svg className="w-[20px] fill-white"  xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 32 32" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"/><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/><g id="SVGRepo_iconCarrier"> <path d="M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052zM27.749 17.349h-13.531c-0.932 0-1.692 0.801-1.692 1.791 0 0.991 0.76 1.797 1.692 1.797h13.531c0.933 0 1.693-0.807 1.693-1.797 0-0.989-0.76-1.791-1.693-1.791z"/></g></svg>
                    </a>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default About