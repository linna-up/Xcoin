<template>
	<view class="mask" >
		<view class="boxs">
			<view class="title">你确认退本吗吗?</view>
			<view class="box">
				<view class="btm" @click="tellShow">取消</view>
				<view class="btms" @click="tellQd">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "ContranMask",
		methods: {
			tellShow() {
				console.log("1111");
				this.$emit('TellSuper','no')
			},
			tellQd() {
				console.log("222");
				this.$emit('TellSuper','yes')
			}
		}
	}
</script>

<style scoped>
	.mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(127, 127, 127, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.title {
		width:100%;
		height: 40px;
		background-color: #FFFFFF;
		text-align: center;
		line-height: 40px;
	}
	.boxs {
		width:80%;
		height: 100px;
		background-color: #FFFEFE;
	}
	.box {
		width:100%;
		height: 60px;
		border-radius: 6px;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.btm {
		width: 45%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		background-color:#BBC7D3 ;
		color: #FFFEFE;
		border-radius: 3px;
		
	}
	.btms {
		width: 45%;
		height: 45px;
		line-height: 45px;
		text-align: center;
		background-color:#0066A1 ;
		color: #FFFEFE;
		border-radius: 3px;
	}
</style>
