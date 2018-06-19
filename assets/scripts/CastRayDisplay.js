/**
 * Created by alpha on 2018/6/13.
 */
const CAST_OFFSET = 100;
cc.Class({
	extends: cc.Component,
	properties: {
		arrow: { default: null, type: cc.Node }
	},

	onLoad: function(){
		var ballTemplate = this.node.getChildByName('ball');
		this.balls = [ballTemplate];
		for(let i = 0; i < 9; ++i){
			let ball = cc.instantiate(ballTemplate);
			ball.parent = ballTemplate.parent;
			this.balls.push(ball);
		}

		this.ptStart = this.arrow.parent.convertToWorldSpaceAR(this.arrow.getPosition());
		this.ptStart = this.node.convertToNodeSpaceAR(this.ptStart);
	},

	getCastDirection: function(ptWorld){
		let pt = this.node.convertToNodeSpaceAR(ptWorld);
		let dir = cc.pNormalize(cc.pSub(pt, this.ptStart));
		return dir;
	},

	getCastData: function(ptWorld){
		let dir = this.getCastDirection(ptWorld);
		let pt = cc.v2();
		pt.x = this.ptStart.x +  CAST_OFFSET * dir.x;
		pt.y = this.ptStart.y + CAST_OFFSET * dir.y;
		let data = {
			dir: dir,
			ptStart: this.node.convertToWorldSpaceAR(pt),
			ptEnd: ptWorld
		};
		return data;
	},

	show: function(ptEnd){
		this.node.active = true;

		// ptEnd = this.node.convertToNodeSpaceAR(ptEnd);
		let emitBall = this.node.getChildByName('emitBall');
		let dir = this.getCastDirection(ptEnd);//cc.pNormalize(cc.pSub(ptEnd, this.ptStart));
		// cc.log('dir', dir);
		let angle = cc.pToAngle(dir) / Math.PI * 180;
		this.arrow.rotation = 270 - angle;
		let stride = 100;
		for(let i = 0; i < this.balls.length; ++i){
			let ball = this.balls[i];
			let distance = CAST_OFFSET + stride * i;
			ball.x = this.ptStart.x + distance * dir.x;
			ball.y = this.ptStart.y + distance * dir.y;
			// cc.log(ball.x, ball.y);
		}
	},

	hide: function(){
		this.node.active = false;
	},
});