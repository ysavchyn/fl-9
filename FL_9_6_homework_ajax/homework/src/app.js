let trackButton = document.getElementById('track'),
    resetButton = document.getElementById('reset'),
    inWater = document.getElementById('in-water'),
    onEarth = document.getElementById('on-earth'),
    mainForm = document.getElementById('main-form'),
    data = document.getElementById('data'),
    inputLatitude = document.getElementById('latitude'),
    inputLongitude = document.getElementById('longitude'),
    loading = document.getElementById('loading');

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
            reject(request.statusText);
        };

        request.send(null);
    });
};

trackButton.onclick = function () {
    let latitude = inputLatitude.value,
        longitude = inputLongitude.value;

    http.get(`https://api.onwater.io/api/v1/results/${latitude},${longitude}`).then(response => {
        //console.log(response); //for debug
        let parsedResponse = JSON.parse(response);
        if (parsedResponse.water) {
            inWater.style.display = 'block';
        } else {
            onEarth.style.display = 'block';
        }
        data.innerHTML = `<b>Latitude:</b> ${parsedResponse.lat}, <b>longitude:</b> ${parsedResponse.lon}`;
        resetButton.style.display = 'block';
    }).catch(e => {
        let status = e.status,
            response = e.response;

        if (status === 400) {
            data.innerHTML = response;
        } else {
            data.innerHTML = `Error code: ${status}`;
        }

        resetButton.style.display = 'block';
    });

    return false;
};

resetButton.onclick = () => {
    inWater.style.display = 'none';
    onEarth.style.display = 'none';
    resetButton.style.display = 'none';
    mainForm.style.display = 'flex';
    inputLatitude.value = '';
    inputLongitude.value = '';
    data.innerHTML = '';

    return false;
};