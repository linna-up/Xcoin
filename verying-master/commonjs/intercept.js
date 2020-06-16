function login() {
	let token;
	token = getApp().globalData.session_id;
	console.log(token);
	if (token === null || token === "" || token === undefined) {
		uni.showToast({
			title: '未登录,请登录',
			duration: 2000,
			icon: "none"
		})
		setTimeout(() => {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}, 2000)
	} else if (token != null || token != "" || token != undefined) {
		setTimeout(() => {
			uni.switchTab({
				url: '/pages/index/index'
			})
		}, 1000)
	}
}

export {
	login
}
