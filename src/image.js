(function () {

    /**
     * image cache
     */
    var data = {},
        count = 0,
        loading = {},
        wait = [];

    /**
     * preload image
     */
    window.UPlayer.preImage = function (url, cb) {

        var img = data[url];

        if (img) {
            cb(img);
        } else {
            _loading(url, cb);
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
     * load image
     */
    function _loading(url, cb) {

        if (!loading[url]) {
            ++count;

            var img = new Image();

            img.src = url;

            if (img.complete) {
                _ready(img, url);
            }

            img.onload = function () {

                _ready(img, url);
            };

            loading[url] = [];
        }

        loading[url].push(cb);
    }

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

    /**
     * image resource loaded
     */
    function _ready(img, url) {

        if (!--count) {
            _awake();
        }

        data[url] = img;

        var i = 0;
        while (i < loading[url].length) {
            loading[url][i](img);
            ++i;
        }

        loading[url] = null;
    }
})();