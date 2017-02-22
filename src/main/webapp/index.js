/**
 * Created by Andrey on 22.02.2017.
 */
var user;
var responseMessageCount = 0;
var historyMessageCount = 0;

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

function handleUser(userJson) {
    var user = JSON.parse(userJson);

    if (user.login == null) {
        ajaxError();
    } else {
        ajaxSuccess(user);
    }
//            toast("Ответ получен");
}

function ajaxSuccess(userResp) {
    var container = document.getElementById("tab-2-table");

    var tr = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.className = "mdl-data-table__cell--non-numeric";
    var td2 = document.createElement("td");
    td2.className = "mdl-data-table__cell--non-numeric";
    var td3 = document.createElement("td");

    var date = new Date();
    var dateField = document
        .createTextNode(date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " "
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    var fio = document
        .createTextNode(userResp.firstname + " " + userResp.lastname + " " + userResp.surname);
    var email = document
        .createTextNode(userResp.email);

    td1.appendChild(dateField);
    td2.appendChild(fio);
    td3.appendChild(email);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    container.appendChild(tr);

    addHistory("Success");

    responseMessageCount++;
    historyMessageCount++;
    updateBadges();
}

function ajaxError() {
    addHistory("Fail");

    historyMessageCount++;
    updateBadges();
}

function addHistory(type) {
    var container = document.getElementById("tab-3-table");

    var tr = document.createElement("tr");

    var td1 = document.createElement("td");
    td1.className = "mdl-data-table__cell--non-numeric";
    var td2 = document.createElement("td");
    td2.className = "mdl-data-table__cell--non-numeric";
    var td3 = document.createElement("td");

    var date = new Date();
    var dateField = document
        .createTextNode(date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " "
            + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    var us = document
        .createTextNode(user.login + " " + user.password);
    var status = document
        .createTextNode(type);

    td1.appendChild(dateField);
    td2.appendChild(us);
    td3.appendChild(status);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    container.appendChild(tr);
}

function toast(text) {
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: text};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function clearBadges(tab) {
    if (tab == 'resp') {
        responseMessageCount = 0;
    } else if (tab == 'hist') {
        historyMessageCount = 0;
    }
    updateBadges();
}

function updateBadges() {
    var resp = document.getElementById("badges_response");
    var hist = document.getElementById("badges_history");

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