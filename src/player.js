'use strict';

(function () {

    var _timer =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.setTimeout,
        UP = window.UPlayer = function (opt) {

            var p = this;

            initProp(p, opt);

            if (p.opt.fullScreen === undefined || p.opt.fullScreen) {
                fullScreen(p.canvas);
                // TODO remove old
                fullScreen(p.$canvas);

                document.body.appendChild(p.canvas);
            }
        };

    /**
     * plug in
     */
    UP.prototype.plug = function (m) {

        var i = 0;
        m.zIndex = m.zIndex || 0;
        m.$hash = UPlayer._uuid();

        while (i < this.plugins.length) {
            if (m.zIndex < this.plugins[i].zIndex) {
                break;
            }
            ++i;
        }

        this.plugins.splice(i, 0, m);

        if (m.id !== undefined) {
            var index = this.pluginsIndex[m.id];
            if (index !== undefined) {
                if (typeof index === 'object') {
                    index.push(i);
                } else {
                    this.pluginsIndex[m.id] = [index, i];
                }
            } else {
                indexUp(this, i);
                this.pluginsIndex[m.id] = i;
            }
        }
    };

    /**
     * plug image animation
     */
    UP.prototype.plugCard = function (opt) {

        var p = this;

        UP.preImage(opt.src, function (img) {

            opt.img = img;

            opt.render = function (ctx, frame) {

                if (opt.pulse) {
                    opt.pulse(ctx, frame);
                }

                var x, len, w,
                    sX = opt.scaleX || opt.scale || 1,
                    sY = opt.scaleY || opt.scale || 1;

                if (typeof opt.frame === 'object') {
                    len = cardFrame(opt.frame);
                    x = opt.frame[frame % opt.frame.length];
                } else {
                    len = opt.frame;
                    x = frame % len;
                }

                w = img.width / len;

                ctx.drawImage(img,
                    x * w, 0,
                    w, img.height,
                    opt.x || 0, opt.y || 0,
                    w * sX, img.height * sY);
            };

            p.plug(opt);
        });
    };

    /**
     * unplug
     */
    UP.prototype.unplug = function (id) {

        var index = this.pluginsIndex[id];

        if (index !== undefined) {
            if (typeof index !== 'object') {
                removePlugin(this, id, index);
            } else {
                var i = index.length;
                while (i--) {
                    removePlugin(this, id, index[i]);
                }
            }
        }
    };

    /**
     * run engine
     */
    UP.prototype.run = function (times) {

        if (!this.playing) {
            this.playing = true;

            var p = this;

            window.UPlayer._imageReady(function () {

                next(p, 0, times);
            });
        }
    };

    /**
     * pause player
     */
    UP.prototype.pause = function () {

        this.playing = false;
    };

    /**
     * stop player
     */
    UP.prototype.stop = function () {

        this.curFrame = 0;

        this.playing = false;
    };

    /**
     * initialize player
     */
    function initProp(p, opt) {

        p.canvas = UP._canvas();

        p.$canvas = UP._canvas();

        p.ctx = p.canvas.getContext('2d');

        p.$ctx = p.$canvas.getContext('2d');

        p.opt = opt || {};

        p.canvas.id = p.opt.id || '';

        p.plugins = p.opt.debug ? [UP.debug] : [];

        p.pluginsIndex = {};

        p.curFrame = 0;

        p.playing = false;
    }

    /**
     * handle full screen
     */
    function fullScreen(c) {

        var s = c.style;

        s.position = 'fixed';
        s.top = 0;
        s.left = 0;
        s.zIndex = 1000;

        fullSize(c);

        window.onresize = function () {

            fullSize(c);
        };
    }

    /**
     * canvas full screen size
     */
    function fullSize(c) {

        c.width = window.innerWidth;
        c.height = window.innerHeight;
    }

    /**
     * update index when plug a new animate
     */
    function indexUp(p, i) {

        for (var id in p.pluginsIndex) {
            if (p.pluginsIndex.hasOwnProperty(id) && p.pluginsIndex[id] >= i) {
                ++p.pluginsIndex[id];
            }
        }
    }

    /**
     * update index when unplug a new animate
     */
    function indexDown(p, i) {

        for (var id in p.pluginsIndex) {
            if (p.pluginsIndex.hasOwnProperty(id) && p.pluginsIndex[id] >= i) {
                ++p.pluginsIndex[id];
            }
        }
    }

    /**
     * remove plugn
     */
    function removePlugin(p, id, i) {

        p.plugins.splice(i, 1);

        p.pluginsIndex[id] = undefined;

        indexDown(p, i);
    }

    /**
     * next time step
     */
    function next(p, last, times) {

        var cur = +new Date();

        if (p.playing) {
            if (cur - last > 1000 / (p.opt.fps || 30)) {

                UPlayer._render(p);

                ++p.curFrame;

                last = cur;

                if (times !== undefined) {
                    --times;
                }
            }

            if (times === undefined || times) {
                _timer.call(window, function () {

                    next(p, last, times);
                });
            } else {
                p.playing = false;
            }
        }
    }

    /**
     * get card frame
     */
    function cardFrame(f) {

        var i = f.length,
            m = 0;

        while (i--) {
            if (f[i] > m) {
                m = f[i];
            }
        }

        return m + 1;
    }
})();