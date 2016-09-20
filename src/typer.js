(function() {
    'use strict';



    var root = (typeof global !== 'undefined' && global !== null)
        ? global
        : this;

    /*
     *
     * static namespace for library
     *
     */
    var Typer = {
        // ------------------------------------------------------------------------
        //
        // Global Properties
        //
        // ------------------------------------------------------------------------
        elements : [],

        // defaults
        // these can be overriden by the element itself (e.g. data-delay="300")
        isStart          : true,
        isDelayRandom    : true,
        delay            : 200,
        deleteDelay      : 800,
        blinkRate        : 600,
        isLooping        : false,

        cursorDefault    : ' ',
        color            : '#000',
        cursorTransition : 'opacity 100ms ease-in-out'
    };


    // ------------------------------------------------------------------------
    @INCLUDES


    // ------------------------------------------------------------------------
    function init() {
        var i = 0;
        var e;
        var c;
        var owner;

        var elements = document.getElementsByClassName('typer-text');
        for (i = 0, e; e = elements[i++];) {
            Typer.elements[e.id] = new Typer.text(e);
        }

        elements = document.getElementsByClassName('typer-stop');
        var stop = function() {
            owner.stop();
        };
        for (i = 0, e; e = elements[i++];) {
            owner = Typer.elements[e.dataset.owner];
            e.onclick = stop;
        }

        elements = document.getElementsByClassName('typer-start');
        var start = function() {
            owner.start();
        };
        for (i = 0, e; e = elements[i++];) {
            owner = Typer.elements[e.dataset.owner];
            e.onclick = start;
        }

        elements = document.getElementsByClassName('typer-cursor');
        for (i = 0, e; e = elements[i++];) {
            c = new Typer.cursor(e);
            c.owner.setCursor(c);
        }


        console.log('Typer.js instantiated');
    }
    init();


    /*
     *
     * Export Typer.js to global space
     *
     */
    root.typer = Typer;


}).call(this);
