// TL - Transaction limit, RB - remaining balance
// cardsCount = 2 => user can have max 3 cards (e.g. 0, 1, 2)
const cardsCount = 2;

function userCard(index) {
    let balance = 100,
        tl = 100,
        historyLogs = [],
        key = index;
    const taxed = 1.05;

    function pushHistoryLog(type, amount) {
        historyLogs.push({
            operationType: type,
            credits: amount,
            operationTime: new Date().toLocaleString()
        });
    }
    
    return {
        getCardOptions: function () {
            return {
                key: key,
                balance: balance,
                transactionLimit: tl,
                historyLogs: historyLogs
            }
        },
        putCredits: function (amount) {
            balance += amount;
            pushHistoryLog('Received credits', amount);
        },
        takeCredits: function (amount) {
            if (tl >= amount && balance >= amount) {
                balance -= amount;
                pushHistoryLog('Withdrawal of credits', amount);
            } else {
                console.log('TL/RB < amount to take.');
            }
        },
        setTransactionLimit: function (amount) {
            tl = amount;
            pushHistoryLog('Transaction limit change', amount);
        },
        transferCredits: function (amount, recipientCard) {
            if (tl >= amount * taxed && balance >= amount * taxed) {
                this.takeCredits(amount * taxed);
                recipientCard.putCredits(amount);
            } else {
                console.log('TL or RB < amount to send.');
            }
        }
    }
}

class UserAccount {
    constructor() {
        this.name = name;
        this.cards = [];
    }
    
    addCard() {
        if (this.cards.length <= cardsCount) {
            this.cards.push(userCard(this.cards.length + 1));
        } else {
            console.log('User card count should not be > 3.');
        }
    }
    
    getCardByKey(key) {
        return this.cards[key - 1];
    }
}