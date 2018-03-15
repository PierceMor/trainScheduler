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

var database = firebase.database();


$(document).ready(function(){



// button for adding trains 
$(document).on("click", "button", function(event){
    event.preventDefault();

    // Gathers Data 
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();    
    var trainFirst = moment($("#trainFirst").val().trim()).format("HH:mm");
    var trainFrequency = moment($("#trainFrequency").val().trim()).format("HHs:mm");


    // Creates local "temporary" object for holding data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: trainFirst,
        frequency: trainFrequency,
    };

    //uploads train Data to the Database
    database.ref().push(newTrain);

    console.log(newTrain);
    //console.log(newTrain.name);
    //console.log(newTrain.destination);
    //console.log(newTrain.trainFirst);
    //console.log(newTrain.frequency);

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

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = moment(childSnapshot.val().frequency).format("HH:mm");
    var trainFrequency = moment(childSnapshot.val().first).format("HH:mm") ;


    console.log(trainFirst);
    console.log(trainFrequency);
    //childSnapshot.val().first
    //childSnapshot.val().frequency

    //current time 
    var currentTime = moment();

    

    var tRemainder = 

    // Info 
    //console.log(trainName);
   // console.log(trainDestination);
   // console.log(trainFirst);
   // console.log(trainFrequency);

    // I need to make the trains time


    // Throwing that data up on that Scheduler thing
    $("#thatDamnTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFirst + "</td></tr>" );
    
// End  of firebase event
});


// End of document.ready
});
