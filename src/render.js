(function () {

    var UP = window.UPlayer,
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

        if (plugin.frame && !plugin.card) {
            renderPerformance(p, plugin);
        } else {
            renderOriginal(p, plugin);
        }
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

        var img = data[getHash(p, plugin)];

        if (!img) {
            clear(p.$ctx, p);
            plugin.render(p.$ctx, p.curFrame);
            img = new Image();
            img.src = p.$ctx.canvas.toDataURL();
            data[getHash(p, plugin)] = img;
        }

        p.ctx.drawImage(img, 0, 0, getWidth(p), getHeight(p));
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