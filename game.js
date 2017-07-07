function Game(properties) {
    this.difficulty = properties.difficulty;
    this.targetSize = this.getTargetSizeForDifficulty();
    this.targetLocation = {};
    this.boardWidth = $(window).width();
    this.boardHeight = $(window).height();
}

Game.prototype.getTargetSizeForDifficulty = function () {
    var size;

    switch (this.difficulty) {
        case 'easy':
            size = { x: 50, y: 50 };
            break;
        case 'medium':
            size = { x: 25, y: 25 };
            break;
        case 'hard':
            size = { x: 10, y: 10 };
            break;
        default:
            size = { x: 35, y: 35 };
    }

    return size;
}

Game.prototype.chooseLocationForTarget = function () {
    this.targetLocation = {
        // TODO: Refactor into a helper function of some variety
        x: (Math.random() * this.boardWidth) - (this.targetSize.x / 2),
        y: (Math.random() * this.boardHeight) - (this.targetSize.y / 2)
    };
}

Game.prototype.setStartTime = function () {
    this.startTime = new Date().getTime();
}

Game.prototype.setEndTime = function () {
    this.endTime = new Date().getTime();
}

Game.prototype.calculateGameTime = function () {
    return Math.round(Math.abs((this.startTime - this.endTime) / 1000));
}

Game.prototype.trackMouse = function (e) {
    var currentPos = { x: e.pageX, y: e.pageY };

    // If game is over
    if (isOver(currentPos, this.targetLocation, this.targetSize)) {
        this.setEndTime();
        console.log('game is over');
        // Trigger the end game screen and score keeping (based on time)
        triggerEndGameScreen.bind(this)();

    // Otherwise
    } else {
        // Determine if the mouse is closer or further from the board than it was previously (going from center of the target area)
        // Update the game color based on this information
        colorBg(distanceToTarget(currentPos, this.targetLocation), this.boardWidth);
    }

    function distanceToTarget(pos, targetPos) {
        var x1 = pos.x;
        var y1 = pos.y;

        var x2 = targetPos.x;
        var y2 = targetPos.y;

        // Distance formula to calculate pixels from top-left of target
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    function isOver(pos, targetPos, targetSize) {
        // Returns true if the mouse pointer is in between the dimensions of the box
        return ((pos.x <= targetPos.x + targetSize.x) && (pos.x >= targetPos.x)) &&
            ((pos.y <= targetPos.y + targetSize.y) && (pos.y >= targetPos.y));
    }

    function triggerEndGameScreen() {
        //throw new Error('Not Implemented!');
        $(window).off('mousemove');
        $('body').css('background-color', 'black');
        $('.button-holder').show();
        $('.game-stats').html('Your Time Was: ' + pluralizedOutput(this.calculateGameTime()));
    }

    function pluralizedOutput(num) {
        if (num == 1) {
            return '' + num + ' second';
        } else {
            return '' + num + ' seconds';
        }
    }

    function colorBg(distance, boardWidth) {
        var redAmount = calculateColorPercent(distance, boardWidth);
        var rgbString = 'rgb(' + Math.floor(redAmount) + ', ' + Math.floor((255 - redAmount)) + ', 0)';

        $('.test').css({ "background": rgbString });
    }

    function calculateColorPercent(distance, boardWidth) {
        return calculateDistancePercent(distance, boardWidth) * 255;
    }

    function calculateDistancePercent(distance, boardWidth) {
        return distance / boardWidth;
    }

}