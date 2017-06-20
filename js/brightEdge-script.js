(function iife() {
    var xhttp, current_page, totalOptions, records_per_page, totalData, objJson, config;
    xhttp = new XMLHttpRequest();
    current_page = 1;
    records_per_page = 2;
    totalOptions = document.getElementById("optionSelected");
    totalOptions.addEventListener("change", optionChanged);

    config = {
        pages: 10,
        start: 0,
        end: 2,
        rows: null
    }

    function optionChanged() {
        config.end = totalOptions.options[totalOptions.selectedIndex].text;
        fetchData();
    }

    function fetchData(){
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                addDatatoConfig(xhttp.response);
            }
            
        };
        xhttp.open("GET", "./api/users-data.json", true);
        xhttp.send();
        
    }
    function addDatatoConfig(data){
        config.rows = JSON.parse(data);
        pagination();
    }
    function dynamicTable(start,end) {
        // var data = JSON.parse(dataTodisplay);
        // objJson = data;
        // totalData = data.length;
        var result = '';
        var value = config.rows
        console.log(config)
        var lindex = config.rows.length - 1;
        if(end > lindex){
            end = lindex;
        }
        for(var i = start ; i<end ; i++){
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
    
    function pagination(){
        dynamicTable(config.start,config.end);
    }
    function pager(data,show){

    }

   

}());