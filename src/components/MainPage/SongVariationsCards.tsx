const SongVariationsCards = () => {
    return (
        <div className="flex flex-col items-center max-w-5xl mx-auto my-10 gap-20 md:flex-row md:gap-30">
            <div className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-new-tracks bg-no-repeat bg-cover bg-center shadow-white shadow-cardShadow hover:scale-110 transition-transform">
                <span className="text-lg text-white">Новые треки</span>
            </div>
            <div className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-trending bg-no-repeat bg-cover bg-center shadow-white shadow-cardShadow hover:scale-110 transition-transform">
                <span className="text-lg text-white">Вечные хиты</span>
            </div>
            <div className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-top-songs bg-no-repeat bg-cover bg-center shadow-white shadow-cardShadow hover:scale-110 transition-transform">
                <span className="text-lg text-white">В тренде</span>
            </div>
        </div>
    );
};

export default SongVariationsCards;