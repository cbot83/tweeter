$( document ).ready(function() {

    // targets keypresses on the form to run this function
    $( "form" ).keyup(function(input) {
        // the number of characters in the form field updated each click
        let inputLength = input.target.textLength;
        // a running total of characters left
        let charLeft = 140 - inputLength;
        // The counter on 140 in the html
        let listedTotal = $(counter);
        // input running total back into html
        let runningTotal = listedTotal.text(charLeft);
        // adds a class of negative to container when amount is at negative
        if (listedTotal.text() < 0) {
            $(counter).addClass("negativeNum");
        } else {
            $(counter).removeClass("negativeNum");
        }
    });
});