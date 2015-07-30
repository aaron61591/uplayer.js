(function() {
    'use strict';

    /**
     * transit method
     */
    window.UPlayer.transit = {};

    /**
     * get uplayer ctx
     */
    window.UPlayer.getContext = function(p) {

        var ctx = {
            raw: p.canvas.getContext('2d')
        };

        _setup(ctx);

        _performance(ctx);

        return ctx;
    };

    /**
     * setup context
     */
    function _setup(ctx) {

        for (var pro in ctx.raw) {
            if (typeof ctx.raw[pro] === 'function') {
                _setupMethod(ctx, pro);
            } else {
                _setupProp(ctx, pro);
            }
        }
    }

    /**
     * setup context method transit
     */
    function _setupMethod(ctx, pro) {

        ctx[pro] = function() {

            ctx.raw[pro].apply(ctx.raw, arguments);
        };
    }

    /**
     * setup context property transit
     */
    function _setupProp(ctx, pro) {

        ctx.props = ctx.props || {};

        ctx.props[pro] = {
            get: function() {

                return ctx.raw[pro];
            },
            set: function(val) {

                ctx.raw[pro] = val;
            }
        };

        Object.defineProperties(ctx, ctx.props);
    }

    /**
     * setup performance transit
     */
    function _performance() {

        // ctx.drawImage = function () {

        //     window.UPlayer.transit.drawImage.apply(ctx, arguments);
        // };
    }
})();