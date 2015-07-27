(function () {
    'use strict';

    /**
     * canvas buffer
     */
    var buff = {};

    /**
     *  high performance drawImage
     */
    window.UPlayer.transit.drawImage = function (image) {

        // TODO if image is not a image
        var b = _getBuff(image);

        if (!b) {
            b = _buffer(image);
        }

        arguments[0] = b;

        this.raw.drawImage.apply(this.raw, arguments);
    };

    /**
     * get canvas buffer
     */
    function _getBuff(image) {

        return buff[image.src];
    }

    /**
     * save image canvas
     */
    function _buffer(image) {

        var c = document.createElement('canvas'),
            ctx = c.getContext('2d');

        c.width = image.width;
        c.height = image.height;

        ctx.drawImage(image, 0, 0);

        buff[image.src] = c;

        return c;
    }
})();