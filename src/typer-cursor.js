/**
 * Typer.cursor
 *
 * @param  {HTMLNode} ele
 *
 * @return {Object}
 */
Typer.cursor = function(ele) {
    var element = ele;
    var owner = Typer.elements[element.dataset.owner] || '';
    var isOn = true;

    var cursorDisplay = element.dataset.cursorDisplay || Typer.cursorDefault;
    var cursorColor = element.dataset.cursorColor || Typer.cursorColor;
    var cursorStyle = element.style || 'border-left: ' + cursorColor + ' 2px solid;';


    // ------------------------------------------------------------------------
    (function() {
        element.innerHTML = cursorDisplay;
        element.style.transition = Typer.cursorTransition;

        setInterval(function() {
            updateBlinkState();
        }, Typer.blinkRate);
    })();

    function updateBlinkState() {
        if (isOn) {
            element.style.opacity = '0';
            isOn = false;
        }
        else {
            element.style.opacity = '1';
            isOn = true;
        }
    };


    // ------------------------------------------------------------------------
    return {
        element          : element,
        cursorDisplay    : cursorDisplay,
        owner            : owner,
        isOn             : isOn
    };
};
