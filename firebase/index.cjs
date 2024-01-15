import { db } from './config.cjs'
import { addDoc, setDoc, doc, collection, arrayUnion } from 'firebase/firestore'
import { nanoid } from 'nanoid'


export const addNewUser = async (uid, email) => {

    await addDoc(collection(db, `users`), {uid})

    const newUser = {
        likedTracks: [],
        email: email
    }

    // addDoc(ref, path: string, pathSegments: string[])
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