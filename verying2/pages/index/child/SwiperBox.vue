<template>
	<view class="swiper_box">
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
		 :indicator-active-color="indexColor" :indicator-color="color">
			<swiper-item class="item" v-for="(item,index) in list" :key="index">
				<image :src="item.images"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		name: "SwiperBox",
		props: {
			list: {
				type: Array,
				default () {
					return [{
							"id": "0",
							"images": "../../../../../static/img/home/carousel.jpg"
						},
						{
							"id": "1",
							"images": "../../../../../static/img/home/carousel.jpg"
						},
						{
							"id": "2",
							"images": "../../../../../static/img/home/carousel.jpg"
						}
					]

				}
			}
		},
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 1500,
				indexColor: '#ffffff',
				color: 'rgba(96, 98, 122, .3)',
			}
		}
	}
</script>

<style scoped>
	.swiper_box {
		width: 100vw;
		height: 180px;
		display: flex;
		justify-content: center;
		align-content: center;
	}

	.swiper {
		width: 100%;
		height: 180px;
	}

	.item {
		width: 100%;
		height: 100%;
	}

	.item>image {
		width: 100%;
		height: 100%;
	}
</style>
