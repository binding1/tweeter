/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];


const renderTweets = (tweetData) => {
  for (let i of tweetData) {
    let $tweet = createTweetElement(tweetData[i]);
    $('.existing-tweets').prepend($tweet);
  }
};

const createTweetElement = (tweetData) => {
  const tweetDaysAgo = timeago.format(tweetData["created_at"], 'en_US');
  const $tweet = (
    `<article class="tweet">
      <header class="tweet-header">
        <div class="tweet-user-profile"><img src=${tweetData["user"].avatars}<span class="profile-text">${tweetData["user"].name}</span></div>
        <div class="profile-tag">${tweetData["user"].handle}</div>
      </header>
      <p>${tweetData["content"].text}</p>
      <footer class="tweet-footer">
        <span>${tweetDaysAgo}</span>
        <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`
  );
  return $tweet;
};

const loadTweets = () => {
  $.ajax({
    url:"/tweets",
    method: 'GET'
  })
  .then((tweetData) => {
    renderTweets(tweetData);
  })
};

$(document).ready(function() {
  loadTweets(data);
  $('.tweet-submit').on('submit', function(event) {
    event.preventDefault();
    console.log('Tweet added');
    const serializeData = $(this).serialize();

    $.ajax('/tweets', {
      method: 'POST',
      data: serializeData
    })
  })
});
