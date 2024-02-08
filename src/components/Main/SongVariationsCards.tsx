import {useNavigate} from "react-router-dom";

const SongVariationsCards = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center max-w-5xl mx-auto my-10 gap-20 md:flex-row md:gap-30">
            <div onClick={() => navigate('/tracks')} className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-new-tracks bg-no-repeat bg-cover bg-center shadow-white shadow-cardShadow hover:scale-110 transition-transform">
                <span className="text-lg text-white">Треки</span>
            </div>
            <div onClick={() => navigate('/creators')} className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-trending bg-no-repeat bg-cover bg-center shadow-white shadow-cardShadow hover:scale-110 transition-transform">
                <span className="text-lg text-white">Исполнители</span>
            </div>
            <div onClick={() => navigate('/my_music')} className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-top-songs bg-no-repeat bg-cover bg-center shadow-white shadow-cardShadow hover:scale-110 transition-transform">
                <span className="text-lg text-white">Моя музыка</span>
            </div>
        </div>
    );
};

export default SongVariationsCards;