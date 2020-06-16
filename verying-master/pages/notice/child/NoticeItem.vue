<template>
	<view class="noticeItem" @click="toNotice(list.id)">
		<view class="noticeItem_time">
			{{list.add_time}}
		</view>
		<view class="noticeItem_title">
			{{list.title}}
		</view>
		<view class="noticeItem_content">
			了解详情
			<view class="noticeItem_content_right" >
				<image src="../../../static/img/mine/right.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"NoticeItem",
		props: {
			list:{}
		},
		methods: {
			toNotice(id) {
				uni.navigateTo({
					url:'../../pages/NoticeDetails/NoticeDetails?id='+id
				})
			}
		}
	}
</script>

<style scoped>
	.noticeItem {
		width: 90%;
		height: 60px;
		margin: 0 auto;
		margin-top: 16px;
		background-color: #FFFFFF;
		padding-top: 8px;
		padding-bottom: 8px;
		position: relative;
	}
	.noticeItem_time {
		width: 100%;
		height: 16px;
		line-height: 16px;
		font-size: 12px;
		text-align: right;
		color: #4D4D4D;
		position: absolute;
		right: 20px;
	}
	.noticeItem_title {
		width: 100%;
		height: 30px;
		line-height: 30px;
		font-size: 18px;
		text-align: center;
		position: absolute;
		border-bottom: 1px solid #E9E9E9;
		top: 16px;
	}
	.noticeItem_content {
		width: 100%;
		height: 25px;
		line-height: 25px;
		font-size: 12px;
		text-align: center;
		position: absolute;
		top: 47px;
	}
	.noticeItem_content_right {
		float: right;
		padding-top: 3px;
		position: relative;
		right: 16px;
	}
	.noticeItem_content_right>image {
		width: 12px;
		height: 12px;
	}
</style>
