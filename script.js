$(document).ready(function () {
    // hide what needs to be hidden initially
    $("#card1").hide();
    $("#card2").hide();

    $("#dress").click(function (e) {
        $("#card2").hide();
        $("#card1").show();
        getDress();
    });

    $("#outfit").click(function (e) {
        $("#card1").show();
        $("#card2").show();
        getOutfit();
    })
});

function getDress() {
    let categoryKeyword = "dress";
    let categoryURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Cotton&hasImages=true&q=${categoryKeyword}`;
    $.getJSON(categoryURL, function (result) {
        // get ID of a random object
        let objectID = getRandomObject(result.objectIDs, result.total);
        displayObject(objectID, true);
    });
}

function sanitiseData(data, isYear) {
    if (isYear === true) {
        return data.substr(0, 27).trim() + "...";
    }
    else {
        if (data.length >= 35 && data.length <= 37) {
            return data.substr(0, 32).trim() + "...";
        } else {
            return data.substr(0, 35).trim() + "...";
        }
    }
}

function displayCardOne(result) {
    $("#card1 .image").attr("src", result.primaryImageSmall);
    if (result.title !== "") {
        $("#card1 > .title").html(result.title).append(`<a class="dynamic-link" target="_blank" href="${result.objectURL}"> [&#128279;]</a>`);
    } else {
        $("#card1 > .title").html("N/A").append(`<a class="dynamic-link" target="_blank" href="${result.objectURL}"> [&#128279;]</a>`);
    }
    if (result.artistDisplayName !== "") {
        $("#card1 > .by").html(result.artistDisplayName).prepend("<span>by</span>");
    } else {
        $("#card1 > .by").html("N/A").prepend("<span>by</span>");
    }
    if (result.isHighlight === true) {
        $("#card1 > .trending").html("Yep").prepend("<span>trending</span>");
    } else {
        $("#card1 > .trending").html("Kinda").prepend("<span>trending</span>");
    }
    if (result.objectDate !== "") {
        $("#card1 > .year").html(result.objectDate).prepend("<span>year</span>");
    } else {
        $("#card1 > .year").html("N/A").prepend("<span>year</span>");
    }
    if (result.culture !== "") {
        $("#card1 > .style").html(result.culture).prepend("<span>style</span>");
    } else {
        $("#card1 > .style").html("N/A").prepend("<span>style</span>");
    }
}

function displayCardTwo(result) {
    $("#card2 .image").attr("src", result.primaryImageSmall);
    if (result.title !== "") {
        $("#card2 > .title").html(result.title).append(`<a class="dynamic-link" target="_blank" href="${result.objectURL}"> [&#128279;]</a>`);
    } else {
        $("#card2 > .title").html("N/A").append(`<a class="dynamic-link" target="_blank" href="${result.objectURL}"> [&#128279;]</a>`);
    }
    if (result.artistDisplayName !== "") {
        $("#card2 > .by").html(result.artistDisplayName).prepend("<span>by</span>");
    } else {
        $("#card2 > .by").html("N/A").prepend("<span>by</span>");
    }
    if (result.isHighlight === true) {
        $("#card2 > .trending").html("Yep").prepend("<span>trending</span>");
    } else {
        $("#card2 > .trending").html("Kinda").prepend("<span>trending</span>");
    }
    if (result.objectDate !== "") {
        $("#card2 > .year").html(result.objectDate).prepend("<span>year</span>");
    } else {
        $("#card2 > .year").html("N/A").prepend("<span>year</span>");
    }
    if (result.culture !== "") {
        $("#card2 > .style").html(result.culture).prepend("<span>style</span>");
    } else {
        $("#card2 > .style").html("N/A").prepend("<span>style</span>");
    }
}

function displayObject(objectID, cardOne) {
    let objectURL = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;
    $.getJSON(objectURL, function (result) {
        // fix data if needed
        if (result.title.length >= 35) {
            result.title = sanitiseData(result.title, false);
        } else if (result.objectDate.length >= 30) {
            result.objectDate = sanitiseData(result.objectDate, true);
        } else if (result.artistDisplayName >= 38) {
            result.artistDisplayName = sanitiseData(result.artistDisplayName, false);
        }
        // display object
        if (cardOne === true) {
            displayCardOne(result);
        } else {
            displayCardTwo(result);
        }
    });
}

function getRandomObject(objectArray, total) {
    let i = Math.floor(Math.random() * total); // if total = 85 then, 0 –> 84
    return objectArray[i];
}

function getBlouse() {
    let categoryKeyword = "blouse";
    let categoryURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Cotton&hasImages=true&q=${categoryKeyword}`;
    $.getJSON(categoryURL, function (result) {
        let objectID = getRandomObject(result.objectIDs, result.total);
        displayObject(objectID, true);
    });
}

function getSkirt() {
    let categoryKeyword = "skirt";
    let categoryURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?medium=Cotton&hasImages=true&q=${categoryKeyword}`;
    $.getJSON(categoryURL, function (result) {
        let objectID = getRandomObject(result.objectIDs, result.total);
        displayObject(objectID, false);
    });
}

function getOutfit() {
    getBlouse();
    getSkirt();
}