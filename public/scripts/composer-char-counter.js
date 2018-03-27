$( document ).ready(function() {

    // targets keypresses on the form to run this function
    $( "form" ).keypress(function() {
        // the number of characters in the form field updated each click
        let charInput = $(this)["0"]["0"]
                            .textLength + 1;
        // a running total of characters left
        let charLeft = 140 - charInput;
        // input running total back into html
        let listedTotal = $(this).children().last();
        let runningTotal = listedTotal.text(charLeft);

        if (listedTotal.text() < 0) {
            $(this).addClass("negative");
            console.log($(this));
        } else {
            $(this).removeClass("negative");
        }



        // console.log("runningTotal");

});
});



// $("#cost_price").on("keyup",function(){
//   var totalcost= $("#_regular_price").val() - $(this).val()
//   $(".total_cost").html(totalcost);
//   if(totalcost < 0) $(this).addClass("negative");
//   else $(this).removeClass("negative");