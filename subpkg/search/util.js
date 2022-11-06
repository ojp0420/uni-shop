export const addSearchHistory = ({
	searchHistory,
	kw
}) => {
	const isRepeat = searchHistory.indexOf(kw)
	if (isRepeat !== -1) {
		searchHistory.splice(isRepeat, 1)
	}
	searchHistory.unshift(kw)
	uni.setStorageSync('searchHistory',JSON.stringify(searchHistory) || "[]")
	return searchHistory
}
