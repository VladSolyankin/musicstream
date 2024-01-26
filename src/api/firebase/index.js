import {db, storage} from './config.js'
import {addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where} from 'firebase/firestore'
import {getDownloadURL, ref} from 'firebase/storage'


export const addNewUser = async (uid, email) => {
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
        updateDoc(doc.ref, { tracks: arrayUnion({trackId: trackId, preview_url: playlistPreview}) })
    })
}

export const addLikedUserTrack = async (uid, trackId) => {
    const userDocRef = doc(db, `users/${uid}`)
    const userDoc = await getDoc(userDocRef)
    const userLikedTracks = userDoc.data().likedTracks
    if (!userLikedTracks.includes(trackId)) {
        await updateDoc(userDocRef, { likedTracks: [...userLikedTracks, trackId] })
    }
    else {
        console.log("Трек уже добавлен")
    }
}

export const deletePlaylistTrack = async (uid, playlistId, trackId) => {
    const q = query(collection(db, `users/${uid}/playlists`), where('id', '==', playlistId))

    const deletePlaylist = await getDocs(q)

    deletePlaylist.forEach( playlist => {
        const playlistData = playlist.data()
        if (playlist && playlistData) {
            let playlistTracks = playlistData.tracks
            const updatedTracks = playlistTracks.filter(track => track.trackId !== trackId)

            const playlistDoc = doc(db, `users/${uid}/playlists/${playlist.id}`)
            updateDoc(playlistDoc, {tracks: updatedTracks})
        }
    })
}

export const deleteLikedTrack = async (uid, trackId) => {
    const userRef = doc(db, `users/${uid}`)
    const userDoc = await getDoc(userRef)
    const userLikedTracks = userDoc.data().likedTracks || console.log(new Error("No tracks found"))

    await updateDoc(userRef, { likedTracks: userLikedTracks.filter(id => id !== trackId) })
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

export const getUserLikedTracks = async (uid) => {
    const userDoc = await getDoc(doc(db, `users/${uid}`))
    return userDoc.data().likedTracks
}

export const getStorageImage = async (path) => {
    const imageRef = ref(storage, path)

    return await getDownloadURL(imageRef)
}