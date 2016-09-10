// TODO: Improve randomization to be more human like
/**
 * Typer.text
 *
 * @param  {HTMLNode} ele
 *
 * @return {Object}
 */
Typer.text = function(ele) {
    var element = ele;
    var cursor;

    var delim;
    var words;
    var isStart;
    var delay;
    var deleteDelay;
    var isDelayRandom;
    var isLooping;
    var colors;

    var progress = {
        word      : 0,
        char      : 0,
        building  : true,
        atWordEnd : false
    };
    var isTyping = true;

    var colorIndex = 0;


    // ------------------------------------------------------------------------
    (function() {
        var observer = new MutationObserver(function(mutations) {
            init();
        });
        observer.observe(element, {
            attributes    : true,
            childList     : true,
            characterData : true
        });

        init();
    })()

    // ------------------------------------------------------------------------
    function init() {
        delim = element.dataset.delim || ',';
        words = element.dataset.words.split(delim).filter(function(v) {
            return v;
        });

        isStart = element.dataset.start
            ? (element.dataset.start === 'true')
            : Typer.isStart;
        delay = element.dataset.delay || Typer.delay;
        deleteDelay = element.dataset.deleteDelay || Typer.deleteDelay;
        isDelayRandom = element.dataset.randomDelay
            ? (element.dataset.randomDelay === 'true')
            : Typer.isDelayRandom;
        isLooping = element.dataset.loop
            ? (element.dataset.loop === 'true')
            : Typer.isLooping;

        colors = element.dataset.colors || Typer.color;
        colors = colors.split(',');
        element.style.color = colors[0];

        if (isStart) {
            start();
        }
        else {
            stop();
        }
    }

    function random(min, max) {
        return (min + Math.random() * (max - min));
    }

    // ------------------------------------------------------------------------
    function start() {
        isTyping = true;
        doTyping();
    }
    function stop() {
        isTyping = false;
    }

    function doTyping() {
        var w = progress.word;
        var c = progress.char;
        var currentChar = words[w][c];

        progress.atWordEnd = false;
        if (cursor) {
            cursor.element.style.opacity = '1';
            cursor.on = true;
        }

        if (progress.building) {
            element.innerHTML += currentChar;
            progress.char += 1;
            if (progress.char === words[w].length) {
                if (isLooping) {
                    progress.building = false;
                    progress.atWordEnd = true;
                }
                else {
                    stop();
                }
            }
        }
        else {
            element.innerHTML = element.innerHTML.slice(0, -1);
            if (!element.innerHTML) {
                progress.building = true;
                progress.word = (progress.word + 1) % words.length;
                progress.char = 0;

                colorIndex = (colorIndex + 1) % colors.length;
                element.style.color = colors[colorIndex];
            }
        }

        setTimeout(function() {
            if (isTyping) {
                doTyping();
            }
        }, (progress.atWordEnd)
            ? deleteDelay
            : (isDelayRandom)
                ? random(parseInt(delay) * 0.5, parseInt(delay) * 5.0)
                : delay);
    }

    // ------------------------------------------------------------------------
    function setCursor(ele) {
        cursor = ele;
    }


    // ------------------------------------------------------------------------
    return {
        element       : element,
        cursor        : cursor,
        words         : words,
        delay         : delay,
        deleteDelay   : deleteDelay,
        isDelayRandom : isDelayRandom,
        progress      : progress,
        typing        : isTyping,
        colorIndex    : colorIndex,

        setCursor     : setCursor,

        doTyping      : doTyping
    };
};
