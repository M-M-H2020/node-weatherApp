const form = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')


form.addEventListener('submit',function(event){
    event.preventDefault()
})
let timeoutID;
search.addEventListener('input', debounce(inputEvent))


function inputEvent (){
    
    const location = search.value
    messageOne.innerText = 'Loading...'
    fetch(`/weather?address=${location}`).then((response) => {
        const data = response.json()
        return data
    }).then((data) => {
        if(data.error){
            return messageOne.innerText = data.error
        }
        const text = `Address: ${data.address}.\nLocation: ${data.location}.\nForecast: ${data.forecastData}`
        messageOne.innerText = text
    }).catch((err) => {
        messageOne.textContent = err
    });
  
    
    
}

function debounce (func, delay = 1000){
    let timeoutID;
    return (...args) => {
        if(timeoutID){
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            func.apply(null, args)
        }, delay);
    }
}