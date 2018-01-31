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

database.ref().on("value", function(snapshot) {
	console.log(snapshot.val());
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

	firebase.database().ref().push(trainObject);

});