const container = document.querySelector('.container')
const resultado = document.querySelector('#resultado')
const form = document.querySelector('#formClima')

window.addEventListener('load', () => {
    form.addEventListener('submit', buscarClima)

    document.querySelector('#ciudad').addEventListener('input', validarCampo);
    document.querySelector('#pais').addEventListener('input', validarCampo);
})

function buscarClima(e) {
    e.preventDefault()
    

    // Validar el formulario
    const ciudadInput = document.querySelector('#ciudad')
    const ciudad = ciudadInput.value
    const paisInput = document.querySelector('#pais')
    const pais = paisInput.value

    let formValido = true

    if(ciudad == '') {
        ciudadInput.setAttribute('aria-invalid', 'true')
        formValido = false
    } 
    if(pais == '') {
        paisInput.setAttribute('aria-invalid', 'true')
        formValido = false
    }

    if(formValido) consultarClima(ciudad, pais)

}

function validarCampo(e) {
    const campo = e.target;

    if(campo.value.trim() !== '') {
        campo.removeAttribute('aria-invalid');
    }
}


function consultarClima(ciudad, pais) {

    const ApiKey = '4cc19d9a09bc438659ec12284f2af6e3'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${ApiKey}`

    fetch(url) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data.cod === '404') {
                mostrarError('Ciudad no encontrada')
            } 

            mostrarClima(data)
        })
        .catch(err => console.error(err))
}

function mostrarError(mensaje) {
    resultado.innerHTML = `<p class="error">${mensaje}</p>`
}

function mostrarClima(datos) {
    const { main: { temp, temp_max, temp_min }, name} = datos

    const centigradosAct = temp - 273.15
    const centigradosMax = temp_max - 273.15
    const centigradosMin = temp_min - 273.15

    resultado.innerHTML = `
       <p>Temperatura en ${name}</p>
       <p class="actual">${Math.floor(centigradosAct)}°C </p>
       <p class="maxima">${Math.floor(centigradosMax)}°C <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trending-up" width="19" height="19" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none" stroke-linecap="round" stroke-linejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
       <path d="M3 17l6 -6l4 4l8 -8" />
       <path d="M14 7l7 0l0 7" />
     </svg></p>
       <p class="minima">${Math.floor(centigradosMin)}°C <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trending-down" width="19" height="19" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round" stroke-linejoin="round">
       <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
       <path d="M3 7l6 6l4 -4l8 8" />
       <path d="M21 10l0 7l-7 0" />
     </svg></p>
    `
    
}