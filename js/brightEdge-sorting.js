(function iife() {
    function sortTable(table, col, reverse) {
        temp = col;
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
    var temp = 0;

    function makeSortable(table) {

        var th = table.tHead,
            i;
        th && (th = th.rows[0]) && (th = th.cells);
        if (th) i = th.length;
        else return; // if no `<thead>` then do nothing
        while (--i >= 0)(function (i) {
            var dir = 1;
            th[i].addEventListener('click', function () {
                if (temp !== i) {
                    document.querySelectorAll("th")[temp].className = "sort";
                }
                if (this.className == "sort" || this.className == "dsc") {
                    this.className = "asc";
                } else {
                    this.className = "dsc";
                }
                sortTable(table, i, (dir = 1 - dir))
            });
        }(i));
    }

    function makeAllSortable(parent) {
        parent = parent || document.body;
        var t = parent.getElementsByTagName('table'),
            i = t.length;
        while (--i >= 0) makeSortable(t[i]);
    }

    window.onload = function () {
        makeAllSortable();
    };
})();