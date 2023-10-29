
const SongVariationsCards = () => {
    return (
        <div className="flex justify-between items-center max-w-5xl mx-auto my-10">
            <div className="card h-56 w-48 rounded-xl bg-gray-12">
                <img src="src/assets/new_hits.png" alt="" className="rounded-xl h-56 w-48 object-cover" />
                <span className="absolute ">Новые треки</span>
            </div>
            <div className="card h-56 w-48 rounded-xl bg-gray-12">
                <img src="src/assets/trending.png" alt="" className="rounded-xl"/>
                <span>Вечные хиты</span>
            </div>
            <div className="card h-56 w-48 rounded-xl bg-gray-12">
                <img src="src/assets/top_songs.png" alt="" className="rounded-xl"/>
                <span></span>
            </div>
        </div>
    );
};

export default SongVariationsCards;