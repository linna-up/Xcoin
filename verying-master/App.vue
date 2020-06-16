<script>
	let language = null;
	import {api} from 'api/api.js'
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');//强制竖屏
			// #endif

			uni.getSystemInfo({
				success: function(res) {
					getApp().globalData.top = res.statusBarHeight; //获取状态栏的高度
					getApp().globalData.windowWidth = res.windowWidth;
					getApp().globalData.windowHeight = res.windowHeight;
					language = res.language;
				}
			});
		},
		onShow: function() {
			console.log('App Show');
			let _this = this;
			
			// 判断选择的语言
			console.log(language);
			if (language === "zh-CN") {
				_this.$i18n.locale = 'zh-CN';
			} else {
				_this.$i18n.locale = 'en-US';
			};
			/* _this.$i18n.locale = 'zh-CN'; */
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
		    i18n () {  
				return this.$t('message'); 
		    }  
		},
		globalData: {
			top: 0,
			windowWidth: 0,
			windowHeight: 0,
			session_id:"",
			uid:0,
			type:0
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	body {
		font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
	}
	
</style>





