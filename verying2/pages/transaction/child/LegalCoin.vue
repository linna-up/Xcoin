<template>
	<view class="LegalCoin">
		<manipulate @activeUpdate="activeUpdate" :cny="cny"></manipulate>
		<LegalBuy v-if="activeIndex===0" :list="list" :AllList="AllList"></LegalBuy>
		<LegaSell :list="list" :AllList="AllList" v-else></LegaSell>
	</view>
</template>

<script>
	import manipulate from './manipulate.vue'
	import LegalBuy from './LeagalBuy.vue'
	import LegaSell from './LeagalSell.vue'
	export default {
		name: 'LegalCoin',
		props: {
			type: null,
			AllList: {
				type: Array,
				default: () => []
			},
			cny:""
		},
		data() {
			return {
				activeIndex: 0,
				coinType: 0,
				list: {
					coinType: 0,
					current: 0
				}
			}
		},
		components: {
			manipulate,
			LegalBuy,
			LegaSell
		},
		methods: {
			activeUpdate(index) {
				this.activeIndex = index;
				this.list.current = index;
				this.$emit("TranType", index);
			}
		},
		watch: {
			/* type(val) {
				if(val === 0) {
					this.coinType = 0
				}else if(val === 1) {
					this.coinType =  1
				}
			} */
			type(val) {
				if (val === 0) {
					this.list.coinType = 0
				} else if (val === 1) {
					this.list.coinType = 1
				}
			}
		}
	}
</script>

<style scoped>
	.LegalCoin {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
