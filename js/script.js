// Radios  
const radios_containers = document.querySelectorAll('input[name="n_slide_container"]')
const display = document.getElementById('left_container')
const containers_array = Array.from(document.getElementsByClassName("slide_container"))

// Add event listeners to each radio button
radios_containers.forEach(radio => {
    radio.addEventListener('change', handleChangeContainer)
})

// Call the function on page load to set initial state
handleChangeContainer.call(document.querySelector('input[name="n_slide_container"]:checked'))



// Function to handle change slide event
function selectSlide(container, slide) {
    // Clear slides
    Array.from(container.getElementsByClassName(container.classList[1]))
        .forEach(s => s.classList.remove("selected"))

    // Apply selected
    slide.classList.add("selected")
}

// Function to create buttons
function createSlideButtons(container) {
    display.innerHTML = "" // clear previous buttons

    const container_type = container.classList[1]
    const slides = Array.from(container.getElementsByClassName(container_type))

    slides.forEach((slide, index) => {
        const btn = document.createElement("button")
        btn.textContent = `${index + 1}`
        btn.classList.add("btn", "btn-sm", "btn-outline-primary", "m-1")
        btn.addEventListener("click", () => {
            selectSlide(container, slide)
        })

        display.appendChild(btn)
    })
}

function handleChangeContainer() {
    const selected_value = this.value

    // Clean selected
    containers_array.forEach(container => {
        container.classList.remove("selected")

        var container_type = container.classList[1]
        slides_array = Array.from(container.getElementsByClassName(container_type))

        slides_array.forEach(slide => {
            slide.classList.remove("selected")
        })
    })

    // Fetch selected container
    selected_container = document.getElementsByClassName("slide_container " + selected_value)[0]
    var container_type = selected_container.classList[1]

    const slides = Array.from(selected_container.getElementsByClassName(container_type))
    const selected_slide = slides[0]

    // Apply selected
    selected_container.classList.add("selected")
    selected_slide.classList.add("selected")

    // Create buttons dynamically
    createSlideButtons(selected_container)
}