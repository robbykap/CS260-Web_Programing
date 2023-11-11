document.addEventListener('DOMContentLoaded', () => {
    fetch("./assets/header.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            const header = document.querySelector("header");
            if (header) {
                header.innerHTML = data;
            }
        });
});