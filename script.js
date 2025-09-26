function search() {
    console.log('Searching.......');

    let inputTag = document.getElementById('na');
    let name = inputTag.value.trim();

    if (name === "") {
        alert("Please enter a movie name!");
        return;
    }

    let key = "530fbc62"; // API key
    let url = "http://www.omdbapi.com/?apikey=" + key + "&t=" + name;

    console.log("Requesting:", url);

    let httprequest = new XMLHttpRequest();
    httprequest.open("GET", url);
    httprequest.responseType = "json";

    httprequest.onload = function () {
        if (httprequest.status === 200) {
            let response = httprequest.response;
            console.log(response);

            if (response.Response === "True") {
                document.getElementById("result").innerHTML = `
                    <h2>${response.Title} (${response.Year})</h2>
                    <p><strong>Genre:</strong> ${response.Genre}</p>
                    <p><strong>Director:</strong> ${response.Director}</p>
                    <p><strong>Actors:</strong> ${response.Actors}</p>
                    <p><strong>Plot:</strong> ${response.Plot}</p>
                    <img src="${response.Poster}" alt="Poster" />
                `;
            } else {
                document.getElementById("result").innerHTML = `<p>Movie not found!</p>`;
            }
        } else {
            console.error("Error fetching data:", httprequest.status);
        }
    };

    httprequest.send();
}
