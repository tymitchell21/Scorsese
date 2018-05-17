const app = {
    init(selectors) {
        this.films = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        document
         .querySelector(selectors.formSelector)
         .addEventListener('submit', (ev) => {
             ev.preventDefault()
             this.handleSubmit(ev)
             ev.target.title.focus()
         })
    },

    renderListItem(flick) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name
        item.querySelector('.del').addEventListener('click',(ev) => {
            const index = [...item.parentNode.childNodes].indexOf(item)
            item.parentNode.removeChild(item)
            this.films.splice(index,1)
            console.log(this.films)
        })

        return item
    },

    

    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.title.value
        }
        
        this.films.unshift(flick)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)

        console.log(this.films)

        f.reset()
    },
 }
 
app.init({
    formSelector: '#flickForm',
    listSelector: '#filmList',
    templateSelector: '.flick.template',
})