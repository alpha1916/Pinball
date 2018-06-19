cc.Class({
    extends: cc.Component,

    properties: {

    },

	onBeginContact: function (contact, selfCollider, otherCollider) {
		game.ballPool.put(otherCollider.node);
	},
});
