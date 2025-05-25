import React, { createContext, useContext, useState } from "react";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [Mute, setMute] = useState(true);
    return (
        <AudioContext.Provider value={{ Mute, setMute }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);
