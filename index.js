const form = document.querySelector('#filmForm')

const handleSubmit = function(ev) {
    ev.preventDefault()

    const f = ev.target
    const films = {
        userName: f.title.value,
        age: f.actor.value,
        favoriteColor: f.year.value,
    }

    ev.target.reset()
}

form.addEventListener('submit', handleSubmit)