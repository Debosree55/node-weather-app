console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message=document.querySelector('#msg-1')
const errorMmessage=document.querySelector('#error-1')

message.textContent='Loading....'
errorMmessage.textContent=''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    fetch('http://localhost:8080/weather?address=' + location).then((response) => {
        console.log(response)
        response.json().then((data) => {
            if (data.error) {
                console.log('error from app.js'+ data.error)
                errorMmessage.textContent='Error in fetching the forcast'
            } else {
                message.textContent='The forcase for ' + data.location + ' would be nice with temparature ' +data.forecast
            }
        })
    })
})