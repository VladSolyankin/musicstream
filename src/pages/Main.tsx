import StartPageHero from "../components/Main/StartPageHero.tsx";
import SongVariationsCards from "../components/Main/SongVariationsCards.tsx";
import Carousel from "../components/Main/Carousel.tsx";
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