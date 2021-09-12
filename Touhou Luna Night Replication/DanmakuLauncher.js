class DanmakuLauncher {
    danmakus;
    constructor() {
        this.danmakus = new Array();
    }

    loadDanmaku(danmaku) {
        this.danmakus.push(danmaku);
    }

    unloadDanmaku() {
        for (let i = 0; i < this.danmakus.length; i++) {
            const danmaku = this.danmakus[i];
            if (danmaku.sprite == null) {
                //this.danmakus.splice(i);
            }
        }
    }

    launch() {
        this.danmakus.forEach(danmaku => {
            if (danmaku.sprite != null) {
                danmaku.drawDanmaku();
            }
        });
        this.unloadDanmaku();
    }
}