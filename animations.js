//JS code for managing user interactions for prototype
//Content grabbers
var bg = document.querySelector(".mainframe");
var reportBtn = document.querySelector(".report-btn");
var header = document.querySelector(".header");
var welcomeScreen = [header];
var complaintCategory = document.querySelector(".container-category");
var complaintLocation = document.querySelector(".container-location");
var locationOptions = document.querySelector(".location-options");
var startReportBtn = document.querySelector(".start-report");
var questions = document.querySelector(".container-questions");
var progressBar = document.querySelector(".progress-bar");
var review = document.querySelector(".container-review");
var submit = document.querySelector(".submit-btn");
var formSubmitted = document.querySelector(".container-submitted");
//functions


//content grabber for question q
var question = function(q) {
  return document.querySelector(".container-questions .questions " + q);
}



//next button for the question q
var nextQ = function(q) {
  return document.querySelector(".container-questions .questions " + q + " .next-btn");
}

//function which manages the transition between two questions
function qTransition(q_before, q_after) {
  q_before.style.animation = "contentTransitionOut 0.5s ease-in forwards"
  setTimeout(function() {q_before.style.display = "none";}, 800);
  q_after.style.animation = "contentTransitionIn 0.5s 1.0s forwards";
  q_after.style.display = "block";
}

//function which manages the growth of the progress bar
function progressTransition(stage) {
  if(stage === 0) {
    progressBar.style.animation = "progressAppear 0.5s forwards";
  } else {
    progressBar.style.animation = "progressInc" + stage + " 0.5s forwards";
  }
}


//Stuff to do when user clicks the New Report button
reportBtn.addEventListener('click', function() {
  (function() {
    //apply the screenTransition keyframe animation to each element in the login screen
    welcomeScreen.forEach(function(el) {
      el.style.animation = "screenTransition 1.0s forwards";
    });
    //overwrite the animation of the login button
    reportBtn.style.animationName = "none";
    reportBtn.style.animation = "screenTransition 1.0s forwards";
  })();

  //When user clicks the login button, scale the overlay to make room for the options menu
  //Also stop the wave animation
  setTimeout(function() {
    var overlay = document.querySelector(".container-welcome");
    overlay.style.animation = "moveWater 0.5s forwards";
    bg.style.animation = "changeBG1 0.5s forwards";
    //questions.style.animation = "contentTransitionIn 0.5s 0.5s forwards";
    complaintCategory.style.animation = "contentTransitionIn 0.5s 0.5s forwards";
    progressBar.style.display = "block";
    progressTransition(0);
  }, 200);
});

startReportBtn.addEventListener('click', function() {
    complaintCategory.style.animation = "contentTransitionOut 0.5s ease-in forwards"
    complaintLocation.style.animation = "contentTransitionIn 0.5s 0.5s forwards";
    progressTransition(1);
})

locationOptions.addEventListener('click', function() {
  complaintLocation.style.animation = "contentTransitionOut 0.5s ease-in forwards";
  questions.style.animation = "contentTransitionIn 0.5s 0.5s forwards";
  progressTransition(2);
});

//code for going from question 1 to question 2
nextQ(".q1").addEventListener("click", function() {
  qTransition(question(".q1"), question(".q2"));

  progressTransition(3);
});

//code for going from question 2 to question 3
nextQ(".q2").addEventListener("click", function() {
  qTransition(question(".q2"), question(".q3"));
  progressTransition(4);
});

//code for going from completed questions to form submission review
nextQ(".q3").addEventListener("click", function() {
  var micro = document.querySelector(".container-questions .micro-copy");
  //micro.style.animation = "contentTransitionOut 0.3s ease-out forwards";
  bg.style.animation = "changeBG2 0.5s 0.2s forwards";
  question(".q3").style.animation = "contentTransitionOut 0.5s ease-in forwards";
  progressTransition(5);
  setTimeout(function() {
    review.style.animation = "contentTransitionIn 0.5s ease-in forwards";
  }, 500);
});

//code for going to form submitted screen
submit.addEventListener("click", function() {
  progressTransition(6);
  review.style.animation = "contentTransitionOut 0.5s ease-out forwards";
  setTimeout(function() {
    formSubmitted.style.display = "block";
    formSubmitted.style.opacity = "1.0";
  }, 500);
  setTimeout(function() {
    alert("Presentation has ended.  Restarting demo.");
    location.reload(true);
  }, 800);

});

//Get the refresh button
var refresh = document.querySelector(".refresh-btn");

//Reload the prototype when user clicks the reload button
refresh.addEventListener('click', function() {
  location.reload(true);
});
