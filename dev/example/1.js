var p1 = new UPlayer({
        fps: 70,
        debug: true
    }),
    screenNum = 1,
    img = new Image();

img.onload = function () {

    p1.plug(function (ctx, frame) {

        _showDelay(frame);
    });

    while (screenNum--) {

        plugRunningMans(p1);
    }

    p1.plug(function (ctx, frame) {

        ctx.font = 'normal bold 14px Helvetica';
        ctx.fillStyle = '#000';
        ctx.fillText('Last Render ' + frame, 10, 20);
    });

    p1.run();
};


var div = document.createElement('div');
div.style.position = 'fixed';
div.style.left = '92px';
div.style.top = '20px';
div.style.zIndex = 10000;

document.body.appendChild(div);

function _showDelay(frame) {

    // setTimeout(function () {

        div.innerText = frame;
    // });
}

img.src = 'dev/images/runningman.png';

function plugRunningMans(p) {

    var wWin = window.innerWidth,
        hWin = window.innerHeight,
        w = 65,
        h = 119,
        col = parseInt(wWin / w),
        row = parseInt(hWin / h);

    if (wWin % w > w / 2) {
        ++col;
    }

    if (hWin % h > h / 2) {
        ++row;
    }

    w = wWin / col;
    h = hWin / row;

    for (var i = 0; i < row; ++i) {
        for (var j = 0; j < col; ++j) {
            plugRunningMan(p, w, h, i, j);
        }
    }
}

function plugRunningMan(p, w, h, i, j) {

    p.plug(function (ctx, frame) {

        ctx.drawImage(img, frame % 11 * 66, 0, 66, 120, j * w, i * h, w, h);
    });
}