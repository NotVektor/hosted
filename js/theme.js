const html = document.documentElement
const btn = document.getElementById("toggle_theme")
const icon = btn.querySelector("i")

btn.onclick = () => {
    const is_dark = html.getAttribute("data-bs-theme") === "dark"

    // Theme
    html.setAttribute(
        "data-bs-theme",
        is_dark ? "light" : "dark"
    )

    // Icon
    btn.className = is_dark ? "btn btn-outline-dark" : "btn btn-outline-light"
    icon.className = is_dark ? "bi bi-moon-fill" : "bi bi-sun-fill"
}