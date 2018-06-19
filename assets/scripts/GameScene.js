// let utils = require('utils');
cc.Class({
    extends: cc.Component,

    onLoad:function () {
		this.addBG();
		// this.initBounds();
		game.eventManager.on(constants.Event.CastBall, this.onCastBallEvent.bind(this));

		let BallPool = require('BallPool');
		game.ballPool = new BallPool();
		game.ballPool.init(this.node.getChildByName('BallTemplate'));
    },

	addBG: function(){
		let node = this.node.getChildByName('bg');
    	node.setContentSize(this.node.width, this.node.height);
    	node.parent = this.node;
		let graphics = node.addComponent(cc.Graphics);
		graphics.rect(0, 0, this.node.width, this.node.height);
		graphics.fillColor = cc.color(55, 55, 155);
		graphics.fill();
	},

	onCastBallEvent: function(castData){
		const speed = constants.CastImpulse;
		let impulse = cc.v2(speed * castData.dir.x, speed * castData.dir.y);
		let ball = game.ballPool.get();
		ball.setPosition(ball.parent.convertToNodeSpaceAR(castData.ptStart));
		ball.body.applyLinearImpulse(impulse, castData.ptEnd);
	},
});
