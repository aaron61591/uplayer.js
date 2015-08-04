(function () {

    var UP = window.UPlayer;

    /**
     * create uuid
     */
    UP._uuid = function () {

        var s = [],
            hexDigits = '0123456789abcdef';

        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }

        s[14] = '4';

        /*jslint bitwise: true */

        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

        s[8] = s[13] = s[18] = s[23] = '-';

        return s.join('');
    };

    /**
     * create canvas
     */
    UP._canvas = function () {

        return document.createElement('canvas');
    };
})();