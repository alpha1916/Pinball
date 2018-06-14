let ItemFactory = require('ItemFactory');
let utils = require('utils');
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
		this.addBG();
		this.initBounds();
		game.eventManager.on(constants.Event.CastBall, this.onCastBallEvent.bind(this));

		this.ballTemplate = this.node.getChildByName('BallTemplate');
		this.ballTemplate.active = false;
    },

	addTestItem: function(){
		var square = ItemFactory.getSquare();
		square.parent = this.node;

		let triangle = ItemFactory.getTriangle(64, 0);
		// node.setPosition(100, 100);
		triangle.parent = this.node;

		let ball = ItemFactory.getCircle();
		// node.setPosition(-100, 100);
		ball.parent = this.node;
	},

	addBG: function(){
		let node = this.node.getChildByName('bg');
    	node.setContentSize(this.node.width, this.node.height);
    	node.parent = this.node;
		let graphics = node.addComponent(cc.Graphics);
		// graphics.rect(-w / 2, -h / 2, w, h);
		graphics.rect(0, 0, this.node.width, this.node.height);
		graphics.fillColor = cc.color(55, 55, 155);
		graphics.fill();
	},

	initBounds: function(){
		let width   = this.node.width;
		let height  = this.node.height;

		let node = new cc.Node();
		node.group = 'block';

		let body = node.addComponent(cc.RigidBody);
		body.type = cc.RigidBodyType.Static;

		// if (this.mouseJoint) {
		// 	// add mouse joint
		// 	let joint = node.addComponent(cc.MouseJoint);
		// 	joint.mouseRegion = this.node;
		// }

		this._addBound(node, 0, height/2, width, 10);
		this._addBound(node, 0, -height/2, width, 10);
		this._addBound(node, -width/2, 0, 10, height);
		this._addBound(node, width/2, 0, 10, height);

		node.parent = this.node;
	},

	_addBound (node, x, y, width, height) {
		let collider = node.addComponent(cc.PhysicsBoxCollider);
		collider.offset.x = x;
		collider.offset.y = y;
		collider.size.width = width;
		collider.size.height = height;
	},

    nextRound: function(){
		let list = [0, 1, 2, 3, 4, 5];
        let count = list.length - utils.randomInt(2, 5);
        let container = new cc.Node();
        container.setContentSize(600, 80);
        for(let i = 0; i < count; ++i){
        	let idx = utils.randomInt(0, list.length - 1);
        	list.splice(idx, 1);
		}

		for(let i = 0; i < list.length; ++i){
        	let idx = list[i];
        	var item = ItemFactory.getItem(utils.randomInt(0, 2));
        	item.x = 50 + 100 * idx;
        	item.y = container.height / 2;
        	item.parent = container;
		}
		cc.log(list);
    },

	onCastBallEvent: function(castData){
		const speed = 800;
		let impulse = cc.v2(speed * castData.dir.x, speed * castData.dir.y);
		let ball = cc.instantiate(this.ballTemplate);
		ball.active = true;
		ball.parent = this.ballTemplate.parent;
		ball.setPosition(ball.parent.convertToNodeSpaceAR(castData.ptStart));
		var body = ball.getComponent(cc.RigidBody);
		body.applyLinearImpulse(impulse, castData.ptEnd);
	},



});
