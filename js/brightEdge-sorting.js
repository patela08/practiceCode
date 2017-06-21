function sortTable(table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            *
            (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                .localeCompare(b.cells[col].textContent.trim())
            );
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
}

function makeSortable(table) {

    var th = table.tHead,
        i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return; // if no `<thead>` then do nothing
    while (--i >= 0)(function (i) {
        var dir = 1;
        // var temp = 0;
        th[i].addEventListener('click', function () {
            if (this.className == "sort asd" || this.className == "dsc asd") {
                this.className = "asc";         
                // this.className  += " asd";
            } else {
                this.className = "dsc";
                // this.className  += " asd";
            }
             
            console.log(this.className);
            var els = document.getElementsByClassName("asd");
            var j = els.length;
            while(j--){
                console.log("sdf");
                els[j].className = "sort asd";
            }
            this.className += " asd";
            sortTable(table, i, (dir = 1 - dir))
        });
        console.log(document.getElementsByClassName("asd")[i]);
        document.getElementsByClassName("asd")[i].className = "sort";
    }(i));
    // document.getElementsByClassName("asd")[i].className = "sort";
}

function makeAllSortable(parent) {
    parent = parent || document.body;
    var t = parent.getElementsByTagName('table'),
        i = t.length;
    while (--i >= 0) makeSortable(t[i]);
}

// document.getElementsByClassName('sort')[0].addEventListener("click", function () {
//     // this.style.
//     console.log(this.style);
// })

window.onload = function () {
    makeAllSortable();
};