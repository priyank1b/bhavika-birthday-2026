import { useEffect, useRef } from "react"

function MusicManager({ src }) {

const audioRef = useRef(null)

useEffect(()=>{

if(audioRef.current){
audioRef.current.play().catch(()=>{})
}

},[src])

return (
<audio ref={audioRef} src={src} loop />
)

}

export default MusicManager