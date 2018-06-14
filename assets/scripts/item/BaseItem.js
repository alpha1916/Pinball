cc.Class({
	extends: cc.Component,

	onLoad: function(){
		this.setData(999);
	},

	setData: function(count){
		this.updateCount(count);
	},

	// hit: function(){
	// 	this.updateCount(--this.count);
	// 	this.dither();
	// },

	dither: function(){

	},

	updateCount: function(count){
		this.count = count;
		if(this.count < 0)
			count = 0;
		this.node.getChildByName('lbCount').getComponent(cc.Label).string = count;
	},

	onPreSolve: function (contact) {
		this.updateCount(--this.count);
		this.dither();
	},
});