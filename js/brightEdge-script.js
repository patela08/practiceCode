var globCon = {};
(function iife() {
    var xhttp, current_page, totalOptions, records_per_page,
        totalData, objJson, config, current_page,  records_per_page;
    xhttp = new XMLHttpRequest();
    current_page = 1;
    records_per_page = 2;
    totalOptions = document.getElementById("optionSelected");
    totalOptions.addEventListener("change", optionChanged);

    globCon.config = {
        pages: 10,
        start: 0,
        end: 2,
        dynamicTable: dynamicTable,
        // nextPage: nextPage,
        // prevPage: prevPage,
        changePage: changePage,
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
        globCon.config.rows = JSON.parse(data);
        pagination();
    }

    function dynamicTable(start, end) {
        // var data = JSON.parse(dataTodisplay);
        // objJson = data;
        // totalData = data.length;
        var result = '';
        var value = globCon.config.rows;
        var lindex = globCon.config.rows.length - 1;
        if (end > lindex) {
            end = lindex;
        }
        for (var i = start; i < end; i++) {
            result += "<tr><td data-label='name'>" + value[i].name +
                "</td><td data-label='email'>" + value[i].email +
                "</td><td data-label='phonenumber'>" + value[i].phone +
                "</td><td data-label='city'>" + value[i].address.city +
                "</td><td data-label='website'>" + value[i].website +
                "</td></tr>"
        };
        document.getElementById("dataToDisplay").innerHTML = result;
    }
    fetchData();
    // function prevPage() {
    //         if (current_page > 1) {
    //             current_page--;
    //             changePage(current_page);
    //         }
    //     }

    //     function nextPage() {
    //         console.log("sdfjlkdsff");
    //         if (current_page < numPages()) {
    //             current_page++;
    //             changePage(current_page);
    //         }
    //     }
        function changePage(page) {
            var btn_next = document.getElementById("btn_next");
            var btn_prev = document.getElementById("btn_prev");
            // var listing_table = document.getElementById("listingTable");
            var page_span = document.getElementById("page");

            // Validate page
            if (page < 1) page = 1;
            if (page > numPages()) page = numPages();

            // listing_table.innerHTML = "";
            globCon.config.dynamicTable((page - 1) * records_per_page, (page * records_per_page));
            // for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
            //     listing_table.innerHTML += objJson[i].adName + "<br>";
            // }
            page_span.innerHTML = page;

            if (page == 1) {
                btn_prev.style.visibility = "hidden";
            } else {
                btn_prev.style.visibility = "visible";
            }

            if (page == numPages()) {
                btn_next.style.visibility = "hidden";
            } else {
                btn_next.style.visibility = "visible";
            }
        }


    function pagination() {
        current_page = 1;
        records_per_page = globCon.config.end;
        console.log(globCon.config.end);

        

        
        function numPages() {
            return Math.ceil(globCon.config.rows.length / records_per_page);
        }


        dynamicTable(globCon.config.start, globCon.config.end);
    }
    window.onload = function() {
    changePage(1);
};

}());