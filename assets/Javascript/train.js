

// I need to have a config here.
var config = {
    apiKey: "AIzaSyCY5lgB0yvHcXTsZO0gw_Pja1wjn7g_WW8",
    authDomain: "trainsinmotion.firebaseapp.com",
    databaseURL: "https://trainsinmotion.firebaseio.com",
    projectId: "trainsinmotion",
    storageBucket: "trainsinmotion.appspot.com",
    messagingSenderId: "16772625863"
};
firebase.initializeApp(config);

// This will be the database variable reference
var database = firebase.database();

// Variables

var trnName = "";
var destination = "";
var firstTime = "";
var frequency = "";


// When the user clicks submit, the info will go to the database as a var that I will create.
$(".btn-success").on("click", function () {
    event.preventDefault();
    
    
    trnName = $("#train-name-input").val();
    destination = $("#destination-input").val();
    firstTime = $("#first-tr-input").val();  // this is going to be a first train arrival time
    frequency = $("#frequency-input").val();
    
    
    console.log(trnName);
    console.log(destination);
    console.log(firstTime);
    console.log(frequency);
    
    
    database.ref().push({
        trainName: trnName,
        destination: destination,
        firsttime: firstTime,
        frequency: frequency
        
    });
});

//  The information stored in the database; when a user adds a train, we need to keep every instance
//  as a separate object

database.ref().on("child_added", function (childSnapshot) {
    var trainInfo = childSnapshot.val();
    console.log(typeof trainInfo.trainName);
    frequency = trainInfo.frequency;
    console.log(frequency);
    destination = trainInfo.destination;


    //working with moment.js
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(trainInfo.firsttime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

    var now = moment();
    
    console.log(now._d);
    
    var newDataName = $("<td>");
    newDataName.text(trainInfo.trainName);

    var newDataDest = $("<td>");
    newDataDest.text(trainInfo.destination);

    var newDataFreq = $("<td>");
    newDataFreq.text(trainInfo.frequency);

 // Difference between the times
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);
 
    // Getting remainder = total minutes % freq
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

  // Minutes until next train
var minutesTillNextTrain = $("<td>");
  var tMinutesTilNextTrain = frequency - tRemainder;
  console.log("Minutes til next train: " + tMinutesTilNextTrain);
    minutesTillNextTrain.text(tMinutesTilNextTrain);

    var nextTrainArrives = $("<td>");
    nextTrainArrives.text(now.add(tMinutesTilNextTrain, "m").format("hh:mm A"));

    // Display the trains data onto html page
    $("tbody").append("<tr>").append(newDataName).append(newDataDest).append(newDataFreq).append(nextTrainArrives).append(minutesTillNextTrain);



    });

 





