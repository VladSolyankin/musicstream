import '../css/App.css'
const SongVariationsCards = () => {
    return (
        <div className="flex justify-between items-center max-w-4xl mx-auto my-10">
            <div className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-new-tracks bg-no-repeat bg-cover bg-center">
                <span>Новые треки</span>
            </div>
            <div className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-trending bg-no-repeat bg-cover bg-center">
                <span>Вечные хиты</span>
            </div>
            <div className="flex items-end justify-center p-10 text-center h-64 w-48 rounded-xl bg-gray-12 bg-top-songs bg-no-repeat bg-cover bg-center">
                <span>В тренде</span>
            </div>
        </div>
    );
};

export default SongVariationsCards;