/**
 * Created by Andrey on 22.02.2017.
 */

var responseMap = [];
var user;
var requestMessageCount = 0;
var responseMessageCount = 0;
var historyMessageCount = 0;
var activeTab = 1;

function mySub() {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    if (login.length == 0 || password.length == 0) {
        toast('Все поля должны быть заполнены!');
        return;
    }
    document.getElementById("login").value = "";
    document.getElementById("password").value = "";

    user = {"login" : login, "password" : password};

    sendUserAjax(user, handleUser);
}

function sendUserAjax(user, callback) {
    var ajax = new XMLHttpRequest();
    var url = "http://localhost:8080/smartcity-0.1/post_user";
    ajax.open("POST", url);
    ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    ajax.send(JSON.stringify(user));

    ajax.onload = function () {
        if (callback) {
            callback(ajax.responseText);
        } else {
            console.log("callback undefined");
        }
    }
}

function handleUser(response) {
    console.log(response);
    var xmlDoc = new DOMParser().parseFromString(response, "text/xml");

    var error = {};
    var user = {};

    if (xmlDoc.getElementsByTagName("error").length != 0) {
        error.type = xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue;
        error.message = xmlDoc.getElementsByTagName("message")[0].childNodes[0].nodeValue;
        ajaxError(error);
        return;
    }

    user.firstname = xmlDoc.getElementsByTagName("firstname")[0].childNodes[0].nodeValue;
    user.lastname = xmlDoc.getElementsByTagName("lastname")[0].childNodes[0].nodeValue;
    user.surname = xmlDoc.getElementsByTagName("surname")[0].childNodes[0].nodeValue;
    user.email = xmlDoc.getElementsByTagName("email")[0].childNodes[0].nodeValue;

    ajaxSuccess(user);
}

function ajaxSuccess(userResp) {
    var requestId = generateRequestId();
    var node = {};
    node.id = requestId;
    node.response = userResp;
    responseMap.push(node);

    addResponse(userResp);
    addHistory('success', userResp.email, requestId);

    responseMessageCount = 1;
    historyMessageCount++;
    updateBadges();
}

function ajaxError(error) {
    var requestId = generateRequestId();
    var node = {};
    node.id = requestId;
    node.response = error;
    responseMap.push(node);

    addResponse(error);
    addHistory('error', error.message, requestId);

    responseMessageCount = 1;
    historyMessageCount++;
    updateBadges();
}

function addResponse(resp) {
    var container = document.getElementById("response-card");
    var card = document.createElement("div");
    card.className = "demo-card-wide mdl-card mdl-shadow--2dp";

    var title = document.createElement("div");
    title.className = "mdl-card__title";
    var titHead = document.createElement("h2");
    titHead.className = "mdl-card__title-text";
    var titleText;

    var body = document.createElement("div");
    body.className = "mdl-card__supporting-text";
    var bodyText;

    if (resp.firstname) {
        title.style.background = "url('img/success.jpg') center / cover";
        titleText = document.createTextNode(resp.firstname + " " + resp.lastname + " " + resp.surname);
        bodyText = document.createTextNode(resp.email);
    } else {
        title.style.background = "url('img/error.jpg') center / cover";
        titleText = document.createTextNode("Error: " + resp.type);
        bodyText = document.createTextNode(resp.message);
    }
    body.appendChild(bodyText);
    titHead.appendChild(titleText);
    title.appendChild(titHead);

    card.appendChild(title);
    card.appendChild(body);

    container.replaceChild(card, container.firstElementChild);
}

function addHistory(type, res, requestId) {
    var container = document.getElementById("tab-3-table");

    var tr = document.createElement("tr");
    tr.onclick = function () {
        showRequest(this);
    };

    var td1 = document.createElement("td");
    td1.className = "mdl-data-table__cell--non-numeric";
    var td2 = document.createElement("td");
    td2.className = "mdl-data-table__cell--non-numeric";
    var td3 = document.createElement("td");
    td3.className = "mdl-data-table__cell--non-numeric";
    var td4 = document.createElement("td");
    td4.className = "mdl-data-table__cell--non-numeric";
    var td5 = document.createElement("td");
    td5.className = "mdl-data-table__cell--non-numeric";
    var td6 = document.createElement("td");
    td6.id = "requestId";
    td6.className = "mdl-data-table__cell--non-numeric";
    td6.style.display = "none";

    var date = new Date();
    var dateField = document
        .createTextNode(date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " "
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    var login = document
        .createTextNode(user.login);
    var password = document
        .createTextNode(user.password);
    var status = document
        .createTextNode(type);
    var result = document
        .createTextNode(res);
    var requestId = document
        .createTextNode(requestId);

    td1.appendChild(dateField);
    td2.appendChild(login);
    td3.appendChild(password);
    td4.appendChild(status);
    td5.appendChild(result);
    td6.appendChild(requestId);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    container.appendChild(tr);
}

function showRequest(row) {
    var id = row.lastElementChild.innerHTML;
    console.log(id);
    responseMap.forEach(function (node) {
        if (node.id == id) {
            addResponse(node.response);
            document.getElementById("login").value = row.childNodes[1].innerHTML;
            document.getElementById("password").value = row.childNodes[2].innerHTML;
            requestMessageCount = 1;
            responseMessageCount = 1;
            updateBadges();
        }
    })
}

function toast(text) {
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: text};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function generateRequestId() {
    return Math.random().toString(36).substr(3, 12);
}

function clickTab(tab) {
    switch (tab) {
        case 'req':
            activeTab = 1;
            break;
        case 'resp':
            activeTab = 2;
            break;
        case 'hist':
            activeTab = 3;
            break;
    }
    clearBadges(tab);
}

function clearBadges(tab) {
    if (tab == 'resp') {
        responseMessageCount = 0;
    } else if (tab == 'hist') {
        historyMessageCount = 0;
    } else {
        requestMessageCount = 0;
    }
    updateBadges();
}

function updateBadges() {
    var req = document.getElementById("badges_request");
    var resp = document.getElementById("badges_response");
    var hist = document.getElementById("badges_history");


    if (activeTab == 1) {
        requestMessageCount = 0;
    }
    if (activeTab == 2) {
        responseMessageCount = 0;
    }
    if (activeTab == 3) {
        historyMessageCount = 0;
    }

    if (requestMessageCount == 0) {
        req.style.visibility = "hidden";
    } else {
        req.setAttribute("data-badge", requestMessageCount);
        req.style.visibility = "visible";
    }

    if (responseMessageCount == 0) {
        resp.style.visibility = "hidden";
    } else {
        resp.setAttribute("data-badge", responseMessageCount);
        resp.style.visibility = "visible";
    }

    if (historyMessageCount == 0) {
        hist.style.visibility = "hidden";
    } else {
        hist.setAttribute("data-badge", historyMessageCount);
        hist.style.visibility = "visible";
    }

}