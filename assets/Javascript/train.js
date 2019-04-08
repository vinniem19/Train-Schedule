

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

//  The information stored in the database is now in the form of an object. I have to use the 
//  method to retrieve that info as an object and parse it from the object back into strings.
//  Then i can rename the variables and put them in HTML form at so as to get them on the HTML 
//  page.

database.ref().on("child_added", function (childSnapshot) {
    var trainInfo = childSnapshot.val();
    console.log(typeof trainInfo.trainName);
    frequency = childSnapshot.val().frequency;
    console.log(frequency);


    //working with moment.js
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(trainInfo.firsttime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

    var now = moment();
    
    console.log(now._d);
    
    // var newTime = now.add({m: frequency}); // I need the format hh.mm.ampm
    //newTime = (newTime.toString()); //.this is the variable I want to use for the next train arrival
    // var newTimeFormat = newTime.format("HH:mm A" );
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
  var tMinutesTilNextTrain = frequency - tRemainder;
  console.log("Minutes til next train: " + tMinutesTilNextTrain);

    var nextTrainArrives = $("<td>");
    nextTrainArrives.text(now.add(tMinutesTilNextTrain));


    $("tbody").append("<tr>").append(newDataName).append(newDataDest).append(newDataFreq).append(nextTrainArrives).append(tMinutesTilNextTrain);// + trainInfo.trainName + "</td>").append("<td>" + trainInfo.destination + "</td>").append("<td>" + trainInfo.frequency + "</td>").append("<td>" + trainInfo.firsttime + "</td>" + "<td></td>");



    });

 /*   
// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
*/





