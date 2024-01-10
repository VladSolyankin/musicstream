import StartPageHero from "./StartPageHero.tsx";
import SongVariationsCards from "./SongVariationsCards.tsx";
import Footer from "../Footer.tsx";
import Carousel from "./Carousel.tsx";
import Header from "../Header";

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