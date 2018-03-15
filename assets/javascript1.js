// Initialize Firebase
var config = {
    apiKey: "AIzaSyCA41xvKujVhFGCD4CUnGfa3Db1vmMApIw",
    authDomain: "trainschedulerhomework.firebaseapp.com",
    databaseURL: "https://trainschedulerhomework.firebaseio.com",
    projectId: "trainschedulerhomework",
    storageBucket: "",
    messagingSenderId: "91103754552"
  };
  firebase.initializeApp(config);

var database= firebase.database();


$(document).ready(function(){



// button for adding trains 
$(document).on("click", "button", function(event){
    event.preventDefault();

    // Gathers Data 
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();    
    var trainFirst = $("#trainFirst").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();

  

    // Creates local "temporary" object for holding data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: trainFirst,
        frequency: trainFrequency,
    };

    //uploads employee Data to the Database
    database.ref().push(newTrain);


    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    // Alert
    //alert("This stuff working");

$("#trainName").val("");
$("#trainDestination").val("");
$("#trainFirst").val("");
$("#trainFrequency").val("");

// End of button that adds Data
});


database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val()); 

    // Name of the Train
    var trainName = childSnapshot.val().name;
    
    // Destination of the Train
    var trainDestination = childSnapshot.val().destination;

    // When the Train starts running
    var trainFirst = childSnapshot.val().first;

    // How often the train shows up
    var trainFrequency = childSnapshot.val().frequency;

    // gives current time 
    var currentTime = moment().format("HH:mm");

    //attaches current time to the Header
    $("#currentTime").text("Current time " + currentTime);

 

    // I need to make the trains time
    var diffTime = moment(trainFirst, "HH:mm");
    console.log(diffTime);

    // Time apart (remainder)
    var tRemained = diffTime % trainFrequency;


    // minutes until train
    var tMinutesTillTrain = trainFrequency - tRemained;
console.log(tMinutesTillTrain);
    // 
    var nextTrain = moment().add(tMinutesTillTrain, "minutes" ).format( "HH:mm");


    // Throwing that Schedule up on that Scheduler thing
    $("#thatDamnTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>" );
    
// End  of firebase event
});


// End of document.ready
});