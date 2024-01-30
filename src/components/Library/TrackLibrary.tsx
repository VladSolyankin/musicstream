import {Button} from "antd";
import {Add, DownloadOutlined} from "@mui/icons-material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {addStorageTrack, deleteStorageTrack, downloadAllStorageTracks, getAllTracks} from "@firebase/index.js";
import AddNewTrackDialog from "../UI/AddNewTrackDialog";
import {RxCrossCircled} from "react-icons/rx";

const TrackLibrary = () => {
    const [userStorageTracks, setUserStorageTracks] = useState<Array<{name: string, src: string}>>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        const fetchUrls = async () => {
            await getAllTracks().then(res => {
                setUserStorageTracks(() => res)
            })
        }
        fetchUrls()
    }, [])

    const onAddNewTrack = async () => {
        setIsDialogOpen(false)
        if (selectedFile) {
            await addStorageTrack(selectedFile)
        }
        else {
            console.warn("No file selected")
        }
    }

    const onTrackLoaded = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setSelectedFile(file);
        }
    }

    const onDeleteStorageTrack = async (trackName: string) => {
        if (trackName.length) {
            await deleteStorageTrack(trackName)
            setUserStorageTracks(userStorageTracks.filter(elem => elem.name !== trackName))
        }
        else {
            console.warn("Track not deleted")
        }
    }

    const onPlayClick = async () => {

    }

    return (
        <div className="min-h-screen flex flex-col mx-auto w-[100dvw] max-w-6xl mt-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-white text-4xl">Библиотека треков</h2>
                </div>
                <div className="flex flex-center items-center gap-5">
                    <Button className="border-white flex items-center" type="primary" shape="default" icon={<DownloadOutlined />} size="large" onClick={() => downloadAllStorageTracks()}>Скачать всё</Button>
                    <Button className="border-white flex items-center" type="primary" shape="default" icon={<Add />} size="large" onClick={() => setIsDialogOpen(true)}>Новый трек</Button>
                </div>
            </div>
            <div className="flex flex-col justify-between mt-10 gap-10">
                {
                    userStorageTracks.map((track, index) => (
                        <div key={nanoid()} className="flex text-center justify-between items-center gap-20 text-white text-2xl border-2 p-5 bg-gray-12">
                            <span className="font-bold basis-1/12">{index + 1}.</span>
                            <span className="font-jost basis-2/6  max-w-[200px] break-all">{track.name}</span>
                            <audio src={track.src} controls className="basis-3/6 min-w-[200px]" onPlay={() => onPlayClick}></audio>
                            <button onClick={() => onDeleteStorageTrack(track.name)}>
                                <RxCrossCircled className="basis-1/12 w-10 h-10 text-[#FF0000]"/>
                            </button>
                        </div>
                    ))
                }
            </div>
            <AddNewTrackDialog isOpen={isDialogOpen} onClose={onAddNewTrack} onTrackLoaded={e => onTrackLoaded(e)}/>
        </div>
    );
};

export default TrackLibrary;