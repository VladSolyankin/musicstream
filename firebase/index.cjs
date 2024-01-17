import {db, storage} from './config.cjs'
import {addDoc, collection, doc, setDoc, getDocs} from 'firebase/firestore'
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

export const addNewPlaylist = async (uid, title, imagePath) => {

    const newPlaylist = {
        id: nanoid(),
        title: title,
        imagePath: imagePath
    }

    await addDoc(collection(db, `users/${uid}/playlists`), newPlaylist)
}

export const getUserPlaylists = async (uid) => {
    let userPlaylists = []
    const userDocs = await getDocs(collection(db, `users/${uid}/playlists`))
    userDocs.forEach(playlist => {
        userPlaylists = [...userPlaylists, playlist.data()]
    })

    return userPlaylists
}

export const getStorageImage = async (path) => {
    const imageRef = ref(storage, path)

    return await getDownloadURL(imageRef)
}
