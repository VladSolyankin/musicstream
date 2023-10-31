import '../css/App.css'
import '../js/parallax.js'

const StartPageHero = () => {
    return (
        <div className="flex items-center justify-center">
            <img src="src/assets/mainpage_hero.png" alt="Headphones hero image"
                 className="rounded-xl object-cover mx-auto max-w-5xl duration-300 hover:scale-95"/>
        </div>
    );
};

export default StartPageHero;