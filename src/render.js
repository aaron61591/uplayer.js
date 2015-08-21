(function () {

    var UP = window.UPlayer,
        TOTAL_PIXEL = 45705600,
        MAX_PIXEL = 152352,
        curPixel = 0,
        full = false,
        noNeed = [],
        data = {};

    /**
     * performance render canvas
     */
    UP._render = function (p) {

        if (p.opt.refresh || p.opt.refresh === undefined) {
            clear(p.ctx, p);
        }

        var i = 0;
        while (i < p.plugins.length) {
            p.plugins[i] = p.plugins[i] || {};
            renderPlugin(p, p.plugins[i]);
            ++i;
        }
    };

    /**
     * clear img cache
     */
    UP._clearCache = function () {

        // TODO
    };

    /**
     * clear canvas
     */
    function clear(c, p) {

        c.clearRect(0, 0, getWidth(p), getHeight(p));
    }

    /**
     * render one plugin
     */
    function renderPlugin(p, plugin) {

        if (isAble(p, plugin)) {
            renderPerformance(p, plugin);
        } else {
            renderOriginal(p, plugin);
        }
    }

    /**
     * whether this frame is able to optimise
     */
    function isAble(p, plugin) {

        return plugin.frame && !plugin.card && p.opt.performance !== false && noNeed.indexOf(getHash(p, plugin)) === -1;
    }

    /**
     * render by original context
     */
    function renderOriginal(p, plugin) {

        if (typeof plugin === 'function') {
            plugin(p.ctx, p.curFrame);
        } else if (typeof plugin.render === 'function') {
            plugin.render(p.ctx, p.curFrame);
        }
    }

    /**
     * render by performance algorithm
     */
    function renderPerformance(p, plugin) {

        var c = data[getHash(p, plugin)],
            d = [],
            i = 3,
            x = 0,
            y = 0,
            w = p.$canvas.width,
            h = p.$canvas.height,
            minX,
            minY,
            maxX,
            maxY;

        if (!c) {
            if (full) {
                renderOriginal(p, plugin);
                return;
            }
            clear(p.$ctx, p);
            plugin.render(p.$ctx, p.curFrame);

            d = p.$ctx.getImageData(0, 0, w, h).data;

            while (i < d.length) {
                if (d[i]) {
                    x = (i - 3) / 4 % w;
                    y = parseInt(i / 4 / w, 10);
                    if (minX === undefined) {
                        minX = maxX = x;
                        minY = maxY = y;
                    } else {
                        if (x < minX) {
                            minX = x;
                        }
                        if (y < minY) {
                            minY = y;
                        }
                        if (x > maxX) {
                            maxX = x;
                        }
                        if (y > maxY) {
                            maxY = y;
                        }
                    }
                }
                i += 4;
            }

            var img = new Image(),
                fw = maxX - minX + 1,
                fh = maxY - minY + 1,
                canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d');

            if (fw * fh < TOTAL_PIXEL - curPixel) {
                if (fw * fh < MAX_PIXEL) {

                    curPixel += fw * fh;
                    canvas.width = fw;
                    canvas.height = fh;

                    ctx.drawImage(p.$canvas, minX, minY, fw, fh, 0, 0, fw, fh);

                    img.src = canvas.toDataURL();

                    data[getHash(p, plugin)] = c = {
                        x: minX,
                        y: minY,
                        img: img
                    };
                } else {
                    renderOriginal(p, plugin);
                    noNeed.push(getHash(p, plugin));
                    return;
                }
            } else {
                full = true;
                renderOriginal(p, plugin);
                alert('full');
                return;
            }
        }

        p.ctx.drawImage(c.img, c.x, c.y);
    }

    /**
     * get canvas width
     */
    function getWidth(p) {

        return p.canvas.width;
    }

    /**
     * get canvas height
     */
    function getHeight(p) {

        return p.canvas.height;
    }

    /**
     * get plugin hash
     */
    function getHash(p, plugin) {

        return plugin.$hash + p.curFrame % plugin.frame;
    }
})();