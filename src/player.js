'use strict';

(function () {

    var _timer =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.setTimeout;

    /**
     * class uPlayer
     */
    function UPlayer(opt) {

        var p = this;

        _initProp(p, opt);

        if (p.opt.fullScreen === undefined || p.opt.fullScreen) {
            _fullScreen(p.canvas);
        }
    }

    /**
     * plug in
     */
    UPlayer.prototype.plug = function (m) {

        var i = 0;
        m.zIndex = m.zIndex || 0;

        while (i < this.plugins.length) {
            if (m.zIndex < this.plugins[i].zIndex) {
                break;
            }
            ++i;
        }

        this.plugins.splice(i, 0, m);

        if (m.hash !== undefined) {
            var index = this.pluginsIndex[m.hash];
            if (index !== undefined) {
                if (typeof index === 'object') {
                    index.push(i);
                } else {
                    this.pluginsIndex[m.hash] = [index, i];
                }
            } else {
                _indexUp(this, i);
                this.pluginsIndex[m.hash] = i;
            }
        }
    };

    /**
     * plug image animation
     */
    UPlayer.prototype.plugCard = function (opt) {

        var p = this;

        window.UPlayer.preImage(opt.src, function (img) {

            opt.img = img;

            opt.render = function (ctx, frame) {

                if (opt.pulse) {
                    opt.pulse(ctx, frame);
                }

                var s = opt.scale || 1,
                    x, len, w;

                if (typeof opt.frame === 'object') {
                    len = _cardFrame(opt.frame);
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
                    w * s, img.height * s);
            };

            p.plug(opt);
        });
    };

    /**
     * get card frame
     */
    function _cardFrame(f) {

        var i = f.length,
            m = 0;

        while (i--) {
            if (f[i] > m) {
                m = f[i];
            }
        }

        return m + 1;
    }

    /**
     * unplug
     */
    UPlayer.prototype.unplug = function (hash) {

        var index = this.pluginsIndex[hash];

        if (index !== undefined) {
            if (typeof index !== 'object') {
                _removePlugin(this, hash, index);
            } else {
                var i = index.length;
                while (i--) {
                    _removePlugin(this, hash, index[i]);
                }
            }
        }
    };

    /**
     * run engine
     */
    UPlayer.prototype.run = function (times) {

        if (!this.playing) {
            this.playing = true;

            var p = this;

            window.UPlayer._imageReady(function () {

                _next(p, 0, times);
            });
        }
    };

    /**
     * pause player
     */
    UPlayer.prototype.pause = function () {

        this.playing = false;
    };

    /**
     * stop player
     */
    UPlayer.prototype.stop = function () {

        this.curFrame = 0;

        this.playing = false;
    };

    window.UPlayer = UPlayer;

    /**
     * initialize player
     */
    function _initProp(p, opt) {

        p.ele = p.canvas = document.createElement('canvas');

        p.ctx = window.UPlayer.getContext(p);

        p.opt = opt || {};

        p.canvas.id = p.opt.id || '';

        p.plugins = p.opt.debug ? [window.UPlayer.debug] : [];

        p.pluginsIndex = {};

        p.curFrame = 0;

        p.playing = false;
    }

    /**
     * render canvas
     */
    function _render(p) {

        _clear(p);

        var i = 0;
        while (i < p.plugins.length) {
            if (p.plugins[i]) {
                if (typeof p.plugins[i] === 'function') {
                    p.plugins[i](p.ctx, p.curFrame);
                } else if (typeof p.plugins[i].render === 'function') {
                    p.plugins[i].render(p.ctx, p.curFrame);
                }
            }
            ++i;
        }
    }

    /**
     * clear canvas
     */
    function _clear(p) {

        if (p.opt.refresh || p.opt.refresh === undefined) {

            p.ctx.clearRect(0, 0, p.canvas.width, p.canvas.height);
        }
    }

    /**
     * handle full screen
     */
    function _fullScreen(c) {

        c.style.position = 'fixed';
        c.style.top = 0;
        c.style.left = 0;
        c.style.zIndex = 1000;

        document.body.appendChild(c);

        _fullScreenSize(c);

        window.onresize = function () {

            _fullScreenSize(c);
        };
    }

    /**
     * canvas full screen size
     */
    function _fullScreenSize(c) {

        c.width = window.innerWidth;
        c.height = window.innerHeight;
    }

    /**
     * update index when plug a new animate
     */
    function _indexUp(p, i) {

        for (var hash in p.pluginsIndex) {
            if (p.pluginsIndex.hasOwnProperty(hash) && p.pluginsIndex[hash] >= i) {
                ++p.pluginsIndex[hash];
            }
        }
    }

    /**
     * update index when unplug a new animate
     */
    function _indexDown(p, i) {

        for (var hash in p.pluginsIndex) {
            if (p.pluginsIndex.hasOwnProperty(hash) && p.pluginsIndex[hash] >= i) {
                ++p.pluginsIndex[hash];
            }
        }
    }

    /**
     * remove plugn
     */
    function _removePlugin(p, hash, i) {

        p.plugins.splice(i, 1);

        p.pluginsIndex[hash] = undefined;

        _indexDown(p, i);
    }

    /**
     * next time step
     */
    function _next(p, last, times) {

        var cur = +new Date();

        if (p.playing) {
            if (cur - last > 1000 / (p.opt.fps || 30)) {

                _render(p);

                ++p.curFrame;

                last = cur;

                if (times !== undefined) {
                    --times;
                }
            }

            if (times === undefined || times) {
                _timer.call(window, function () {

                    _next(p, last, times);
                });
            } else {
                p.playing = false;
            }
        }
    }
})();