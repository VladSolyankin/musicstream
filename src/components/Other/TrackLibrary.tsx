import {Button} from "antd";
import {Add, DownloadOutlined} from "@mui/icons-material";
import {useFirebaseStorage} from "../../hooks/hooks";

const TrackLibrary = () => {
    console.log(useFirebaseStorage())
    return (
        <div className="min-h-screen flex flex-col mx-auto w-[100dvw] max-w-6xl mt-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-white text-4xl">Библиотека треков</h2>
                </div>
                <div className="flex flex-center items-center gap-5">
                    <Button className="border-white flex items-center" type="primary" shape="default" icon={<DownloadOutlined />} size="large">Скачать всё</Button>
                    <Button className="border-white flex items-center" type="primary" shape="default" icon={<Add />} size="large">Новый трек</Button>
                </div>
            </div>
            <div className="flex flex-col items-center justify-between">
                <audio src=""></audio>
            </div>
        </div>
    );
};

export default TrackLibrary;