const kinveyBaseUrl = "https://baas.kinvey.com/";
const kinveyAppKey = "kid_BylF_JFlV";
const kinveyAppSecret = "c4455bd0830e4b84ad004532332cf420";

// Creates the authentication header
function makeAuth(type) {
    return type === 'basic'
        ?  'Basic ' + btoa(kinveyAppKey + ':' + kinveyAppSecret)
        :  'Kinvey ' + sessionStorage.getItem('authtoken');
}

// Creates the URL
function makeUrl(module, endpoint, query) {
    let url = kinveyBaseUrl + module + '/' + kinveyAppKey + '/' + endpoint;
    if (query) {
        url += '?query=' + JSON.stringify(query);
    }
    return url
}

// Function to return POST promise
function post (module, endpoint, auth, data) {
    let url = makeUrl(module, endpoint)
    data = JSON.stringify(data)

    return fetch(url, {
        method: "POST",
        headers: {
            Authorization: makeAuth(auth),
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(res => res.json())
}

// Function to return GET promise
function get (module, endpoint, auth, query) {
    let url = makeUrl(module, endpoint, query)

    return fetch(url, {
        method: "GET",
        headers: {
            Authorization: makeAuth(auth),
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())   
}


// Function to return PUT promise
function update (module, endpoint, auth, data) {
    let url = makeUrl(module, endpoint)
    data = JSON.stringify(data)

    return fetch(url, {
        method: "PUT",
        headers: {
            Authorization: makeAuth(auth),
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(res => res.json())
}

// // Function to return DELETE promise
function remove (module, endpoint, auth) {
    let url = makeUrl(module, endpoint)

    return fetch(url, {
        method: "DELETE",
        headers: {
            Authorization: makeAuth(auth),
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())

}

export default {
    get,
    post,
    update,
    remove
}