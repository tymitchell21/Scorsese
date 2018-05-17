const form = document.querySelector('#filmForm')
const films = []

function createDeleteButton(film) {
    
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click',() => {
        const index = [...film.parentNode.childNodes].indexOf(film)
        film.parentNode.removeChild(film)
        films.splice(index,1)

        console.log(films)
    })

    film.appendChild(deleteButton)
}

form.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    filmName = ev.target.title.value

    films.push(filmName)

    const film = document.createElement('li')
    film.textContent = filmName

    createDeleteButton(film)

    const filmList = document.querySelector('#filmList')
    filmList.appendChild(film)

    console.log(films)

    ev.target.reset()
})
