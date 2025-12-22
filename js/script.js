document.addEventListener("DOMContentLoaded", () => {
    const testoBase =
        "Come in molti testi medievali, la numerologia biblica gioca un ruolo strutturale fondamentale, " +
        "ciascuno dei 4 elementi è accompagnato da 4 indicatori, questo è collegato al ";

    const elementi = ["vento", "acqua", "fuoco", "terra"];

    elementi.forEach(elemento => {
        document.querySelectorAll("span." + elemento).forEach(span => {
            span.setAttribute("title", testoBase + elemento);
        });
    });
});

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
function handleChangeSlide(container, slide) {
    // Containering
    const container_type = container.classList[1]
    Array.from(container.getElementsByClassName(container_type))
        .forEach(s => s.classList.remove("selected"))

    // Apply selected
    slide.classList.add("selected")
}

// Function to create buttons
function createSlideRadioGroup(container) {
    display.innerHTML = ""

    const container_type = container.classList[1]
    const slides = Array.from(container.getElementsByClassName(container_type))
    
    const group = document.createElement("div")
    group.className = "btn-group"
    group.setAttribute("role", "radiogroup")

    slides.forEach((slide, index) => {
        const id = `slide_radio_${container_type}_${index}`

        // Radio
        const input = document.createElement("input")
        input.type = "radio"
        input.className = "btn-check"
        input.name = "slide_selector"
        input.id = id
        input.autocomplete = "off"
        if (index === 0) input.checked = true

        // Label
        const label = document.createElement("label")
        label.className = "btn btn-outline-primary"
        label.setAttribute("for", id)
        label.textContent = `${index + 1}`

        // Mouse selection
        input.addEventListener("change", () => {
            handleChangeSlide(container, slide)
        })

        group.appendChild(input)
        group.appendChild(label)
    })

    display.appendChild(group)
}


// Function to handle change slide container event
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
    createSlideRadioGroup(selected_container)
}