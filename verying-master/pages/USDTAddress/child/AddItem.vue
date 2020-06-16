<template>
	<view class="item">
		<view class="item_one">
			<view>
				<image src="../../../static/img/home/convenience.png"></image>
			</view>
		</view>
		<view class="item_two">
			<view class="item_two_top">{{list.address}}</view>
			<view class="item_two_btm">{{list.label}}</view>
		</view>
		<view class="item_three">
			<view>{{list.address_type}}</view>
		</view>
		<view class="item_foure" @click.stop="remove">
			<image src="../../../static/img/information/more.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"AddItem",
		props: {
			list:{}
		},
		methods: {
			remove() {
				this.$emit("remove",this.list.id);
			}
		}
	}
</script>

<style scoped>
	.item {
		width:90% ;
		height: 70px;
		margin: 0 auto;
		margin-bottom: 8px;
		padding: 5px;
		display: flex;
		
	}
	.item_one {
		width: 20px;
		height: 70px;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}
	.item_one>view>image {
		width: 15px;
		height: 15px;
	}
	.item_one>view {
		width: 40px;
		height: 30px;
	}
	.item_two{
		flex: 1;
		overflow: hidden;
		height: 60px;
	}
	.item_two_top {
		font-size: 16px;
	}
	.item_two_btm {
		font-size: 14px;
		color:#9AA4A8 ;
	}
	.item_three{
		width: 80px;
		height: 60px;
		display: flex;
		align-items: flex-start;
		justify-content: flex-end;
	}
	.item_three>view {
		width: 60px;
		font-size: 12px;
		height:14px;
		color:#0966BF ;
		background-color:#F6F5F1 ;
		text-align: center;
		line-height: 14px;
	}
	.item_foure {
		width: 30px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.item_foure>image{
		width: 30px;
		height: 30px;
	}
</style>
