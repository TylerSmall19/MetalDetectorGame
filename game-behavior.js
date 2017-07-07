$(function () {
    // Create a "Hot/Cold" Javascript Search Game:
    // Select a spot on the screen to "find"
    // Start with simple colors on a HexCode System (Green/Red? Red/Blue?)
    // When the mouse gets closer to the spot, the color changes towards a "nicer" color
    // When the mouse finds the spot, a message is triggered and a new round has the option to be selected
    // After each round, a score is displayed

    // Approach:
    // Display a "difficulty" level to the user (size of the squares you're looking for)
    // Once selected, assign a random location on the browaser window to search (don't worry about resizes yet)
    // Track the user's mouse upon entrance of the cursor into the playing field (the entire window)
    // When the user's mouse moves closer to the selected area, turn to the "closer" color
    // When the user's mouse moves further, go to the "further" color
    // When the user's mouse hits the square, end the game

    // Setup a variable to allow scope outside of the click listener
    var game;

    // Add event listeners to the screen for "easy", "normal", "difficult" game setting buttons (uses "data-X" to pass difficulty rating)
    // Once clicked, start the game.
    $('.difficulty-btn').on('click', setDifficultyAndBegin);
});

function setDifficultyAndBegin(e) {
    // Create a new game and set the difficulty based on the data of the button clicked
    game = new Game({ difficulty: $(this).data().difficulty });

    // Clear the buttons from the game area
    $('.button-holder').hide();

    // Choose target coordinates
    game.chooseLocationForTarget();

    // TODO: Improve logic here; This works to set the location of the target with CSS. This was for testing purposes only
    // This needs to be redone so that the location is kept internally and tracked with the mouse movement to determine if the game is done or not
    $(".target").css({ 'top': (game.targetLocation.y), 'left': game.targetLocation.x });

    // Record the current time
    game.setStartTime();

    // Upon a mouse-move event firing
    $(window).on('mousemove', function (e) { game.trackMouse(e) });
}