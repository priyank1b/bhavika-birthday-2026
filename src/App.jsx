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
import Distance from "./Distance" // New Component
import Gift from "./Gift"         // New Component

function App() {
  const [page, setPage] = useState(0)
  
  // THE GUARD: Change this to her actual birthday
  const birthdayDate = new Date("April 05, 2026 21:27:00").getTime();
  const now = new Date().getTime();
  const isBirthday = now >= birthdayDate;

  // This prevents her from skipping ahead via console/dev tools
  const protectedSetPage = (newPage) => {
    if (newPage > 0 && !isBirthday) {
      alert("Nice try, developer! Wait for the stars to align. ✨");
      setPage(0);
    } else {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen text-white relative bg-[#020617]">

      <Stars currentPage={page} />
      <Music />

      <main className="relative z-10 h-screen w-full flex items-center justify-center">
	  
	  {page === 0 && <Countdown onNext={() => protectedSetPage(1)} />}
	  
	  {isBirthday && (
          <>
	  
        {page === 1 && <SecretCode onNext={() => setPage(2)} />}
        {page === 2 && <Envelope onNext={() => setPage(3)} />}
        {page === 3 && <Balloons onNext={() => setPage(4)} />}
        {page === 4 && <LoveMeter onNext={() => setPage(5)} />}
        {page === 5 && <Cake onNext={() => setPage(6)} />}
        {page === 6 && <StayWithMe onNext={() => setPage(7)} />}
        
 
        {page === 7 && <Distance onNext={() => setPage(8)} />}
        {page === 8 && <Gift onNext={() => setPage(9)} />}
        

        {page === 9 && <FinalPage />}
		
		</>
        )}
      </main>
    </div>
  )
}

export default App