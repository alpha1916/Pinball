/**
 * Created by alpha on 2018/6/15.
 */
cc.Class({
	extends: cc.NodePool,

	init: function(template){
		this.template = template;
		this.template.active = false;
	},

	get:function() {
		let ball = null;
		if(this.size() > 0)
			ball = cc.NodePool.prototype.get.call(this);
		else
			ball = this.create();
		ball.parent = this.template.parent;
		ball.body.gravityScale = 0;
		ball.body.linearVelocity = cc.v2(0, 0);
		return ball;
	},

	create: function(){
		let ball = cc.instantiate(this.template);
		ball.active = true;
		ball.body = ball.getComponent(cc.RigidBody);
		ball.parent = this.template.parent;
		return ball;
	},
});