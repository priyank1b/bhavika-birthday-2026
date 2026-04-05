import { motion } from "framer-motion"
import { useState, useEffect } from "react"

function Envelope({ onNext }) {

const [open, setOpen] = useState(false)
const [showLetter, setShowLetter] = useState(false)
const [text, setText] = useState("")
const [startTyping, setStartTyping] = useState(false)
const [showNext, setShowNext] = useState(false)

const fullText = `From the moment you came into my life,
everything started feeling magical.

Your smile brightens my days,
your voice calms my heart,
and your presence makes everything perfect.

Happy Birthday My Love 💖

Forever yours,
Priyank`

useEffect(() => {

if(startTyping){

let i = 0

const interval = setInterval(()=>{

setText(fullText.slice(0, i))

i++

if(i > fullText.length){
clearInterval(interval)
setShowNext(true)
}

},35)

return () => clearInterval(interval)

}

},[startTyping])


const handleOpen = () => {

if(open) return

setOpen(true)

setTimeout(()=>{
setShowLetter(true)
},600)

setTimeout(()=>{
setStartTyping(true)
},1000)

}

return (

<div className="h-full flex items-center justify-center">

<motion.div
onClick={handleOpen}
className="relative cursor-pointer"
initial={{ scale: 0.7 }}
animate={{ scale: open ? 1.15 : 0.8 }}
transition={{ duration: 0.8 }}
>

{/* Envelope Body */}

<div className="w-72 h-48 bg-gradient-to-r from-pink-400 to-pink-500 rounded-lg shadow-2xl relative"></div>

{/* Flap */}

<motion.div
className="absolute top-0 left-0 w-72 h-36 bg-pink-600 origin-top"
style={{
clipPath: "polygon(0 0, 100% 0, 50% 100%)"
}}
animate={{
rotateX: open ? 180 : 0
}}
transition={{ duration: 1 }}
/>

{/* Letter */}

{showLetter && (

<motion.div
className="absolute left-1/2 -translate-x-1/2 w-[85vw] max-w-md h-[70vh] rounded-xl shadow-xl p-6 overflow-hidden"
style={{
background: "linear-gradient(180deg, #fff5f7, #ffe4ec)",
fontFamily: "'Dancing Script', cursive",
boxShadow: "0 0 40px rgba(255,182,193,0.6)"
}}
initial={{ y: 0, opacity: 0 }}
animate={{
y: open ? "-40vh" : 0,
opacity: 1
}}
transition={{
duration: 1,
ease: "easeOut"
}}
>

<h2 className="text-center text-xl text-pink-600 font-semibold">
Dear Bhavika 💖
</h2>

<p className="text-md mt-4 text-gray-700 leading-relaxed whitespace-pre-line overflow-auto h-[80%]">
{text}
</p>

{showNext && (

<motion.button
onClick={(e)=>{
e.stopPropagation()
onNext && onNext()
}}
initial={{opacity:0, y:20}}
animate={{opacity:1, y:0}}
transition={{duration:0.6}}
className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition"
>

Continue 💖

</motion.button>

)}

</motion.div>

)}

</motion.div>

</div>

)

}

export default Envelope