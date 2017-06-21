(function iife() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("filteredSearch");

    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    input.addEventListener("keyup", filtering);

    function filtering() {
        filter = input.value.toLowerCase();
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }
})()