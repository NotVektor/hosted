document.addEventListener('change', e => {
  if (!e.target.matches('input[type="radio"][data-v]')) return;

  const v = e.target.dataset.v;

  document
    .querySelectorAll(`input[type="radio"][data-v="${v}"]`)
    .forEach(r => r.checked = true);
});

// Radios  
const radios_containers = document.querySelectorAll('input[name="n_slide_container"]')
const display = document.getElementById('left_container')
const containers_array = Array.from(document.getElementsByClassName("slide_container"))

// Function to handle change event
function handleChangeContainer() {
    const selected_value = this.value
    
    // Clean selected
    containers_array.forEach(container => {
        container.classList.remove("selected")

        container_type = container.classList[1]
        slides_array = Array.from(container.getElementsByClassName(container_type))

        slides_array.forEach(slide => {
            slide.classList.remove("selected")
        })
    })

    // Fetch selected
    selected_container = document.getElementsByClassName("slide_container " + selected_value)[0]
    selected_slide = selected_container.querySelector('.slide_1[class]')

    // Apply selected
    selected_container.classList.add("selected")
    selected_slide.classList.add("selected")

    // Display
    display.textContent = `Selected Container: ${selected_value} - Selected Slide: ${selected_slide.classList[0]}`;
}

function handleChangeSlide() {
    const selected_value = this.value2 // TODO
}

// Add event listeners to each radio button
radios_containers.forEach(radio => {
    radio.addEventListener('change', handleChangeContainer)
})

// Call the function on page load to set initial state
handleChangeContainer.call(document.querySelector('input[name="n_slide_container"]:checked'))