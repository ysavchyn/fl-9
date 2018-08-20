const minOfInterval = 0,
    startMaxInterval = 5,
    startAttemptPrize = 10,
    lastAttempt = 1;

let continueGame = true,
    maxOfInterval = startMaxInterval,
    inputNumber,
    totalPrize = 0,
    currentAttemptPrize = 0,
    maxAttemptPrize = 10;

if (confirm('Do you want to play a game?')) {
    while (continueGame) {
        currentAttemptPrize = parseInt(maxAttemptPrize);
        let randomNumber = Math.floor(minOfInterval + Math.random() * (maxOfInterval + lastAttempt - minOfInterval));
        for (let attempts = 3; attempts > 0; attempts--) {
            console.log(randomNumber); //DEBUG
            inputNumber = parseInt(prompt('Enter a number from ' +
                minOfInterval +
                ' to ' +
                maxOfInterval +
                ':' +
                '\nAttempts left: ' +
                attempts +
                '\nTotal prize: ' +
                totalPrize +
                '$' +
                '\nPossible prize on current attempt: ' +
                currentAttemptPrize +
                '$'));
            if (inputNumber === randomNumber && inputNumber.toString().trim() !== '') {
                totalPrize += currentAttemptPrize;
                continueGame = confirm('Congratulation! Your prize is: ' +
                    totalPrize +
                    ' Continue a game?');
                if (continueGame) {
                    maxOfInterval *= 2;
                    maxAttemptPrize *= 3;
                    break;
                }
            }
            if (!continueGame || attempts === lastAttempt) {
                alert('Thank you for a game. Your prize is: ' + totalPrize);
                continueGame = confirm('Play again ?');
                if (continueGame) {
                    totalPrize = 0;
                    maxOfInterval = startMaxInterval;
                    maxAttemptPrize = startAttemptPrize;
                    break;
                } else {
                    continueGame = false;
                    break;
                }
            } else {
                currentAttemptPrize = parseInt(currentAttemptPrize / 2);
                continue;
            }
        }
    }
} else {
    alert('You did not become a millionaire, but can.');
}