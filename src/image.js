(function () {

    /**
     * image cache
     */
    var data = {};

    /**
     * preload image
     */
    window.UPlayer.preImage = function (url, cb) {

        var img = data[url];

        if (img) {
            cb(img);
        } else {
            img = new Image();

            img.src = url;

            if (img.complete) {
                _ready();
            }

            img.onload = _ready;
        }

        function _ready() {

            data[url] = img;
            cb(img);
        }
    };
})();