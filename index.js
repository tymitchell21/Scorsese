const form = document.querySelector('#filmForm')
const films = []

form.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    filmName = ev.target.title.value

    films.push(filmName)

    const filmList = document.querySelector('#filmList')

    const film = document.createElement('li')
    film.textContent = filmName

    filmList.appendChild(film)
    createDeleteButton(filmList)

    ev.target.reset()
})
