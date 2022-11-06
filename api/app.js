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
	url:"/categories"
})
