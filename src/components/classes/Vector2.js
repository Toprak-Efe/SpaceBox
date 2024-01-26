class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static add(vector2, vector2_) {
        return new Vector2(vector2.x + vector2_.x, vector2.y + vector2_.y);
    }

    static subtract(vector2, vector2_) {
        return new Vector2(vector2.x - vector2_.x, vector2.y - vector2_.y);
    }

    static scale(vector2, scalar) {
        return new Vector2(vector2.x*scalar, vector2.y*scalar);
    }

    static magnitude(vector2) {
        return Math.sqrt(vector2.x*vector2.x + vector2.y*vector2.y);
    }

    static normalized(vector2) {
        let magnitude = Vector2.magnitude(vector2);
        return Vector2.scale(vector2, 1/magnitude);
    }

    static dot(vector2, vector2_) {
        return vector2.x*vector2_.x + vector2.y*vector2_.y;
    }

    static cross(vector2, vector2_) {
        return vector2.x*vector2_.y - vector2.y*vector2_.x;
    }

    static angle(vector2, vector2_) {
        return Math.atan2(vector2_.y - vector2.y, vector2_.x - vector2.x);
    }

}

export default Vector2;