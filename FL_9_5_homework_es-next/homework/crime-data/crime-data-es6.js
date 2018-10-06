const victimDataSource = name => {
    let victimsByName = {
        John: {
            name: 'John',
            surname: 'Doe',
            age: '99',
            jobTitle: 'Victim'
        },
        Jennifer: {
            name: 'Jennifer',
            surname: 'Nicker',
            age: '21',
            jobTitle: 'Artist'
        }
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (victimsByName.hasOwnProperty(name)) {
                resolve(victimsByName[name]);
            } else {
                reject('unknown victim');
            }
        }, 1000);
    });
}

const crimeDataSource = surname => {
    return new Promise((resolve, reject) => {
        let crimeBySurname = {
            Doe: {
                title: 'dank memes',
                place: '9gag'
            },
            Nicker: {
                title: 'robbery',
                place: 'NYC'
            }
        };

        setTimeout(function () {
            if (crimeBySurname.hasOwnProperty(surname)) {
                resolve(crimeBySurname[surname]);
            } else {
                reject('unknown surname');
            }
        }, 500);
    });
}

const loadVictimData = (name) => {
    return new Promise((resolve, reject) => {
        victimDataSource(name)
            .then(victimByName => {
                crimeDataSource(victimByName.surname)
                    .then(crimeBySurname => {
                        resolve(`${victimByName.name} ${victimByName.surname}(${victimByName.jobTitle}, ${victimByName
                                .age}) suffered from ${crimeBySurname.title} in ${crimeBySurname.place}.`);
                    });
            })
            .catch(e => reject(`Unhandled Promise rejection: ${e}`));
    });
}