(function () {

    /**
     * image cache
     */
    var data = {},
        count = 0,
        wait = [];

    /**
     * preload image
     */
    window.UPlayer.preImage = function (url, cb) {

        var img = data[url];

        if (img) {
            cb(img);
        } else {
            ++count;

            img = new Image();

            img.src = url;

            if (img.complete) {
                _ready();
            }

            img.onload = _ready;
        }

        function _ready() {

            if (!--count) {
                _awake();
            }

            data[url] = img;
            cb(img);
        }
    };

    /**
     * image resouce ready
     */
    window.UPlayer._imageReady = function (cb) {

        if (!count) {
            cb();
        } else {
            wait.push(cb);
        }
    };

    /**
     * awake waiting queue
     */
    function _awake() {

        var i = 0;

        while (i < wait.length) {
            wait[i]();
            ++i;
        }
    }
})();