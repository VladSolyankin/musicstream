import Header from "./components/Header";
import "./css/App.css"
import StartPageHero from "./components/StartPageHero.tsx";
import SongVariationsCards from "./components/SongVariationsCards.tsx";

function App() {

  return (
    <div className="">
        <Header />
        <StartPageHero />
        <SongVariationsCards />
    </div>
  )
}

export default App
