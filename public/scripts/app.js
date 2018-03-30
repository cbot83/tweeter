// function calls and handlers that happen after DOM is loaded
$(document).ready(function() {

    // Loads tweets from json file
    function loadTweets() {
        // ajax call to get new json info
        $.ajax({
            url: "/tweets",
            method: "GET",
            dataType: "json",
            complete: function (dataResponse) {

                // console.log('HELLO ', dataResponse );
                        let tweetsString = dataResponse.responseText;
                        // console.log('tweet string :', tweetsSting);
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

        let tweetTimeInMin = Math.round(tweet.created_at / 60000);

            // calculates time out of timestamp
            function findTime (time) {
                let milliSecondsPerMin = 60000;

                let milliSecondsPerHour = 3600000;

                let milliSecondsPerDay = 86400000;

                let minPerHour = 60;
                // Rounding to one decimal place for each time increment
                let minutes = Math.round((($.now() - tweet.created_at) / milliSecondsPerMin));

                let hours = Math.round(($.now() - tweet.created_at) / milliSecondsPerHour);

                let days = Math.round(($.now() - tweet.created_at) / milliSecondsPerDay);

                let years = Math.round(((((($.now() - tweet.created_at) / milliSecondsPerMin) / minPerHour) / 24) / 365));
                // checks which time increment to return and post
                if (minutes < 60) {
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
                                <div class='icons'>
                                    <i class="far fa-heart"></i>
                                    <i class="fas fa-retweet"></i>
                                    <i class="far fa-flag"></i>
                                </div>
                            </footer>
                        </article>` ).
                        appendTo( "#all-tweets" );
        return $tweet
    }

    // Submit button function to stop normal behaviour
    function onButtonClick(event) {
        // stop normal submit page reload
        event.preventDefault();
        // renders verdict on long or blank tweets
        let verdict = errorCheck();
        // failing tweets are rejected with error message
        if (verdict === 'failed') {
            return;
        }
        // passing tweets are given the priviledge of database entry
        if (verdict === 'passed') {
            postTweet();
        }

        // formAuthentication? postTweet() : return;  - this kind of idea with a boolean value and better names errorCheck
    }

    // posts tweets
    function postTweet () {
        // tweet text packaged and ready to send
        let serializedTweet = $('#content').serialize();
        // Post to tweet json file
        $.ajax({
              url: "/tweets/",
              method: "POST",
              data: serializedTweet,
              complete: function () {
                            resetInput();
                            loadTweets();
                            }
        });
    }

    // checks for bad tweets
    function errorCheck () {
        // text variable for error checks
        let testSubject = $('#content').val();

        // Error Message on blank entry
        if (testSubject === '') {
            $("#error")
                .empty();
            $(`<p>Give us your thoughts.</p>`)
                .fadeIn('slow')
                .appendTo( "#error" );
            return 'failed';
        }
        // Error Message if message over 140 characters
        if (testSubject.length > 140) {
            $("#error")
                .empty();
            $(`<p>You have too much on your mind!</p>`)
                .fadeIn('slow')
                .appendTo( "#error" );
            return 'failed';
        }
        return 'passed';
    }

    // Clears input field and resets counter to 140
    function resetInput() {
        $( '#content' ).val('');
        $( '.new-tweet span' ).html(140);
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

    function loadEventHandlers () {
        // handler for submitting the tweets
        $( "#submitTweet" ).on('click', onButtonClick);
        // handler for compose button
        $( "#compose" ).on('click', slideCompose);
        // handler for clearing error when text input is selected
        $( "#content" ).on('click', clearError);
    }

    // loads tweets from db when page starts
    loadTweets();
    // loads all event handlers for the page on startup
    loadEventHandlers();

});