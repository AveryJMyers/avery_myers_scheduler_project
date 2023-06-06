// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var currentTime = dayjs();
var displayTime = $("#currentDay");
var saveButtons = $(".saveBtn");


$(function () {
  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  saveButtons.on("click", saveTime);
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  compareTimeBlocks();
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  restoreSavedInputs();
  

  //
  // TODO: Add code to display the current date in the header of the page.
  displayCurrentTime();
});

function saveTime(event) {
  event.preventDefault();
  var timeBlock = $(this).closest(".time-block");
  var timeBlockId = timeBlock.attr("id");
  var textarea = timeBlock.find(".description");
  var eventText = textarea ? textarea.val() : "";
  var existingInfo = localStorage.getItem(timeBlockId);

  if (eventText !== existingInfo) {
    localStorage.setItem(timeBlockId, eventText);
  }
}

function compareTimeBlocks() {
  var currentHour = dayjs().hour();

  saveButtons.each(function() {
    var timeBlock = $(this).closest(".time-block");
    var timeBlockId = timeBlock.attr("id");
    var hour = parseInt(timeBlockId.split("-")[1]);

    if (hour < currentHour) {
      timeBlock.addClass("past").removeClass("present future");
    } else if (hour === currentHour) {
      timeBlock.addClass("present").removeClass("past future");
    } else {
      timeBlock.addClass("future").removeClass("past present");
    }
  });
}

function restoreSavedInputs() {
  saveButtons.each(function() {
    var timeBlock = $(this).closest(".time-block");
    var timeBlockId = timeBlock.attr("id");
    var textarea = timeBlock.find(".description");
    var savedText = localStorage.getItem(timeBlockId);

    if (textarea && savedText) {
      textarea.val(savedText);
    }
  });
}



function displayCurrentTime(){
  displayTime.textContent = currentTime.format("dddd, MMMM D, YYYY")

}
