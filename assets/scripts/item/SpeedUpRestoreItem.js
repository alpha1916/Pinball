cc.Class({
    extends: cc.Component,
	onBeginContact: function (contact, selfCollider, otherCollider) {
		let pt = otherCollider.node.getPosition();
		pt.y += 2000;
		otherCollider.body.linearVelocity = cc.v2(0, 0);
		otherCollider.body.applyLinearImpulse(constants.RestoreImpulse, pt);
	},
});
