import { createContext, useContext, useRef } from "react"

const MusicContext = createContext()

export function MusicProvider({ children }) {

const bgMusicRef = useRef(null)

const pauseBackground = () => {
if(bgMusicRef.current){
bgMusicRef.current.pause()
}
}

const resumeBackground = () => {
if(bgMusicRef.current){
bgMusicRef.current.play().catch(()=>{})
}
}

return (
<MusicContext.Provider value={{
bgMusicRef,
pauseBackground,
resumeBackground
}}>
{children}
</MusicContext.Provider>
)

}

export const useMusic = () => useContext(MusicContext)