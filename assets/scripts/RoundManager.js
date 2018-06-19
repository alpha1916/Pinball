let utils = require('utils');
let ItemPool = cc.Class({
	extends: cc.NodePool,
	init: function(type, template){
		this.template = template;
		this.template.active = false;
		this.type = type;
	},

	get:function() {
		let item = null;
		if(this.size() > 0)
			item = cc.NodePool.prototype.get.call(this);
		else
			item = this.create();
		item.parent = this.template.parent;
		return item;
	},

	create: function(){
		let item = cc.instantiate(this.template);
		item.type = this.type;
		item.blockComponent = item.getComponent('BlockItem');
		item.active = true;
		item.parent = this.template.parent;
		return item;
	},
});

let RoundManager = cc.Class({
    extends: cc.Component,

    onLoad () {
        this.node.getChildByName('btnAdd').on('click', this.onBtnAdd.bind(this));
        this.initPools();
        // this.trayList = [];
        this.items = [];
		game.eventManager.on(constants.Event.ItemBomb, this.onItemBomb.bind(this));
    },

   initPools () {
       this.pools = [
		   this.createPool(constants.ItemType.Circle, this.node.getChildByName('Circle')),
		   this.createPool(constants.ItemType.Square, this.node.getChildByName('Square')),
		   this.createPool(constants.ItemType.Triangle, this.node.getChildByName('Triangle')),
	   ];
   },
	
	createPool: function(type, template){
    	let pool = new ItemPool();
    	pool.init(type, template);
    	
    	return pool;
	},

	getItem: function(times){
		let type = utils.randomInt(0, 2);
		let pool = this.pools[type];
		let item = pool.get();
		item.blockComponent.setData(times);
		return item;
	},

	putItem: function(item){
		let pool = this.pools[item.type];
		pool.put(item);
	},

	getBlockTimes: function(){
		return utils.randomInt(3, 20);
	},

	newRound () {
		let list = [0, 1, 2, 3, 4, 5];
		let newCount = list.length - utils.randomInt(2, 5);
		// let tray = new cc.Node();
		// tray.setContentSize(600, 80);
		for(let i = 0; i < newCount; ++i){
			let idx = utils.randomInt(0, list.length - 1);
			list.splice(idx, 1);
		}
		cc.log('count', newCount);

		let width = this.node.width;
		let height = 100;
		let itemWidth = 64;
		let padding = 80;
		let count = 6;
		let spacing = (width - padding * 2 - itemWidth * count) / (count - 1);
		let stride = spacing + itemWidth;
		let ox = -width / 2 + padding + itemWidth / 2;
		for(let i = 0; i < list.length; ++i){
			let idx = list[i];
			let item = this.getItem(this.getBlockTimes());
			// item.x = -tray.width / 2 + 80 + 80 * idx;
			// item.y = tray.height / 2;
			item.x = ox + stride * idx;
			item.y = height / 2;
			item.parent = this.node;
			this.items.push(item);
		}
		// tray.parent = this.node;

		// tray.setPosition(0, 0);
		// this.trayList.unshift(tray);
		for(let i = 0; i < this.items.length; ++i){
			let item = this.items[i];
			item.runAction(cc.moveBy(0.2, 0, height));
		}
		// for(let i = 0; i < this.trayList.length; ++i){
		// 	let tray = this.trayList[i];
		// 	// tray.runAction(cc.moveTo(0.2, tray.x, tray.y + tray.height));
		// 	// tray.runAction(cc.moveTo(0.2, tray.x, tray.y + tray.height));
		// 	tray.y += tray.height;
		// 	cc.log(tray.y);
		// }
	},

	// reset: function(){
	//
	// },

	onItemBomb: function(item){
		this.items.removeElement(item);
		this.putItem(item);
		// item.parent = null;
	},

    onBtnAdd () {
		this.newRound();
    },
});
module.exports = RoundManager;
