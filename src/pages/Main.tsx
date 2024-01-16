import StartPageHero from "../components/MainPage/StartPageHero.tsx";
import SongVariationsCards from "../components/MainPage/SongVariationsCards.tsx";
import Carousel from "../components/MainPage/Carousel.tsx";
import PageLayout from "../components/Layout/PageLayout.tsx";

const Main = () => {
    return (
        <PageLayout>
            <StartPageHero />
            <SongVariationsCards />
            <Carousel />
        </PageLayout>
    );
};

export default Main;