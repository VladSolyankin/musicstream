export const signInWarning = {
	type: 'warning',
	description: 'Введённые данные неверны',
	message: 'Вход не произведён'
}
export const playlistTrackAddSuccess = {
	type: 'success',
	description: 'Обновлённый плейлист в "Моя музыка"',
	message: 'Плейлист добавлен'
}

export const userId = localStorage.getItem("currentUserId")