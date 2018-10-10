let trackButton = document.getElementById('track'),
    resetButton = document.getElementById('reset'),
    idLocation = document.getElementById('location'),
    mainForm = document.getElementById('main-form'),
    info = document.getElementById('info'),
    inputLatitude = document.getElementById('latitude'),
    inputLongitude = document.getElementById('longitude'),
    loading = document.getElementById('loading'),
    h1 = document.createElement('h1');

idLocation.appendChild(h1);

let http = {};

http.get = url => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onloadstart = () => {
            mainForm.style.display = 'none';
            loading.style.display = 'block';
        };

        request.onload = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(request.response);
                } else {
                    reject({
                        status: request.status,
                        response: request.response
                    });
                }
            }
            loading.style.display = 'none';
        };

        request.onerror = () => {
            reject({
                status: request.status,
                response: request.response
            });
        };

        request.send(null);
    });
};

trackButton.onclick = function () {
    let latitude = parseFloat(inputLatitude.value),
        longitude = parseFloat(inputLongitude.value);

    http.get(`https://api.onwater.io/api/v1/results/${latitude},${longitude}`).then(response => {
        let parsedResponse = JSON.parse(response);

        if (parsedResponse.water) {
            idLocation.className = 'in-water blur-in';
            idLocation.firstElementChild.innerHTML = 'In the water';
        } else {
            idLocation.className = 'on-earth blur-in';
            idLocation.firstElementChild.innerHTML = 'On earth';
        }

        info.className = 'blur-in';
        info.innerHTML = `Latitude: ${parsedResponse.lat}, longitude: ${parsedResponse.lon}`;

        resetButton.style.display = 'block';
    }).catch(e => {
        let status = e.status,
            response = e.response;

        if (status === 400 || status === 429) {
            info.className = 'blur-in';
            info.innerHTML = JSON.parse(response).errors || JSON.parse(response).error;
        }

        idLocation.className = 'error blur-in';
        idLocation.firstElementChild.innerHTML = `E: ${status}`;
        resetButton.style.display = 'block';
    });

    info.className = '';

    return false;
};

resetButton.onclick = () => {
    idLocation.className = '';
    idLocation.firstElementChild.innerHTML = '';
    resetButton.style.display = 'none';
    mainForm.style.display = 'flex';
    inputLatitude.value = '';
    inputLongitude.value = '';
    info.innerHTML = '';

    return false;
};