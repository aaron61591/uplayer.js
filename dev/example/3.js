var screenNum = 5,
    num = 500,
    color = [
        '#ecd2b0',
        '#8b3d3f',
        '#746852'
    ],
    i = 0;

window.plugball = function (p) {
    while (i < screenNum) {
        p.plug({
            render: function (ctx) {
                ctx.fillStyle = '#353f41';
                ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            }
        });
        p.plug({
            frame: 20,
            render: function (ctx, frame) {
                balls(ctx);
            }
        });
        ++i;
    }
};

function balls(ctx) {
    var i = 0,
        t, x, y;
    while (i < num) {
        if (!t) {
            t = ball(ctx, x, y);
            x = t.x;
            y = t.y;
        } else {
            ball(ctx, x, y);
        }
        ++i;
    }
}

function ball(ctx, x, y) {
    var size = Math.round(Math.random() * 50 + 10),
        circle = Math.round(Math.random() * (size / 10)),
        i = 0,
        r = Math.random(),
        t;
    if (!x) {
        x = Math.round(Math.random() * window.innerWidth);
        y = Math.round(Math.random() * window.innerHeight);
    } else {
        if (r > 0.99) {
            t = 1.3;
        } else if (r > 0.95) {
            t = 1.5;
        } else if (r > 0.9) {
            t = 2;
        } else if (r > 0.8) {
            t = 3;
        } else {
            t = 5;
        }
        x += Math.round(Math.random() * window.innerWidth / t) * (Math.random() > 0.5 ? -1 : 1);
        y += Math.round(Math.random() * window.innerHeight / t) * (Math.random() > 0.5 ? -1 : 1);
    }
    while (i < circle) {
        ctx.fillStyle = ctx.strokeStyle = color[i % color.length];
        ctx.beginPath();
        ctx.arc(x, y, size - i * 10, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ++i;
    }
    return {
        x: x,
        y: y
    };
}

$('#example3').show();