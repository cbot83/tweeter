// function calls and handlers that happen after DOM is loaded
$(document).ready(function() {

    // Loads tweets from json file
    function loadTweets() {
        // ajax call to get new json info
        $.ajax({
            url: "/tweets",
            method: "GET",
            dataType: "json",
            complete: function (data_response) {
                        let tweetsString = data_response.responseText;
                        let tweetsArr = JSON.parse(tweetsString);
                        let reverseArr = tweetsArr.reverse();
                        // calls render tweet to the json Arr that is loaded
                        $("#all-tweets").empty();
                        renderTweets(reverseArr);
                    }
        });
    }

    // calls data array of tweets to render tweets
    function renderTweets(tweets) {
        // loops through data array of tweets
        for (var i = 0; i < tweets.length; i++) {
            // pulls out each user to run through createTweetElement function
            createTweetElement(tweets[i]);
        }
    }

    // function to create a tweet article and populate it
    function createTweetElement(tweet) {
        // creates a user variable for getting into tweetData object
        let user = tweet.user


    // var d = new Date(timestamp * 1000)
        let date = new Date(tweet.created_at);


        console.log("created", tweet.created_at);
        console.log("now", $.now())

    let tweetTimeInMin = Math.round(tweet.created_at / 60000);

    // calculates time out of timestamp
    function findTime (time) {
        // Rounding to one decimal place for each time increment
        let minutes = Math.round((($.now() - tweet.created_at) / 60000));

        let hours = Math.round(((($.now() - tweet.created_at) / 60000) / 60));

        let days = Math.round((((($.now() - tweet.created_at) / 60000) / 60) / 24));

        let years = Math.round(((((($.now() - tweet.created_at) / 60000) / 60) / 24) / 365));
        // checks which time increment to return and post
        if (minutes < 59) {
            return minutes + " minutes ago";
        }
        if (hours < 24) {
            return hours + " hours ago";
        }
        if (days < 365) {
            return days + " days ago";
        }
        return years + " years ago";
    }

        // creates nested article for tweet posts and appends to section #all-tweets
        let $tweet = $(  `<article>
                            <header>
                                <img class='userPic' src='${user.avatars.regular}'>
                                <div class='name'>${user.name}</div>
                                <div class='handle'>${user.handle}</div>
                            </header>
                            <p>${escape(tweet.content.text)}</p>
                            <footer>
                                ${findTime(tweetTimeInMin)}
                            </footer>
                        </article>` )
        .appendTo( "#all-tweets" );
        return $tweet
    }

    // Submit button function to stop normal behaviour
    function onButtonClick(event) {
        // stop normal submit page reload
        event.preventDefault();

        // text variable for error checks
        let ErrorCheck = $('#content').val();

        // Error Message on blank entry
        if (ErrorCheck === '') {
            $("#error")
                .empty();
            $(`<p>Give us your thoughts.</p>`)
                .fadeIn('slow')
                .appendTo( "#error" );
            return ;
        }
        // Error Message if message over 140 characters
        if (ErrorCheck.length > 140) {
            $("#error")
                .empty();
            $(`<p>You have too much on your mind!</p>`)
                .fadeIn('slow')
                .appendTo( "#error" );
            return ;
        }

        // creates variable for tweet text that is ready to send
        let inputText = $('#content').serialize();

        // Post to tweet json file
        $.ajax({
              url: "/tweets/",
              method: "POST",
              data: inputText,
              complete: function() {
                            $( '#content' ).val('');
                            $( '.new-tweet span' ).html(140);
                            loadTweets();
                        }
        });

    }

    // clears error messages when form is clicked
    function clearError() {
         $("#error").empty();
    }


    // slides compose window into app and targets the input field
    function slideCompose() {
        $( '.new-tweet' ).slideToggle();
        $( '#content' ).focus();
    }

    // escape function for handing
    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
    return div.innerHTML;
    }

    // calls function to load tweets from AJAX json call
    loadTweets();
    // handler for submitting the tweets
    $( "#submitTweet" ).on('click', onButtonClick);
    // handler for compose button
    $( "#compose" ).on('click', slideCompose);

    $( "#content" ).on('click', clearError);




});