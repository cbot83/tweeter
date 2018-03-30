// function calls and handlers that happen after DOM is loaded
$(document).ready(function() {

    // Loads tweets from json file
    function loadTweets() {
        // ajax call to get new json info
        $.ajax({
            url: "/tweets",
            method: "GET",
            dataType: "json",
            // on complete, grabs mongodb data, reverses order, clears
            // old tweets and renders all tweets
            complete: function (dataResponse) {
                        let tweetsString = dataResponse.responseText;
                        let tweetsArr = JSON.parse(tweetsString);
                        let reverseArr = tweetsArr.reverse();
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
        // a user variable for getting into tweetData object
        let user = tweet.user
        // creates nested article for tweet posts and appends to section #all-tweets
        let $tweet = $(  `<article>
                            <header>
                                <img class='userPic' src='${user.avatars.regular}'>
                                <div class='name'>${user.name}</div>
                                <div class='handle'>${user.handle}</div>
                            </header>
                            <p>${escape(tweet.content.text)}</p>
                            <footer>
                                ${timeTweetHasExisted(tweet)}
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

    // calculates time out of timestamp
    function timeTweetHasExisted (tweet) {
        // plain english math variables
        let milliSecondsPerMin = 60000;
        let milliSecondsPerHour = 3600000;
        let milliSecondsPerDay = 86400000;
        let milliSecondsPerYear = 31556952000;
        // Rounding to one decimal place for each time increment
        let minutes = Math.round(($.now() - tweet.created_at) / milliSecondsPerMin);
        let hours = Math.round(($.now() - tweet.created_at) / milliSecondsPerHour);
        let days = Math.round(($.now() - tweet.created_at) / milliSecondsPerDay);
        let years = Math.round(($.now() - tweet.created_at) / milliSecondsPerYear);
        // checks for appropriate time increment to return for posting
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

    // Submit button function to stop normal behaviour
    function tweetButtonClick(event) {
        // stop normal submit page reload
        event.preventDefault();
        // failing tweets are not permitted to post
        // passing tweets are given the priviledge of database entry
        if (!inputAuthenication()) {
            return;
        } else
        postTweet();
    }

    // checks it tweets are blank or too long
    function inputAuthenication () {
        // text variable for error checks
        let inputText = $('#content').val();
        // Error Message on blank entry
        if (inputText === '') {
            $("#error")
                .empty();
            $(`<p>Give us your thoughts.</p>`)
                .fadeIn('slow')
                .appendTo( "#error" );
            return false;
        }
        // Error Message if message over 140 characters
        if (inputText.length > 140) {
            $("#error")
                .empty();
            $(`<p>You have too much on your mind!</p>`)
                .fadeIn('slow')
                .appendTo( "#error" );
            return false;
        }
        return true;
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
              // resets tweets and reloads with fresh data
              complete: function () {
                            resetInput();
                            loadTweets();
                        }
        });
    }

    // Clears input field and resets counter to 140
    function resetInput() {
        $( '#content' ).val('');
        $( '.new-tweet span' ).html(140);
    }

    // slides compose window into app and targets the input field
    function composeButtonClick() {
        $( '.new-tweet' ).slideToggle();
        $( '#content' ).focus();
    }

    // clears error messages when form is clicked
    function clearError() {
         $("#error").empty();
    }

    // Escape function changes input text to plain text so people
    // can't hack by coding in the input field
    function escape(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // ... loads the event handlers
    function loadEventHandlers () {
        // handler for submitting the tweets
        $( "#submitTweet" ).on('click', tweetButtonClick);
        // handler for compose button
        $( "#compose" ).on('click', composeButtonClick);
        // handler for clearing error when text input is selected
        $( "#content" ).on('click', clearError);
    }

    // loads tweets from db when page starts
    loadTweets();
    // loads all event handlers for the page on startup
    loadEventHandlers();

});