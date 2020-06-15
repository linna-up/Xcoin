const url = "http://www.oszgs.top/"

const api = {
	reg:url + "Main/Member/register",
	login:url + "Main/Member/dologin",//登录
	index:url + "Main/Member/index",//首页信息
	yzm_code:url+"Main/Ajax/get_yzm_code",
	info: url + "Main/Member/member_info",//获取用户信息
	node_rule: url +"Main/Member/node_rules",//节点规则说明
	apply_node: url +"Main/Member/apply_node",//申请节点
	reset_pwd: url + "Main/Member/editpass",//重置密码
	set_pay_pwd: url +"Main/Member/pay_password",//设置资金密码
	set_pay_code: url + "Main/Ajax/get_yzm_set_code",//修改资料验证码
	
	team_list: url + "Main/Member/fans_first",//直推列表 
	notice_list: url + "Main/Member/news",//公告列表
	notice_detail: url + "Main/Member/detail",//公告详情
	contract_info: url + "Main/Member/contract_info",//合约投资页面
	reg_code: url + "Main/Ajax/get_yzm_code",//注册手机号验证码
	applyinfo: url + "Main/Member/applyinfo",//提币
	add_address: url + "Main/Member/add_address",//添加usdt地址
	team: url + "Main/Member/team",//团队列表
	address_list: url + "Main/Member/address_list",//地址列表
	remove: url + "Main/Member/del_address",//删除地址
	apply_history_list: url + "Main/Member/apply_list",//提币历史记录
	history_detail: url + "Main/Member/apply_detail",//提币详情
	assets: url + "Main/Member/assets",//资产页面
	caiwu: url + "Main/Member/caiwu",//财务记录
	exchange: url + "Main/Member/exchangeuse",//x币可用到复投
	create: url + "Main/Member/invest",//创建合约
	createing: url + "Main/Member/contract_detail",//合约详情
	sxfbl: url + "Main/Member/apple_fee",//手续费比例
	get_xcoin_money: url + "Main/Member/get_xcoin_money",//领取收益
	to_quit: url + "Main/Member/to_quit",//保本清退
	qrCode: url + "Main/Member/get_usdt_qrcore",//充币页面
	share_qrcode: url + "Main/Member/share_qrcode",//邀请页面
	id_card: url + "Main/Member/idcard_check",//实名认证
	team_all: url + "Main/Member/my_team",//团队页面,
	team_detail: url + "Main/Member/team_list",//各等级人数
	indet: url + "Main/Crowd/crowd_list",//众筹列表
	add_crowd_funding: url + "Main/Crowd/add_crowd_funding",//购买众筹
	hangqin: url + "Main/Ajax/hangqin",//行情接口
	user_pay_list: url + "Main/Member/user_pay_list",//用户收款信息列表
	active: url + "/Main/Member/open_user_pay",//激活
	updata_pay_live: url+ "Main/Member/perfect",//修改收款方式
	top_list: url + "Main/Member/toplist",//全网排行榜
	superTeam: url + "/Main/Member/super_team",//超级节点
	up_super_node: url + "Main/Member/up_super_node",//给下级升svip
	node_money: url + "Main/Member/node_money",//节点金额
	lqlog: url + "Main/Member/lqlog",//领取记录
	message_add: url + "Main/Member/message_add",//问题反馈
	add_jiaoyi: url + "/Main/Order/add_jiaoyi",//一键发布
	jiao_yi_ting: url + "Main/Order/jiao_yi_ting",//交易厅
	confirm_jiaoyi: url + "/Main/Order/confirm_jiaoyi",//确认交易
	user_jiao_yi_list: url + "/Main/Order/user_jiao_yi_list",//承兑商列表
	cancel_jiaoyi: url + "Main/Order/cancel_jiaoyi",//取消交易
	user_order_list: url + "Main/Order/user_order_list",//订单列表
	cancel_order: url + "Main/Order/cancel_order",//取消订单
	get_order_info: url + "Main/Order/get_order_info",//交易订单详情
	pingzheng: url + "Main/Order/buy_jiaoyi",//上传付款凭证
	allow: url + "Main/Order/allow_buy",//操作交易放行
	up_check :url + "Main/Order/up_check",//申诉
	fhmoney_list: url + "Main/Member/fhmoney_list",//累计收益
	applyinfo: url + "Main/Order/applyinfo",//
	invest_list: url + "Main/Member/invest_list",//
	exchangejifen: url + "Main/Member/exchangejifen",//
}
export {
	api
}