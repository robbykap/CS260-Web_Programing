document.addEventListener('DOMContentLoaded', function() {

    const createPost = document.querySelector('#createPost');

    createPost.addEventListener('click', function(e) {
        e.preventDefault();

        // Checks if user is logged in
       if (!localStorage.getItem('user')) {
            alert("Please login to create a post");
            return;
        }
        // Redirects to ask page
        else {
            window.location.href = 'ask.html';
        }
    });

    fetch("json/qa.json")

    .then((response) => response.json())
    .then((data) => {

        // Add data to table
        data.forEach((row) => {
        $("#qa").append(
            '<tr>' +
            '<td><a class="table-link" href=' + row.link + '>' + row.question + '</a></td>' +
            '<td><a class="table-link" href=' + row.profile + '>' + row.user + '</a></td>' +
            '</tr>'
        );
        });
        
        // Add DataTables
        $(document).ready(function () {
        $("#qa").DataTable({
            autoWidth: true,
            scrollY: true,
            scrollX: true,
            dom: "<lf<t>Bip>",
            lengthMenu: [
            [10, 20, 25, 50, -1],
            [10, 20, 25, 50, "All"],
            ],
            columnDefs: [
            { width: "175px", targets: 0 },
            { width: "70px", targets: 1 }
            ],
            buttons: [
            "csv",
            {
                extend: "pdfHtml5",
                orientation: "landscape",
                pageSize: "LEGAL",
            },
            ],
        });
        });
    });
});