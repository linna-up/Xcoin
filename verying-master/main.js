import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'

// VueI18n
Vue.use(VueI18n)
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)

Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
const i18n = new VueI18n({
	// 默认语言
	locale: 'zh-CN',
	// 引入语言文件
	messages: {
		'zh-CN': require('./commonjs/zh-CN.js').lang,
		'en-US': require('./commonjs/en-US.js').lang
	}
})

// VueI18n
// **代码 "Vue.prototype._i18n = i18n" 务必放在上述代码的下方
Vue.prototype._i18n = i18n

App.mpType = 'app'

const app = new Vue({
	i18n,
	...App
})
app.$mount()
