$(document).ready(function() {
  //event listener for text box input
  $("#tweet-text").on("input", function(e) {
    //character counter for tweet-text textarea's length
    let charCounter = $(this).val().length;
    let remainChar = 140 - charCounter;

    //target counter value
    let counter = $(this)
      .parent()
      .children(".intext-tweet")
      .children(".counter");
    
    //update counter value
    counter.text(remainChar);

    //change font colour to red when counter exceeds 140 characters
    if (remainChar < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }
  });
});
