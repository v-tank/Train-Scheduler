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

// creates an instance of the databse
var database = firebase.database();

// fires off when a child is added to the root
database.ref().on("child_added", function(snapshot) {
	// console.log(snapshot.val());
	
	// captures values returned from the database into variables
	var retrievedName = snapshot.val().name;
	var retrievedDestination = snapshot.val().destination;
	var retrievedTrainTime = snapshot.val().firstTrainTime;
	var retrievedFrequency = snapshot.val().frequency;

	// format the initial time into HH:mm
	var timeToSubtract = moment(retrievedTrainTime, "HH:mm");

	// subtract the initial time from the current time and return the answer in minutes
	var difference = moment().diff(timeToSubtract, "minutes");

	// get the remainder of the difference / frequency by using the modulus operator
	var remainder = difference % retrievedFrequency;

	// calculate the minutes away by taking the frequency minus the remainder
	var minutesAway = retrievedFrequency - remainder;

	// console.log(minutesAway);

	// calculate the next arrival time by adding the minutes away to the current time and format it as hh:mm A
	var nextArrival = moment().add(minutesAway, 'minutes').format("hh:mm A");

	// creates a table row and inserts the retrieved data onto the page
	var tableRow = $("<tr><td>" + retrievedName + "</td><td>" + retrievedDestination + "</td><td>" + retrievedFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");

	// appends the table row to the main page
	$("#train-table").append(tableRow);
});

// saves form values into variables when the 'Add' button is clicked
$("#addTrainButton").on("click", function(event) {
	event.preventDefault();

	// Stores input values into variables
	var trainName = $("#train-name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var firstTrainTime = $("#first-train-input").val().trim();
	var frequency = $("#frequency-input").val().trim();

	// console.log(trainName, destination, firstTrainTime, frequency);

	// object to push to database
	var trainObject = {
		name: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	}

	// pushes the created object onto the database at the root level
	database.ref().push(trainObject);

	// Alerts the user once train has been added to the database
	alert("Train added!");

	// Clears the input fields
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-train-input").val("");
	$("#frequency-input").val("");

});