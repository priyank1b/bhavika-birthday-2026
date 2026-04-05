import { useEffect } from "react"
import { useMusic } from "./MusicContext"

import romanticMusic from "./assets/the_mountain-love-481753.mp3"

function Music() {

const { bgMusicRef } = useMusic()

useEffect(() => {

const startMusic = () => {

bgMusicRef.current.volume = 0.3
bgMusicRef.current.play().catch(()=>{})

document.removeEventListener("click", startMusic)

}

document.addEventListener("click", startMusic)

}, [])

return (

<audio ref={bgMusicRef} loop>
<source src={romanticMusic} type="audio/mp3" />
</audio>

)

}

export default Music