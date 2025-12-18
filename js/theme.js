const html = document.documentElement
const btn = document.getElementById("toggle")
const icona = btn.querySelector("i")

btn.onclick = () => {
    const is_dark = html.getAttribute("data-bs-theme") === "dark"

    // Theme
    html.setAttribute(
        "data-bs-theme",
        is_dark ? "light" : "dark"
    )

    // Icon
    icona.className = is_dark ? "bi bi-moon-fill" : "bi bi-sun-fill"
}