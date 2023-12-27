import Header from "../Header";
import Footer from "../Footer";
import CreatorsList from "./CreatorsList";

const Creators = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <CreatorsList />
            <Footer />
        </div>
    );
};

export default Creators;