const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



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

    let date = Date(tweet.created_at)
    // creates nested article for tweet posts and appends to section #all-tweets
    let $tweet = $(  `<article>\
                        <header>\
                            <img class='userPic' src='${user.avatars.regular}'>\
                            <div class='name'>${user.name}</div>\
                            <div class='handle'>${user.handle}</div>\
                        </header>\
                        <p>${tweet.content.text}</p>\
                        <footer>\
                            ${Date(tweet.created_at)} days ago\
                        </footer>\
                    </article>` )
    .appendTo( "#all-tweets" );
    return $tweet
}


$(document).ready(function() {
    renderTweets(data);
});
