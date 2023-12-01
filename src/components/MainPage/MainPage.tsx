import StartPageHero from "./StartPageHero.tsx";
import SongVariationsCards from "./SongVariationsCards.tsx";
import Footer from "../Footer.tsx";
import Header from "./Header.tsx";
import Carousel from "./Carousel.tsx";
const MainPage = () => {
    return (
        <div>
            <Header />
            <StartPageHero />
            <SongVariationsCards />
            <Carousel />
            <Footer />
        </div>
    );
};

export default MainPage;