import {useEffect, useRef} from "react";
import {getStorageImage} from "../../firebase/index.cjs";

export const useFirebaseStorage = (fileName) => {
	const url = useRef("")

	useEffect(() => {
		const getImageUrl = async () => {
			url.current = await getStorageImage(fileName)
		}
		getImageUrl().then(() => console.log(`${url.current} fetched`)).catch(err => console.log(err.message))

	}, [fileName])

	return url.current

}