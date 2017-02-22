/**
 * Created by Andrey on 09.12.2016.
 */
'use strict';

var currentPage = 1;
var countPage;

var pages = [];

window.onload = function () {
    getPeoples();
};

function getPeoples() {
    sendAjax(handlePeople);
}

function sendAjax(callBack) {
    var ajax = new XMLHttpRequest();
    var url = "http://109.202.0.226/adapter-web/rest/dictionary/2d3dbf22-f333-43f3-9ae0-56a4728f8aaf";
    ajax.open("GET", url);
    ajax.send();

    ajax.onload = function () {
        if (callBack) {
            callBack(ajax.responseText);
        }
    }
}
function handlePeople(peoples) {
    var peoples = JSON.parse(peoples);
    var documents = peoples.documents;

    documents.forEach(function (elem) {
        console.log(elem.birthDate + " <-> " + getTime(elem.birthDate));
    });

    pages = splitAtPages(documents);
    countPage = pages.length;

    changeFabVisibility();
    changePageLabel();

    var slider = document.getElementById("slider");
    slider.max = countPage;

    drawUsers(pages[currentPage - 1]);

}

function splitAtPages(documents) {
    var pages = [];
    var page = [];

    for (var iter = 0, i = 0; iter < documents.length; ++iter, ++i) {
        if (i == 6) {
            pages.push(page);
            page = [];
            i = 0;
        }
        page.push(documents[iter]);
    }
    if (i != 0) {
        pages.push(page);
    }
    return pages;
}

function drawUsers(page) {
    var mainContainer = document.getElementById("main_container");
    var listView = document.createElement("ul");
    listView.className = "demo-list-three mdl-list";

    if (page.length == 0) {
        mainContainer.replaceChild(listView, mainContainer.firstElementChild);
        console.log("success!");
    }


    var listElem;
    var textNode;

    page.forEach(function (doc) {
        var firstName = doc.firstName;
        var lastName = doc.lastName;
        var patronymic = doc.patronymic;
        var gender = doc.gender;
        var birthDate = doc.birthDate;
        var phone = doc.phone;
        var avatar = doc.avatar;

        listElem = document.createElement("li");
        listElem.className = "mdl-list__item mdl-list__item--three-line";

        var externalSpan = document.createElement("span");
        externalSpan.className = "mdl-list__item-primary-content";

        var img = document.createElement("img");
        img.className = "material-icons mdl-list__item-avatar";
        img.src = avatar;

        var titleSpan = document.createElement("span");
        textNode = document.createTextNode(firstName + " " + lastName + " " + patronymic);
        titleSpan.appendChild(textNode);

        var bodySpan = document.createElement("span");
        bodySpan.className = "mdl-list__item-text-body";
        textNode = document.createTextNode("Дата рождения : " + birthDate + "; Телефон: " + phone);
        bodySpan.appendChild(textNode);

        externalSpan.appendChild(img);
        externalSpan.appendChild(titleSpan);
        externalSpan.appendChild(bodySpan);

        listElem.appendChild(externalSpan);
        listView.appendChild(listElem);

    });

    mainContainer.replaceChild(listView, mainContainer.firstElementChild);
    console.log("success!");
}

function sort() {
    console.log("sort");
    var radios = document.getElementsByName("radio_sort");
    var checked = "radio";
    radios.forEach(function (radio) {
        if (radio.checked) {
            checked = radio.value
        }
    });

    var list = [];

    pages.forEach(function (page) {
        page.forEach(function (element) {
            list.push(element);
        });
    });


    switch (checked) {
        case "radio_name":
            list.sort(function (elem1, elem2) {
                if (elem1.lastName < elem2.lastName) {
                    return -1;
                } else if (elem1.lastName > elem2.lastName) {
                    return 1;
                }
                return 0;
            });
            break;
        case "radio_date":
            list.sort(function (elem1, elem2) {
                return parseInt(getTime(elem1.birthDate)) - parseInt(getTime(elem2.birthDate));
            });
            break;
        default: return;
    }
    pages = splitAtPages(list);
    drawUsers(pages.length == 0 ? pages : pages[currentPage - 1]);

}

function getTime(string) {
    var ar = string.split(' ');
    var day = parseInt(ar[0]);
    var year = parseInt(ar[2]);
    var month = 1;

    switch (ar[1]) {
        case "января": month = 1; break;
        case "февраля": month = 2; break;
        case "марта": month = 3; break;
        case "апреля": month = 4; break;
        case "мая": month = 5; break;
        case "июня": month = 6; break;
        case "июля": month = 7; break;
        case "августа": month =8; break;
        case "сентября": month = 9; break;
        case "октября": month = 10; break;
        case "ноября": month = 11; break;
        case "декабря": month = 12; break;
    }

    return Date.parse(year + "-" + month + "-" + day);
}

function searchUser() {
    console.log("search user");
    var textView = document.getElementById("search_text");
    var text = textView.value;

    var result = [];

    pages.forEach(function (page) {
        page.forEach(function (user) {
            var fio = user.firstName + " " +
                user.lastName + " " +
                user.patronymic;
            fio = fio.toLowerCase();

            if (fio.search(text.toLowerCase()) != -1) {
                result.push(user);
            }
        });
    });
    pages = splitAtPages(result);

    countPage = pages.length == 0 ? 1 : pages.length;
    currentPage = 1;

    changeFabVisibility();
    changePageLabel();

    var slider = document.getElementById("slider");
    slider.max = countPage == 0 ? 1 : countPage;

    drawUsers(pages.length == 0 ? pages : pages[currentPage - 1]);
}

function changePageLabel() {
    var label = document.getElementById("slider_label");
    var tn = document.createTextNode(currentPage + " / " + countPage);
    label.replaceChild(tn, label.firstChild);
}

function pageUp() {
    changePage(parseInt(currentPage) + 1);
}
function pageDown() {
    changePage(parseInt(currentPage) - 1);
}

function changeFabVisibility() {
    var down = document.getElementById("fab_down_page");
    var up = document.getElementById("fab_up_page");
    if (currentPage == countPage && currentPage == 1) {
        down.style.visibility = "hidden";
        up.style.visibility = "hidden";
        return;
    }
    down.style.visibility = "visible";
    up.style.visibility = "visible";
    switch (currentPage) {
        case 1:
            down.style.visibility = "hidden";
            break;
        case countPage:
            up.style.visibility = "hidden";
            break;
    }
}

function changePage(value) {
    document.getElementById("slider").value = value;
    currentPage = parseInt(value);
    changeFabVisibility();
    changePageLabel();
    drawUsers(pages[currentPage - 1]);
}