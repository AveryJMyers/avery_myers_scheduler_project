// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var currentTime = dayjs();
var displayTime = $("#currentDay");
var saveButtons = $(".saveBtn");


$(function () {
  // TODO: Add a listener for click events on the save button. This code should use the id in the containing time-block as a key to save the user input in local storage. 

  saveButtons.on("click", saveTime);
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 
  compareTimeBlocks();
  // TODO: Add code to get any user input that was saved in localStorage and setthe values of the corresponding textarea elements.

  restoreSavedInputs();
  
  // TODO: Add code to display the current date in the header of the page.
  displayCurrentTime();
});

// this function saves the user input in local storage, and prevents the page from refreshing when the save button is clicked. It also checks to see if the input matches the svaed info, and if it does not it will save it as a new item in local storage.
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
// this function compares the time blocks to the current time and changes the color accordingly. Since each timeblock ID correlates to a choses time, i splcied the number from the ID and compared it to the current hour. 
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
// returns saved inputs back to the page when the page is refreshed.
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

// displays current time in the header.

function displayCurrentTime(){
  displayTime.text(currentTime.format("dddd, MMMM D, YYYY"));

}
