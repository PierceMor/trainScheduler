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
    var trainFrequency = moment($("#trainFrequency").val().trim(), "DD/MM/YY").format("X");


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
    alert("This stuff working");

$("#trainName").val("");
$("#trainDestination").val("");
$("#trainRate").val("");
$("#trainFrequency").val("");

// End of button that adds Data
});


database.ref().on("child_added", function(childSnapshot, prevChildKey){
    console.log(childSnapshot.val()); 

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    // Info 
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(trainFrequency);


// End  of firebase event
});


// End of document.ready
});
