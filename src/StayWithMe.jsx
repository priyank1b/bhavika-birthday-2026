import { useState } from "react"
import { motion } from "framer-motion"

function StayWithMe({ onNext }) {

const [position, setPosition] = useState({ x: 0, y: 0 })

const moveNo = () => {

const x = Math.random() * window.innerWidth - window.innerWidth / 2
const y = Math.random() * window.innerHeight - window.innerHeight / 2

setPosition({ x, y })

}

return (

<div className="h-full flex flex-col items-center justify-center text-center relative overflow-hidden">

<motion.h1
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
className="text-3xl text-pink-400 mb-10"
>

Bhavika ❤️  
Will you always stay with me?

</motion.h1>

<div className="flex gap-6">

<button
onClick={onNext}
className="px-6 py-2 bg-pink-500 rounded-full"
>

Yes 💖

</button>

<motion.button
onMouseEnter={moveNo}
onClick={moveNo}
animate={{
x: position.x,
y: position.y
}}
transition={{ type: "spring", stiffness: 120 }}
className="px-6 py-2 bg-gray-600 rounded-full absolute"
>

No 😜

</motion.button>

</div>

</div>

)

}

export default StayWithMe