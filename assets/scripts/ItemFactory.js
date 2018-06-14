/**
 * Created by alpha on 2018/6/12.
 */
let utils = require('utils');
let ItemFactory = {
	getTriangle: function(width, rotation){
		width = width || 64;
		if(rotation == null)
			rotation = utils.randomInt(0, 60);

		let node = new cc.Node();
		node.setContentSize(width, width);
		node.rotation = rotation;

		//三角形半边长
		let halfSideLength = width * Math.tan(Math.PI / 6);
		let halfWidth = width / 2;

		let points = [];
		points.push(cc.v2(0, halfWidth));
		points.push(cc.v2(halfSideLength, -halfWidth));
		points.push(cc.v2(-halfSideLength, -halfWidth));
		cc.log('points', points);

		let graphics = node.addComponent(cc.Graphics);
		graphics.moveTo(points[0].x + halfWidth, points[0].y + halfWidth);
		graphics.lineTo(points[1].x + halfWidth, points[1].y + halfWidth);
		graphics.lineTo(points[2].x + halfWidth, points[2].y + halfWidth);
		graphics.lineTo(points[0].x + halfWidth, points[0].y + halfWidth);
		// graphics.lineTo(width / 2 - halfSideLength, 0);
		// graphics.lineTo(width / 2, width);
		graphics.fillColor = cc.color(255, 255, 0);
		graphics.fill();

		//刚体
		let body = node.addComponent(cc.RigidBody);
		body.type = cc.RigidBodyType.Static;

		let collider = node.addComponent(cc.PhysicsPolygonCollider);
		collider.offset.x = 0;
		collider.offset.y = 0;
		collider.points = points;
		collider.restitution = 1;

		return node;
	},

	getSquare: function(w, h){
		w = w || 64;
		h = h || 64;
		let node = new cc.Node();
		node.setContentSize(w, h);

		let graphics = node.addComponent(cc.Graphics);
		// graphics.rect(-w / 2, -h / 2, w, h);
		graphics.rect(0, 0, w, h);
		graphics.fillColor = cc.color(255, 0, 0);
		graphics.fill();

		return node;
	},

	getCircle: function(radius){
		radius = radius || 20;
		let node = new cc.Node();
		node.setContentSize(radius, radius);

		let graphics = node.addComponent(cc.Graphics);
		graphics.circle(radius / 2, radius / 2, radius);
		graphics.fillColor = cc.color(0, 0, 155);
		graphics.fill();

		//刚体
		let body = node.addComponent(cc.RigidBody);
		body.type = cc.RigidBodyType.Dynamic;

		let collider = node.addComponent(cc.PhysicsCircleCollider);
		collider.offset.x = 0;
		collider.offset.y = 0;
		collider.radius = radius;
		collider.restitution = 1;

		return node;
	}
};

module.exports = ItemFactory;