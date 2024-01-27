import Vector2 from "./Vector2.js";

class Object {
    sprite = null;
    pose = {
        position: Vector2,
        velocity: Vector2,
        acceleration: Vector2,
        omega: 0.0,
        rotation: 0.0
    }

    constructor(sprite, pose) {
        this.sprite = sprite;
        this.pose = pose;
    }

    update(dt) {
        this.pose.position = Vector2.add(this.pose.position, Vector2.scale(this.pose.velocity, dt));
        this.pose.velocity = Vector2.add(this.pose.velocity, Vector2.scale(this.pose.acceleration, dt));
        this.pose.rotation += this.pose.omega * dt;
    }

    accelerate(vector2) {
        this.pose.acceleration = Vector2.add(this.pose.acceleration, vector2);
    }
}

export default Object;