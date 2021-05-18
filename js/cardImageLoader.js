class ImageLoader {

    constructor() {
        this.source = this.generate_path();
        this.imageList = this.generate_image_list();
    }
    generate_path() {
        var id = 0;
        var source = new Map();
        for (let i = 1; i <= 41; i++) {
            id += 1;
            let path = "./images/Cards/Minor/Minor" + i + ".png";
            source.set(id, path);
        }
        source.set("MinorDefault", "./images/Cards/Minor/Minor41.png");
        for (let i = 1; i <= 37; i++) {
            id += 1;
            let path = "./images/Cards/Major/Major" + i + ".png";
            source.set(id, path);
        }
        source.set("MajorDefault", "./images/Cards/Major/Major37.png");
        return source;
    }

    generate_image_list() {

        var images = new Map();
        this.source.forEach((value, key) => {
            var preload = new Image();
            preload.src = value;
            images.set(key, preload);
        });

        return images;
    }

}