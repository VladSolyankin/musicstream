import {db, storage} from './config.cjs'
import {addDoc, collection, doc, setDoc, getDocs, updateDoc, arrayUnion, query, where} from 'firebase/firestore'
import {getDownloadURL, ref} from 'firebase/storage'
import {nanoid} from 'nanoid'


export const addNewUser = async (uid, email) => {

    await addDoc(collection(db, `users`), {uid})

    const newUser = {
        likedTracks: [],
        email: email
    }

    await addDoc(collection(doc(db, "users", uid), "playlists"), {})
    await setDoc(doc(db, `users/${uid}`), newUser)
}

export const addNewPlaylist = async (uid, playlistId, title, imagePath) => {

    const newPlaylist = {
        id: playlistId,
        title: title,
        imagePath: imagePath,
        tracks: []
    }

    await addDoc(collection(db, `users/${uid}/playlists`), newPlaylist)
}

export const addNewPlaylistTrack = async (uid, playlistId, playlistPreview, trackId) => {

    const q =
        query(collection(db, `users/${uid}/playlists`),
        where('id', '==', playlistId))
    const getSelectedDoc = await getDocs(q)

    getSelectedDoc.forEach( (doc) => {
        updateDoc(doc.ref, { tracks: arrayUnion({trackIds: trackId, preview_url: playlistPreview}) })
    })

}

export const getUserPlaylists = async (uid) => {
    let userPlaylists = []
    const userDocs = await getDocs(collection(db, `users/${uid}/playlists`))
    userDocs.forEach(playlist => {
        userPlaylists = [...userPlaylists, playlist.data()]
    })

    return userPlaylists
}

export const getPlaylistTracks = async (uid, playlistId) => {
    let userPlaylistTrackIds = []
    const q =
        query(collection(db, `users/${uid}/playlists`),
            where('id', '==', playlistId))
    const getSelectedDoc = await getDocs(q)

    getSelectedDoc.forEach( (doc) => userPlaylistTrackIds = doc.data()["tracks"])

    return userPlaylistTrackIds
}

export const getStorageImage = async (path) => {
    const imageRef = ref(storage, path)

    return await getDownloadURL(imageRef)
}
