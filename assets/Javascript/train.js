

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

database.ref().on("child_added", function (snapshot) {
    var trainInfo = snapshot.val();
    
    frequency = snapshot.val().frequency;
    console.log(frequency);
    //working with moment.js
    var now = moment();
    
    console.log(now.toString());
    var newTime = now.add({m: frequency});
    newTime = (newTime.toString()); //.this is the variable I want to use for the next train arrival
    $("tbody").append("<tr>").append("<td>" + trainInfo.trainName + "</td>").append("<td>" + trainInfo.destination + "</td>").append("<td>" + trainInfo.frequency + "</td>").append("<td>" + trainInfo.firsttime + "</td>" + "<td></td>");

    });
// database.ref().on("value", function (snapshot) {
   // trnName = snapshot.val().trainName;
    // destination = snapshot.val().destination;
    // firstTime = snapshot.val().firsttime;
// });

    // This is an attempt at a for loop
    // maybe I don't need one . . .from an ex I saw online, I can do another event listener

        
/*
        // I am not sure why the firebase isn't loading, so I will test my javascript knowledge.
        // I will try putting the inputs directly to the html place
                   
        for (var i = 0; i < 4; i++) {
                    var newDiv = $("<tr>");
                    newDiv.append("<td>" + trnName + "</td>").append("<td>" + destination + "</td>").append("<td>" + firstTime + "</td>").append("<td>" + frequency + "</td>");
                    $("tbody").append(newDiv);
                }
*/






