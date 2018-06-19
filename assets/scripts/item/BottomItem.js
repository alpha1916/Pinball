cc.Class({
    extends: cc.Component,
	onBeginContact: function (contact, selfCollider, otherCollider) {
		otherCollider.body.gravityScale = 5;
		contact.setRestitution(0);
	},
});
