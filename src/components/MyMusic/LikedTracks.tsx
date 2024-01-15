import LikedTrackList from "./LikedTrackList.tsx";

const LikedTracks = () => {
    return (
        <div className="flex flex-col justify-center items-center border-white min-h-32dvh min-w-full max-w-5xl mx-auto my-10 py-10 rounded-xl bg-gray-12 p-10">
            <div className="flex justify-start w-full">
                <div className="relative">
                    <img src="src/assets/liked.png" alt="Add new playlist button" className="w-8 h-8 mr-5"/>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">
                    Вам понравилось
                </h2>
            </div>
            <div className="flex flex-col">
                <LikedTrackList />
            </div>
        </div>
    );
};

export default LikedTracks;