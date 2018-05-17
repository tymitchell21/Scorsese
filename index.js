const form = document.querySelector('#filmForm')
const films = []

form.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    filmName = ev.target.title.value

    films.push(filmName)

    ev.target.reset()
})
