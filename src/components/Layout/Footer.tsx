
const Footer = () => {
    return (
        <footer className="flex justify-center items-center bg-gray-100 py-6 container mx-auto border-2 rounded-t-2xl border-white px-5 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center md:text-left">
                    <img className="w-64" src="src/assets/logo-transparent.png" alt="Musicstream logo transparent"/>
                    <p className="text-gray-600 text-center">Все права принадлежат компании <br/>"Моя компания"</p>
                </div>
                <div className="text-center md:text-left border-l-white border-2 px-10">
                    <h4 className="text-lg font-semibold mb-2 text-white">Контакты</h4>
                    <ul className="list-image-[url(https://cdn-icons-png.flaticon.com/16/5299/5299035.png)]">
                        <li>
                            <p className="text-gray-600">Email: example@work.ru</p>
                        </li>
                        <li>
                            <p className="text-gray-600">Телефон: 8 (999) 999 99 99</p>
                        </li>
                        <li>
                            <p className="text-gray-600">Viber/ICQ: нет</p>
                        </li>
                    </ul>
                </div>
                <div className="text-center md:text-left border-l-white border-2 px-5">
                    <h4 className="text-lg font-semibold mb-2 text-white">Адрес</h4>
                    <p className="text-gray-600">Московский пр-т, 1498,</p>
                    <p className="text-gray-600">Санкт-Петербург, 196128</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;