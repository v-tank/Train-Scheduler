// Initialize Firebase
var config = {
  apiKey: "AIzaSyA4aD00BLF849GaWCnKG0uVLR7kZ5hiN2I",
  authDomain: "train-scheduler-6bddd.firebaseapp.com",
  databaseURL: "https://train-scheduler-6bddd.firebaseio.com",
  projectId: "train-scheduler-6bddd",
  storageBucket: "train-scheduler-6bddd.appspot.com",
  messagingSenderId: "109817609650"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log(moment());

database.ref().on("child_added", function(snapshot) {
	console.log(snapshot.val());
	// console.log(snapshot.val().name);

	var retrievedName = snapshot.val().name;
	var retrievedDestination = snapshot.val().destination;
	var retrievedTrainTime = snapshot.val().firstTrainTime;
	var retrievedFrequency = snapshot.val().frequency;
	var minutesAway = 5;
	// console.log(retrievedName);
	var tableRow = $("<tr><td>" + retrievedName + "</td><td>" + retrievedDestination + "</td><td>" + retrievedFrequency + "</td><td>" + retrievedTrainTime + "</td><td>" + minutesAway + "</td></tr>");

	$("#train-table").append(tableRow);
});


$("#addTrainButton").on("click", function(event) {
	event.preventDefault();

	// Stores input values into variables
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrainTime = $("#first-train-input").val().trim();
	var frequency = $("#frequency-input").val().trim();

	console.log(trainName, destination, firstTrainTime, frequency);

	// object to push to database
	var trainObject = {
		name: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	}

	database.ref().push(trainObject);

	// firebase.database().ref().push(trainObject);

	// Alerts the user once train has been added to the database
	alert("Train added!");

	// Clears the input fields
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val("");

});