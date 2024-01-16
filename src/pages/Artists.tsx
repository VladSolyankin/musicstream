import ArtistList from "../components/Artists/ArtistList.tsx";
import PageLayout from "../components/Layout/PageLayout.tsx";

const Artists = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <PageLayout>
                <ArtistList/>
            </PageLayout>
        </div>
    );
};

export default Artists;