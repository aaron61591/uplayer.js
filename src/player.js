'use strict';

(function() {

    var _timer =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.setTimeout;

    /**
     * initialize player
     */
    function _initProp(p, opt) {

        p.canvas = document.createElement('canvas');

        p.ctx = window.UPlayer.getContext(p);

        p.opt = opt || {};

        p.plugins = p.opt.debug ? [window.UPlayer.debug] : [];

        p.pluginsIndex = {};

        p.curFrame = 0;
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

        window.onresize = function() {

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
    function _next(p, last) {

        var cur = +new Date();

        if (!last) {
            last = cur;
        }

        if (p.playing) {
            if (cur - last > 1000 / (p.opt.fps || 30)) {
                _render(p);

                ++p.curFrame;

                last = cur;
            }

            _timer.call(window, function() {

                _next(p, last);
            });
        }
    }

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
    UPlayer.prototype.plug = function(m) {

        // Performance
        var i = 0;
        if (m.zIndex !== undefined) {
            while (i < this.plugins.length) {
                if (m.zIndex < this.plugins[i].zIndex) {
                    break;
                }
                ++i;
            }
            this.plugins.splice(i, 0, m);
        } else {
            i = this.plugins.length;
            this.plugins.push(m);
        }

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
    UPlayer.prototype.plugnImage = function(opt) {

        var p = this;

        window.UPlayer.preImage(opt.src, function(img) {

            opt.render = function(ctx, frame) {

                if (opt.action) {
                    opt.action();
                }

                var s = opt.scale || 1;

                ctx.drawImage(img,
                    frame % opt.frame * img.width / opt.frame, 0,
                    img.width / opt.frame, img.height,
                    opt.x, opt.y,
                    img.width / opt.frame * s, img.height * s);
            };

            p.plug(opt);
        });
    };

    /**
     * unplug
     */
    UPlayer.prototype.unplug = function(hash) {

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
    UPlayer.prototype.run = function() {

        var p = this;

        p.playing = true;

        _next(p);
    };

    /**
     * pause player
     */
    UPlayer.prototype.pause = function() {

        this.playing = false;
    };

    /**
     * stop player
     */
    UPlayer.prototype.stop = function() {

        this.curFrame = 0;

        this.playing = false;
    };

    window.UPlayer = UPlayer;
})();