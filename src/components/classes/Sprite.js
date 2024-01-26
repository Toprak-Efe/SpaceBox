class Sprite {
    constructor(id, size, name, desc, src) {
        this.id = id;
        this.size = size;
        this.name = name;
        this.desc = desc;
        this.image = new Image();
        this.image.src = src;
    }
}

export default Sprite;