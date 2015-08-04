var p3 = new UPlayer({
        debug: true
    }),
    num = 1000,
    EXCUR = [0, 2, 4, 6, 4, 2, 0];

p3.plug({
    frame: 7,
    render: function (ctx, frame) {

        var excur = EXCUR[frame % 7],
            i = 0;

        ctx.fillStyle = ctx.strokeStyle = '#c4f2ff';

        while (i < num) {
            _cloud1(ctx, excur);
            _cloud2(ctx, excur);
            _cloud3(ctx, excur);
            ++i;
        }

    }
});

p3.run();

/**
 * render cloud1
 */
function _cloud1(ctx, excur) {

    var cx = window.innerWidth * 0.05,
        cy = window.innerHeight * 0.3 + excur;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(cx + 50, cy - 10, cx + 111, cy - 14);
    ctx.bezierCurveTo(cx + 125, cy - 20, cx + 120, cy - 40, cx + 98, cy - 38);
    ctx.bezierCurveTo(cx + 90, cy - 52, cx + 65, cy - 50, cx + 65, cy - 27);
    ctx.quadraticCurveTo(cx + 58, cy - 30, cx + 56, cy - 24);
    ctx.quadraticCurveTo(cx + 40, cy - 30, cx + 37, cy - 14);
    ctx.quadraticCurveTo(cx + 33, cy - 14, cx + 31, cy - 8);
    ctx.quadraticCurveTo(cx + 11, cy - 4, cx, cy - 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}


/**
 * render cloud2
 */
function _cloud2(ctx, excur) {

    var cx = window.innerWidth * 0.49,
        cy = window.innerHeight * 0.25 + excur;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(cx + 24, cy + 1, cx + 63, cy);
    ctx.arc(cx + 63, cy - 13, 13, Math.PI * 0.45, Math.PI * 1, true);
    ctx.quadraticCurveTo(cx + 40, cy - 12, cx + 40, cy - 6);
    ctx.quadraticCurveTo(cx + 36, cy, cx + 36, cy - 2);
    ctx.quadraticCurveTo(cx, cy, cx, cy - 3);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}


/**
 * render cloud3
 */
function _cloud3(ctx, excur) {

    var cx = window.innerWidth * 0.625,
        cy = window.innerHeight * 0.28 + excur;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(cx + 48, cy - 2, cx + 104, cy + 11);
    ctx.lineTo(cx + 104, cy + 9);
    ctx.quadraticCurveTo(cx + 85, cy + 9, cx + 89, cy - 18);
    ctx.bezierCurveTo(cx + 88, cy - 41, cx + 56, cy - 41, cx + 53, cy - 22);
    ctx.quadraticCurveTo(cx + 38, cy - 26, cx + 39, cy - 11);
    ctx.quadraticCurveTo(cx + 32, cy - 11, cx + 32, cy - 5);
    ctx.quadraticCurveTo(cx + 32, cy - 2, cx + 29, cy - 2);
    ctx.quadraticCurveTo(cx + 15, cy - 1, cx, cy - 2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}