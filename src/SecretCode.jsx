import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

function SecretCode({ onNext }) {

const [code, setCode] = useState("")
const [error, setError] = useState("")

const checkCode = () => {

if(code === "07022026"){
onNext()
}else{
setError("Wrong Date ❤️ Try again")
}

}

useEffect(()=>{

confetti({
particleCount: 100,
spread: 100,
origin: { y: 0.6 }
})

},[])

return (

<div className="h-full flex flex-col items-center justify-center text-center px-6">

<motion.h1
initial={{opacity:0, y:40}}
animate={{opacity:1, y:0}}
className="text-3xl text-pink-400 mb-6"
>

The day we first met... 💖

</motion.h1>

<input
type="text"
placeholder="Hint: DDMMYYYY 💖"
value={code}
onChange={(e)=>setCode(e.target.value)}
className="mt-4 px-6 py-3 rounded-full text-center bg-white/90 backdrop-blur-md text-gray-800 shadow-xl border border-pink-200 outline-none focus:ring-2 focus:ring-pink-400"
/>

<button
onClick={checkCode}
className="mt-4 px-6 py-2 bg-pink-500 rounded-full"
>

Unlock 💖

</button>

{error && (

<p className="mt-3 text-red-400">
{error}
</p>

)}

</div>

)

}

export default SecretCode