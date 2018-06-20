cc.Class({
	extends: cc.Component,

	onLoad: function(){
		this.setData(999);
	},

	setData: function(count){
		this.updateCount(count);
		this.ptOriginal = this.node.getPosition();
		// cc.log(this.ptOriginal);
	},

	dither: function(){
		// let al = [];
		// // al.
		// // cc.moveBy()
		// let dither = 1;
		// let time = 0.05;
		// al.push(cc.moveBy(, ));
		// if(this.acting)
		// 	return;

		let node = this.node;
		// let pt = node.getPosition();
		let al = [];
		let strength = 4;
		let duration = 0.02;
		al.push(cc.moveBy(duration, cc.p(strength, 0)));
		al.push(cc.moveBy(duration, cc.p(-strength, 0)));
		al.push(cc.moveBy(duration, cc.p(0, strength * 0.625)));
		al.push(cc.moveBy(duration, cc.p(0, -strength * 0.625)));
		al.push(cc.moveBy(duration, cc.p(-strength, 0)));
		al.push(cc.moveBy(duration, cc.p(strength, 0)));
		al.push(cc.moveBy(duration, cc.p(0, -strength * 0.625)));
		al.push(cc.moveBy(duration, cc.p(0, strength * 0.625)));
		// al.push(cc.callFunc(function(){
		// 	cc.log(this.ptOriginal);
		// 	this.node.setPosition(this.ptOriginal);
		// 	// this.acting = false;
		// }.bind(this)));
		al.push(cc.callFunc(this.node.getPosition.bind(this.node, this.ptOriginal)));
		this.node.runAction(cc.sequence(al));
	},

	updateCount: function(count){
		this.count = count;
		if(this.count < 0)
			count = 0;
		this.node.getChildByName('lbCount').getComponent(cc.Label).string = count;
	},

	onPostSolve: function (contact, selfCollider, otherCollider) {
		otherCollider.body.gravityScale = constants.ReboundGravityScale;
		if(this.count == 1){
			game.eventManager.fireSync(constants.Event.ItemBomb, this.node);
			return;
		}
		this.updateCount(--this.count);
		this.dither();
	},


});