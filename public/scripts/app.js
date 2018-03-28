// function calls and handlers that happen after DOM is loaded
$(document).ready(function() {

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

        // In process to calculating days
        // let currentDate = Date();

        // creates nested article for tweet posts and appends to section #all-tweets
        let $tweet = $(  `<article>
                            <header>
                                <img class='userPic' src='${user.avatars.regular}'>
                                <div class='name'>${user.name}</div>
                                <div class='handle'>${user.handle}</div>
                            </header>
                            <p>${tweet.content.text}</p>
                            <footer>
                                Originally Posted ${date}
                            </footer>
                        </article>` )
        .appendTo( "#all-tweets" );
        return $tweet
    }

    // Submit button function to stop normal behaviour
    function onButtonClick(event) {
        // stop normal submit page reload
        event.preventDefault();
        // creates variable for tweet text that is ready to send
        let inputText = $('#content').serialize();

        let ErrorCheck = $('#content').val();

        console.log(ErrorCheck);

        // Error Message on blank entry - The dirty bird method
        if (ErrorCheck === '') {
            $("#error").empty();
            $(`<p>Give us your thoughts.</p>`).fadeIn('slow').appendTo( "#error" );
            return ;
        }
        // Error Message if message over 140 characters - The dirty bird method
        if (ErrorCheck.length > 140) {
            $("#error").empty();
            $(`<p>You have too much on your mind!</p>`).fadeIn('slow').appendTo( "#error" );
            return ;
        }

        // Post to tweet json file
        $.ajax({
              url: "/tweets/",
              method: "POST",
              data: inputText
        });
        $('#content').val('');
    }

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
                        // calls render tweet to the json Arr that is loaded
                        renderTweets(tweetsArr);
                    }
        });
    }

    // calls function to load tweets from AJAX json call
    loadTweets();
    // handler for submitting the tweets
    $( "#submitTweet" ).on('click', onButtonClick);
});