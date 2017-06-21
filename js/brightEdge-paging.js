(function iife() {
    globCon.config.nextPage = nextPage;
    globCon.config.prevPage = prevPage;
    globCon.config.changePage = changePage;
    globCon.config.numPages = numPages;
    globCon.config.current_page = 1;

    function prevPage() {
        if (globCon.config.current_page > 1) {
            globCon.config.current_page--;
            globCon.config.changePage(globCon.config.current_page);
        }
    }

    function nextPage() {
        if (globCon.config.current_page < globCon.config.numPages()) {
            globCon.config.current_page++;
            globCon.config.changePage(globCon.config.current_page);
        }
    }

    function changePage(page) {
        var btn_next = document.getElementById("btn_next");
        var btn_prev = document.getElementById("btn_prev");
        var page_span = document.getElementById("page");
        var records_per_page = globCon.config.end;

        // Validate page
        if (page <= 1) page = 1;
        if (page > globCon.config.numPages()) page = globCon.config.numPages();

        globCon.config.dynamicTable((page - 1) * records_per_page, (page * records_per_page));
        page_span.innerHTML = page;

        if (page == 1) {
            btn_prev.style.visibility = "hidden";
        } else {
            btn_prev.style.visibility = "visible";
        }

        if (page == globCon.config.numPages()) {
            btn_next.style.visibility = "hidden";
        } else {
            btn_next.style.visibility = "visible";
        }
    }

    function numPages() {
        // number of pages = next integer of (total data to display/ total data per page)
        return Math.ceil(globCon.config.rows.length / globCon.config.end);
    }
})();