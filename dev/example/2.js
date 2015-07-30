var p2 = new UPlayer({
        fps: 70,
        debug: true
    }),
    num = 1,
    i = 0;

while (i < num) {

    setTimeout(addMan, i * 1000);

    ++i;
}


function addMan() {

    p2.plugCard({
        src: 'dev/images/runningman.png',
        frame: 11,
        x: -20,
        y: 0,
        scale: 0.5,
        pulse: function() {

            this.x += 3 * this.scale;

            if (this.x > window.innerWidth) {
                this.x = -20;

                if (this.y + 120 * this.scale > window.innerHeight) {
                    this.y = 0;

                    this.scale = 0.5;
                } else {
                    this.y += 120 * this.scale;

                    this.scale *= 1.3;
                }
            }
        }
    });
}

p2.run();