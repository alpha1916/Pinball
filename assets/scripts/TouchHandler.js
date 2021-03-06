cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
    	this.initTouchEvents();
    	this.castRayDisplay = this.node.getChildByName('cCastRay').getComponent('CastRayDisplay');
	},

	initTouchEvents:function()
	{
		let node = this.node;
		node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
		node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
		node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
		// node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
	},

//     touch	cc.Touch	与当前事件关联的触点对象
//     getID	Number	获取触点的 ID，用于多点触摸的逻辑判断
//     getLocation	Object	获取触点位置对象，对象包含 x 和 y 属性
//     getLocationX	Number	获取触点的 X 轴位置
//     getLocationY	Number	获取触点的 Y 轴位置
//     getPreviousLocation	Object	获取触点上一次触发事件时的位置对象，对象包含 x 和 y 属性
//     getStartLocation	Object	获取触点初始时的位置对象，对象包含 x 和 y 属性
//     getDelta	Object	获取触点距离上一次事件移动的距离对象，对象包含 x 和 y 属性
	onTouchStart:function(evt) {
		let pt = evt.getLocation();
		this.castRayDisplay.show(pt);
	},

	onTouchMove:function(evt) {
		let pt = evt.getLocation();
		this.castRayDisplay.show(pt);
	},

	onTouchEnd:function(evt) {
    	this.castRayDisplay.hide();

		let pt = evt.getLocation();
		game.eventManager.fireSync(constants.Event.CastBall, this.castRayDisplay.getCastData(pt));
	},
});
