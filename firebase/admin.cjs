import {getDownloadURL, ref} from 'firebase/storage'
import {storage} from './config.cjs'
const admin = require("firebase-admin");

const serviceAccount = require("C:\\Users\\79117\\admin-config.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: 'musicstream-react.appspot.com'
});

const bucket = admin.storage().bucket();

export const getTracksFromStorage = async (uid) => {
	const result = []
	const [files] = await bucket.getFiles({ prefix: `users/${uid}` })

	files.forEach(file => {
		const fileRef = ref(storage, `users/${uid}/${file.name}`)
		getDownloadURL(fileRef).then(res => result.push(res.toString()))
	})

	return result
}