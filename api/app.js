import request from "@/utils/request.js"


export const reqSwiperdata = () => request({
	url: '/home/swiperdata'
})

export const reqCatitems = () => request({
	url: "/home/catitems"
})

export const reqFloorData = () => request({
	url: "/home/floordata"
})

export const reqCateGories = () => request({
	url: "/categories"
})

export const reqQsearch = (data) => request({
	url: "/goods/qsearch",
	data
})


export const reqGoodsList = (data) => request({
	url: "/goods/search",
	data
})

export const reqGoodsDetail = (data) => request({
	url: "/goods/detail",
	data
})

export const userLogin = (data) => request({
	url: "/users/wxlogin",
	data
})
