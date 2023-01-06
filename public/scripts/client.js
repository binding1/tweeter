
//filter HTML forms to prevent injections
const esc = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//function to prepend new tweets
const renderTweets = (tweetData) => {
  for (let i of tweetData) {
    let $tweet = createTweetElement(i);
    $("#tweets-container").prepend($tweet);
  }
};


//function to format and create new tweets then add to index.html
const createTweetElement = (tweetData) => {
  const tweetDaysAgo = timeago.format(tweetData["created_at"], "en_US");
  const $tweet = `<article class="tweet">
      <header class="tweet-header">
        <div class="tweet-user-profile">
          <img src=${tweetData["user"].avatars}>
          <span class="profile-text">${tweetData["user"].name}</span>
        </div>
        <div class="profile-tag">${tweetData["user"].handle}</div>
      </header>
      <p>${esc(tweetData["content"].text)}</p>
      <footer class="tweet-footer">
        <span>${tweetDaysAgo}</span>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>
    </br>`;
  return $tweet;
};


//load existing tweets, GET request in ajax
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
  }).then((tweetData) => {
    renderTweets(tweetData);
  });
};


//character counter reset function
const counterReset = () => {
  $(".counter").text(140);
};


//form empties after submit
const formReset = () => {
  $("#tweet-text").val("");
};


//error message function
const formErrorMsg = (errorMsg) => {
  $("#tweet-error").html(errorMsg).slideDown(700);
};


//jquery new tweet handler
$(document).ready(function() {
  loadTweets();
  $(".tweet-submit").on("submit", function(event) {
    event.preventDefault();
    const tweetLength = $(this).children("#tweet-text");

    if (!tweetLength.val()) {
      formErrorMsg(
        '<i class="fa-solid fa-triangle-exclamation"></i> Please enter a tweet.'
      );
      return false;
    }

    if (tweetLength.val().length > 140) {
      formErrorMsg(
        '<i class="fa-solid fa-triangle-exclamation"></i> Tweet is over the 140 character limit.'
      );
      return false;
    }
S
    //animation for error message
    $("#tweet-error").slideUp(700);
    
    const serializeData = $(this).serialize();
    $.ajax("/tweets", {
      method: "POST",
      data: serializeData,
    });

    counterReset();
    formReset();
    loadTweets();
  });
});
