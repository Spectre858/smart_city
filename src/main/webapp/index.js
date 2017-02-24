/**
 * Created by Andrey on 22.02.2017.
 */
var user;
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
    addResponse(userResp);
    addHistory('success', userResp.email);

    responseMessageCount++;
    historyMessageCount++;
    updateBadges();
}

function ajaxError() {
    addResponse(null);
    addHistory('fail', 'User does not exist');

    responseMessageCount++;
    historyMessageCount++;
    updateBadges();
}

function addResponse(userResp) {
    var container = document.getElementById("tab-2-table");
    var tr = document.createElement("tr");

    var date = new Date();

    if (userResp) {
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

        var dateField = document
            .createTextNode(date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " "
                + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
        var first = document
            .createTextNode(userResp.firstname);
        var last = document
            .createTextNode(userResp.lastname);
        var sur = document
            .createTextNode(userResp.surname);
        var email = document
            .createTextNode(userResp.email);

        td1.appendChild(dateField);
        td2.appendChild(first);
        td3.appendChild(last);
        td4.appendChild(sur);
        td5.appendChild(email);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        container.appendChild(tr);
    } else {
        var td1 = document.createElement("td");
        td1.className = "mdl-data-table__cell--non-numeric";
        var td2 = document.createElement("td");
        td2.className = "mdl-data-table__cell--non-numeric";
        td2.colSpan = "4";

        var dateField = document
            .createTextNode(date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " "
                + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
        var text = document
            .createTextNode("Such user does not exist");

        td1.appendChild(dateField);
        td2.appendChild(text);
        tr.appendChild(td1);
        tr.appendChild(td2);
        container.appendChild(tr);
    }
}

function addHistory(type, res) {
    var container = document.getElementById("tab-3-table");

    var tr = document.createElement("tr");

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

    td1.appendChild(dateField);
    td2.appendChild(login);
    td3.appendChild(password);
    td4.appendChild(status);
    td5.appendChild(result);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    container.appendChild(tr);
}

function toast(text) {
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: text};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function clickTab(tab) {
    switch (tab) {
        case 'req':
            activeTab = 1;
            break;
        case 'resp':
            activeTab = 2;
            clearBadges(tab);
            break;
        case 'hist':
            activeTab = 3;
            clearBadges(tab);
            break;
    }
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

    if (activeTab == 2) {
        responseMessageCount = 0;
    }
    if (activeTab == 3) {
        historyMessageCount = 0;
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