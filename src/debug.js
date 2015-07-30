(function() {

    var t0 = +new Date(),
        t1,
        calNum = 10,
        i = 0,
        created = false,
        id = 'uplayer-fps';

    /**
     * debug plugin
     */
    window.UPlayer.debug = function() {

        _create();

        if (++i % calNum === 0) {
            t1 = +new Date();
            document.getElementById(id).innerText = 'FPS ' +
                (calNum / ((t1 - t0) / 1000)).toFixed(1);
            t0 = t1;
        }
    };

    /**
     * create fps display dom
     */
    function _create() {

        if (!created) {
            var div = document.createElement('div'),
                s = div.style;

            div.id = id;

            s.position = 'fixed';
            s.top = 0;
            s.right = 0;
            s.zIndex = 10000;
            s.fontSize = '24px';
            s.color = '#fff';
            s.margin = '5px';
            s.padding = '10px';
            s.background = 'rgba(0, 0, 0, 0.6)';

            div.innerText = 'FPS 0';

            document.body.appendChild(div);

            created = true;
        }
    }
})();