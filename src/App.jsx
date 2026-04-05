import { useState } from "react"
import Stars from "./Stars"
import SecretCode from "./SecretCode"
import Countdown from "./Countdown"
import Envelope from "./Envelope"
import LoveMeter from "./LoveMeter"
import StayWithMe from "./StayWithMe"
import FinalPage from "./FinalPage"
import Music from "./Music"
import Balloons from "./Balloons"
import Cake from "./Cake"
import MusicManager from "./MusicManager"



function App() {

const [page, setPage] = useState(0)

return (

<div className="min-h-screen text-white relative">

{/* Stars background */}
<Stars currentPage={page} />
<Music />

{/* Pages */}
<main className="relative z-10 h-screen w-full flex items-center justify-center">
{page === 0 && <Countdown onNext={() => setPage(1)} />}
{page === 1 && <SecretCode onNext={() => setPage(2)} />}
{page === 2 && <Envelope onNext={() => setPage(3)} />}
{page === 3 && <Balloons onNext={() => setPage(4)} />}
{page === 4 && <LoveMeter onNext={() => setPage(5)} />}
{page === 5 && <Cake onNext={() => setPage(6)} />}
{page === 6 && <StayWithMe onNext={() => setPage(7)} />}
{page === 7 && <FinalPage />}
</main>
</div>

)

}

export default App