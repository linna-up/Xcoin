<script>
	let language = null;
	import {api} from 'api/api.js'
	export default {
		onLaunch: function() {
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
			let _this = this;
			
			// 判断选择的语言
			if (language === "zh-CN") {
				_this.$i18n.locale = 'zh-CN';
			} else {
				_this.$i18n.locale = 'en-US';
			};
		},
		onHide: function() {
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





