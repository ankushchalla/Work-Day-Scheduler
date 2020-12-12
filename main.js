
// allEvents contains each hour stored as a key. Values are an array of scheduled events.
var allEvents = {
    "9am": "", "10am": "", "11am": "", "12pm": "", "1pm": "",
    "1pm": "", "2pm": "", "3pm": "", "4pm": "", "5pm": ""
};

// Populate allEvents using local storage and render on schedule page. 
function renderPage() {
    // Add today's date to jumbo. 
    var today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    })
    $("p#currentDay").text(`Today is ${today}.`);

    allEvents = JSON.parse(localStorage.getItem("allEvents"));
    var container = $(".container");
    //Iterate through the keys of allEvents. 
    var keys = Object.keys(allEvents);
    for (var i = 0; i < keys.length; i++) {
        var timeBlock = $("<div>").addClass("row time-block past");
        var hour = $("<div>").addClass("col-md-1 hour").text(keys[i]);
        var textArea = $("<textarea>").addClass("col-md-10 description").attr("data-time", keys[i]).text(allEvents[keys[i]]);
        var saveBtn = $("<button>").addClass("saveBtn col-md-1 btn").append($("<i>").addClass("fas fa-save"));
        container.append(timeBlock.append(hour, textArea, saveBtn));
    }
    $(".saveBtn").on("click", save);
}

// save-button click -> text in time block saved in local storage. 
function save() {
    var events = $("textArea");
    for (var i = 0; i < events.length; i++) {
        var time = events[i].getAttribute("data-time");
        allEvents[time] = events[i].value;
    }
    localStorage.setItem("allEvents", JSON.stringify(allEvents));
    alert("Schedule saved :)");
}

function colorByTime() {
    // To iterate through time-blocks, 9:00 -> index 0.
    var timeIndex = new Date().getHours() - 9;
    if (timeIndex > 8) {
        return;
    }
    console.log(timeIndex);
    var timeBlock = $(".row")[timeIndex];
    timeBlock.classList.remove("past");
    timeBlock.classList.add("present");
    for (var i = timeIndex + 1; i < 9; i++) {
        timeBlock = $(".row")[i];
        timeBlock.classList.remove("past");
        timeBlock.classList.add("future");
    }

}

function main() {

    if (localStorage.getItem("allEvents") === null) {
        localStorage.setItem("allEvents", JSON.stringify(allEvents));
    }
    renderPage();
    colorByTime();
}

main();



