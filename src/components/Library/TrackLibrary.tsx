import {Button} from "antd";
import {Add, DownloadOutlined} from "@mui/icons-material";
import React, {ChangeEvent, useEffect, useState} from "react";
import {nanoid} from "nanoid";
import {addStorageTrack, deleteStorageTrack, downloadAllStorageTracks, getAllTracks} from "@firebase/index.js";
import AddNewTrackDialog from "../UI/AddNewTrackDialog";
import {RxCrossCircled} from "react-icons/rx";
import {MdPlayCircleFilled} from "react-icons/md";
import {useMusicPlayerStore} from "@store";

const TrackLibrary = () => {
    const [userStorageTracks, setUserStorageTracks] = useState<Array<{name: string, src: string}>>([])
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const {
        setPlayingTrack,
        setPlayerVisible,
        setPlayingTrackPreview,
        setTracksQueue,
        isTrackPlaying,
        setIsTrackPlaying,
        setPlayingTrackIndex,
        isPlayerVisible
    } = useMusicPlayerStore();

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

    const onPlayClick = async (track, index) => {
        setIsTrackPlaying(!isTrackPlaying)
        setPlayerVisible(true)
        setPlayingTrack(track)
        setTracksQueue(userStorageTracks)
        setPlayingTrackIndex(index)
        setPlayingTrackPreview(track.src)
    }

    return (
        <div className="min-h-screen flex flex-col mx-auto w-[100dvw] max-w-4xl mt-10">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-white text-4xl">Библиотека треков</h2>
                </div>
                <div className="flex flex-center items-center gap-5">
                    <Button className="border-white flex items-center" type="primary" shape="default" icon={<DownloadOutlined />} size="large" onClick={() => downloadAllStorageTracks()}>Скачать источники</Button>
                    <Button className="border-white flex items-center" type="primary" shape="default" icon={<Add />} size="large" onClick={() => setIsDialogOpen(true)}>Новый трек</Button>
                </div>
            </div>
            <div className="flex flex-col justify-between mt-10 gap-10 my-12">
                {
                    userStorageTracks.map((track, index) => (
                        <div key={nanoid()} className="flex text-center justify-between items-center gap-20 text-white text-2xl border-2 p-5 bg-gray-12">
                            <span className="font-bold basis-1/12">{index + 1}.</span>
                            <span className="font-jost basis-2/6  max-w-[200px]">{track.name}</span>
                            <button onClick={() => onPlayClick(track, index)}>
                                <MdPlayCircleFilled className="w-12 h-12 basis-3/6" />
                            </button>
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