$( document ).ready(function() {

    // targets keypresses on the form to run this function
    $( "form" ).keyup(function(input) {
        // the number of characters in the form field updated each click
        let charInput = input.target.textLength;
        // a running total of characters left
        let charLeft = 140 - charInput;
        // grabbing the 140 from the html
        let listedTotal = $(counter);
        // input running total back into html
        let runningTotal = listedTotal.text(charLeft);
        // adds a class of negative to container when amount is at negative
        if (listedTotal.text() < 0) {
            $(counter).addClass("negative");
        } else {
            $(counter).removeClass("negative");
        }
    });
});