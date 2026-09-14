// Radios  
const radios_containers = document.querySelectorAll('input[name="n_slide_container"]')
const display = document.getElementById('left_container')
const containers_array = Array.from(document.getElementsByClassName("slide_group"))

// Add event listeners to each radio button
radios_containers.forEach(radio => {
    radio.addEventListener('change', handleButtonChangeContainer)
})

// Call the function on page load to set initial state
handleButtonChangeContainer.call(document.querySelector('input[name="n_slide_container"]:checked'))



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
        const id = `slide_radio_${container_type}_${index+1}`

        // Radio
        const input = document.createElement("input")
        input.type = "radio"
        input.className = "btn-check slide_btn"
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
function handleButtonChangeContainer() {
    handleChangeContainer(this.value)
}

function handleChangeContainer(selected_value) {

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
    selected_container = document.getElementsByClassName("slide_group slide_group" + selected_value)[0]
    var container_type = selected_container.classList[1]

    const slides = Array.from(selected_container.getElementsByClassName(container_type))
    const selected_slide = slides[0]

    // Apply selected
    selected_container.classList.add("selected")
    selected_slide.classList.add("selected")

    // Create buttons dynamically
    createSlideRadioGroup(selected_container)
}

function updateButtons(container_value, slide_value) {
    Array.from(radios_containers)
        .forEach(s => s.checked = false)
    Array.from(document.getElementsByClassName("slide_btn"))
        .forEach(s => s.checked = false)
    document.getElementById(`n_slide_container_radio${container_value}`).checked = true
    document.getElementById(`slide_radio_slide_group${container_value}_${slide_value}`).checked = true
}

// Button support
document.addEventListener("keydown", event => {
    if (event.key.startsWith("Arrow")) {
        event.preventDefault()

        now_group = document.getElementsByClassName("slide_group selected")[0]
        now_slide = now_group.getElementsByClassName("slide selected")[0]

        now_group_value = parseInt(Array.from(now_group.classList).filter(
            n => n.startsWith("slide_group")
        ).at(1).slice(11))
        now_slide_value = parseInt(Array.from(now_slide.classList).filter(
            n => n.startsWith("slide") && !n.startsWith("slide_group")
        ).at(1).slice(5))

        n_groups = document.getElementsByClassName("slide_group").length
        n_slides = now_group.getElementsByClassName("slide").length
        switch(event.key) {
            case "ArrowUp":
                if (now_slide_value === 1) 
                    next_slide_value = n_slides
                else 
                    next_slide_value = now_slide_value - 1

                next_slide = now_group.querySelectorAll(`.slide.slide${next_slide_value}`)[0]
                handleChangeSlide(now_group, next_slide)
                updateButtons(now_group_value, next_slide_value)
                break
            case "ArrowDown":
                if (now_slide_value === n_slides) 
                    next_slide_value = 1
                else 
                    next_slide_value = now_slide_value + 1

                next_slide = now_group.querySelectorAll(`.slide.slide${next_slide_value}`)[0]
                handleChangeSlide(now_group, next_slide)
                updateButtons(now_group_value, next_slide_value)
                break
            case "ArrowLeft":
                if (now_group_value === 1) 
                    next_group_value = n_groups
                else 
                    next_group_value = now_group_value - 1

                handleChangeContainer(next_group_value)
                updateButtons(next_group_value, 1)
                break
            case "ArrowRight":
                if (now_group_value === n_groups) 
                    next_group_value = 1
                else 
                    next_group_value = now_group_value + 1

                handleChangeContainer(next_group_value)
                updateButtons(next_group_value, 1)
                break
        }
    }
})