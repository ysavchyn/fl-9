let login = prompt('Enter your login:');
if (login === null) {
    alert('Cancelled.');
} else if (login.length < 4) {
    alert('I don\'t know any users having name length less than 4 symbols');
} else if (login === 'User') {
    let password = prompt('Enter your password:');
    if (password === '' || password === null) {
        alert('Canceled.');
    } else if (password === 'SuperUser') {
        let hours = new Date().getHours();
        if (hours < 20) {
            alert('Good day!');
        } else {
            alert('Good evening!');
        }
    } else {
        alert('Wrong password');
    }
} else {
    alert('I don’t know you');
}