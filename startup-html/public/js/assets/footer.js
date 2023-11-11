document.addEventListener('DOMContentLoaded', () => {
    fetch("./assets/footer.html")
        .then(response => {
            return response.text()
        })
        .then(data => {
            const footer = document.querySelector("footer");
            if (footer) {
                footer.innerHTML = data;
                footer.classList.add("align-end");
            }
        });
});
