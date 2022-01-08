// Assignment code here


// Get references to all conent needed
var generateBtn = document.querySelector("#generate");
var confirmSelection = document.querySelector('#confirm');
var popUp = document.getElementById("pop-up-selection");
var close = document.getElementsByClassName("close")[0];

var getPasswordLimits = function() {
	// set up variables and get info for user selections
	var oneLimitSelected = false;
	var passwordLength = document.getElementById("passwordLength").value;
	var checkboxes = document.querySelectorAll('input[name="rules"]:checked');
	var rules = [];
	checkboxes.forEach((checkbox) => {
		rules.push(checkbox.id);
	});
	
	// pull selections and run through passwordRules to enable only what the user selected
	for (var i = 0; i < rules.length; i++) {
		var index = parseInt(rules[i]);
		passwordRules[index].include = true;
	}
	
	if (rules.length < 1) {
		window.alert("No rules were selected, try again.");
	} else {
		if (passwordLength > 7 && passwordLength < 129) {
			return parseInt(passwordLength);
		} else {
			window.alert("Password must be between 8 and 128 characters.");
		}
	}
	 return 0;
}
/* Get input from user of what they want in their password
var getPasswordLimits = function() {
	var oneLimitSelected = false;
	// ask user for CHARACTERS they WANT
	for (var i = 0; i < passwordRules.length; i++) {
		var confirmation = window.confirm("Do you want to include " + passwordRules[i].item + " in the password?");
		passwordRules[i].include = confirmation;
		if(confirmation)
			oneLimitSelected = true;
	}
	
	// ensure the user selected at least one rule, if not reset back to beginning
	if (!oneLimitSelected) {
		window.alert("You must select at least one rule! Try again.");
		getPasswordLimits();
	}
	
	// ask user for PASSWORD LENGTH, loop if length entered is not 8 > 128
	do {
		var input = window.prompt("How long would you like the password to be?" +
								"\n\n(Must be between 8 and 128 characters)");
		// if user doesn't enter a value or clicks "okay" / "cancel"
		if (input === null || input === "") {
			window.alert("Defaulting to a 16 character password.");
			return 16;
		}
		
		// convert user input to an integer for easier comparison
		var length = parseInt(input);
	} while (length < 8 || length > 128);
	
	// only returns length if it passes the do-while loop
	return length;
}*/

// Generate the password using how long and what characters the user selected
var generatePassword = function(passwordLength) {
	var password = "";
	var arrayOfCharacters = [];
	
	// create an array of all characters the user chose to include
	for (var a = 0; a < passwordRules.length; a++) {
		if (passwordRules[a].include) {
			arrayOfCharacters.push.apply(arrayOfCharacters, passwordRules[a].characters);
		}
	}

	// find a random number and add the character from the arrayOfCharacters to 'password'
	for (var i = 0; i < passwordLength; i++) {
		// get a random number between 0 and the length of characters the user wanted
		var randomNumber = Math.floor(Math.random() * arrayOfCharacters.length);
		// parse characters for the random number and add that to the password
		password += arrayOfCharacters[randomNumber];
	}
	return password;
}

// Write password to the #password input
function writePassword() {
	debugger;
	popUp.style.display = "none";
  	var password = generatePassword(getPasswordLimits());
	
  	var passwordText = document.querySelector("#password");
  	passwordText.value = password;

}

var passwordRules = [
	{
		item: "uppercase letters",
		include: false,
		characters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	},
	{
		item: "lowercase letters",
		include: false,
		characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
	},
	{
		item: "numbers",
		include: false,
		characters: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
	},
	{
		item: "special characters",
		include: false,
		characters: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '/']
	}
];

// Add event listener to generate button

// Once button is pressed on main screen, open pop up
generateBtn.onClick = function(){
	popUp.style.display = "block";
}
// If user selects the close button
close.onclick = function() {
	popUp.style.display = "none";
}
// Get out of the pop up if the user click out of it
window.onclick = function(event) {
	if (event.target === popUp) {
		popUp.style.display = "none";
	}
}

// Send to pop up
generateBtn.addEventListener("click", generateBtn.onClick);
// Button in pop up after user selects checkboxes
confirmSelection.addEventListener("click", writePassword);

console.log("End of program");