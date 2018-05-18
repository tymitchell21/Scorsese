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
        item.querySelector('.del').addEventListener('click',() => {
            const index = [...item.parentNode.childNodes].indexOf(item)
            item.parentNode.removeChild(item)
            this.films.splice(index,1)
        })
        item.querySelector('.fav').addEventListener('click',() => {
            item.style.border = '1px solid green';
            item.querySelector('.scorsese').style.display = 'block'
        })

        return item
    },

    handleSubmit(ev) {
        const f = ev.target
        const flick = {
            id: ++this.max,
            name: f.title.value,
            fav: false
        }
        
        this.films.unshift(flick)

        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)

        f.reset()
    },
 }
 
app.init({
    formSelector: '#flickForm',
    listSelector: '#filmList',
    templateSelector: '.flick.template',
})