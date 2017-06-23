// declared a global object to share data between different modules.
var globCon = {};
(function iife() {
    var xhttp, current_page, totalOptions, totalData, objJson, config, records_per_page;
    xhttp = new XMLHttpRequest();
    totalOptions = document.getElementById("optionSelected");
    //whenever there is a change in selection of enteries per page, 
    //rerender the dom according to number of enteries starting from first page
    totalOptions.addEventListener("change", optionChanged);

    globCon.config = {
        start: 0,
        end: 2,
        dynamicTable: dynamicTable,
        rows: null
    }

    function optionChanged() {
        globCon.config.end = totalOptions.options[totalOptions.selectedIndex].text;
        pagination();
    }

    function fetchData() {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                addDatatoConfig(xhttp.response);
            }

        };
        xhttp.open("GET", "./api/users-data.json", true);
        xhttp.send();

    }

    function addDatatoConfig(data) {
        //store the data from server in rows property 
        globCon.config.rows = JSON.parse(data);
        pagination();
    }

    function dynamicTable(start, end) {
        var result = '';
        var value = globCon.config.rows;
        if (end > value.length - 1) {
            end = value.length - 1;
        }
        for (var i = start; i < end; i++) {
            result += "<tr><td data-label='name' contenteditable='true'>" + value[i].name +
                "</td><td data-label='email' contenteditable='true'>" + value[i].email +
                "</td><td data-label='phonenumber' contenteditable='true'>" + value[i].phone +
                "</td><td data-label='city' contenteditable='true'>" + value[i].address.city +
                "</td><td data-label='website' contenteditable='true'>" + value[i].website +
                "</td></tr>"
        };
        document.getElementById("dataToDisplay").innerHTML = result;
    }
    fetchData();

    function pagination() {
        globCon.config.current_page = 1;
        globCon.config.changePage(globCon.config.current_page);
    }

    document.getElementById("hideColumn").addEventListener("click", hideColumn);
    document.getElementById("showColumn").addEventListener("click", showColumn);
    var selectedColumn = document.getElementById("optionSelectedForColumn");
    selectedColumn.addEventListener("change", columnOptions);
    var selectedText = selectedColumn[selectedColumn.selectedIndex].value;

    function columnOptions() {
        selectedText = selectedColumn[selectedColumn.selectedIndex].value;
    }

    function hideShowColumn(dsply) {
        var tHead = document.getElementsByTagName("th");
        var tBody = document.getElementsByTagName("td");
        for (var i = 0; i < tHead.length; i++) {
            if (tHead[i].getAttribute("data-label").toLowerCase() == selectedText.toLowerCase()) {
                tHead[i].style.display = dsply;
                break;
            }
        }
        for (var j = 0; j < tBody.length; j++) {
            if (tBody[j].getAttribute("data-label").toLowerCase() == selectedText.toLowerCase()) {
                tBody[j].style.display = dsply;

            }
        }
    }

    function showColumn() {
        hideShowColumn('block');
    }

    function hideColumn() {
        hideShowColumn('none');
    }

}());