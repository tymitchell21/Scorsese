class App {
    constructor(selectors) {
        //Declares my variables
        this.films = []
        this.max = 0

        //Grabs list and list item template
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        //Grabs and adds a submit event listener to the submit button
        document
         .querySelector(selectors.formSelector)
         .addEventListener('submit', (ev) => {
             ev.preventDefault()
             this.handleSubmit(ev)
             ev.target.title.focus()
         })
    }

    removeFlick(item, flick, ev) {
        //It removes it from the DOM
        item.remove()
        
        //Removes it from the films array
        const i = this.films.indexOf(flick)
        this.films.splice(i, 1)

        //This makes sure that as a list item is deleted, the new bottom item's down button is disabled
        if(this.films.length > 0) {
            this.list.lastElementChild.querySelector('.down').disabled = true
        }
    }

    favFlick(item, flick, ev) {
        const index = [...item.parentNode.childNodes].indexOf(item)
 
        //If the fav is off when the button is clicked, it is changed.  Else, it is changed back to normal
        if (this.films[index].fav === false) {
            //This puts a green border around the favorited list item
            item.style.border = '1px solid green'
            //This shows the scorsese character
            item.querySelector('.scorsese').style.display = 'block'
            //This changes the films' fav property to true
            this.films[index].fav = true
                
        } else {
            item.style.border = '1px solid black';
            item.querySelector('.scorsese').style.display = 'none'
            this.films[index].fav = false
        }
    }
 
    //This function creates a new film list item
    renderListItem(flick) {

        //This clones the template item and passes it into the const item
        const item = this.template.cloneNode(true)
        //This removes the class 'template' from the clone, so that it shows up
        item.classList.remove('template')
        //This give the new clone an id equal to the flick id
        item.dataset.id = flick.id
        //This puts the name value of flick into the text content of the new clone
        item
            .querySelector('.flickName')
            .textContent = flick.name

        //This adds an event listener to the delete button on the new clone
        item
            .querySelector('.del.button')
            .addEventListener(
                'click',
                this.removeFlick.bind(this, item, flick)
            )

        //This adds an event lisener to the fav button
        item
            .querySelector('.fav.button')
            .addEventListener(
                'click',
                this.favFlick.bind(this, item, flick)
            )

        //This adds an event listener to the up button
        item.querySelector('.up').addEventListener('click',() => {
            let opacity = item.style.opacity

            item.style.opacity = 0
            item.previousSibling.style.opacity = 0
           
            setTimeout(() => {
                this.swapFilms(item, item.previousSibling)
                item.style.opacity = opacity
                item.nextSibling.style.opacity = opacity
            },
            250)

            //This calls the swapFilms function
            //this.swapFilms(item, item.previousSibling)
        })

        //Adds an event listener to the down button
        item.querySelector('.down').addEventListener('click',() => {
            //This calls the swapFilms function
            this.swapFilms(item.nextSibling, item)
        })

        //Returns newly created item (clone of template)
        return item
    }

    //This takes two film items, and swaps them
    swapFilms(item1, item2) {
        const index1 = [...item1.parentNode.childNodes].indexOf(item1)
        const index2 = [...item2.parentNode.childNodes].indexOf(item2)

        item1.querySelector('.up').disabled = false
        item2.querySelector('.up').disabled = false

        item1.parentNode.insertBefore(item1, item2);

        var temp = this.films[index1]
        this.films[index1] = this.films[index2]
        this.films[index2] = temp

        //This basically says, that if the index 1 is the last, then item2 will be disabled and item1 will not
        if(index1 === this.films.length - 1) {
            item2.querySelector('.down').disabled = true
            item1.querySelector('.down').disabled = false
        }

        //If Index2 is the first, then its up button is disabled
        if(index2 === 0) {
            item1.querySelector('.up').disabled = true
        }

    }

    //This function is executed when submit is clicked
    handleSubmit(ev) {
        const f = ev.target

        //creates a new flick with id, name and fav property
        const flick = {
            id: ++this.max,
            name: f.title.value,
            fav: false
        }
        
        this.films.unshift(flick)

        //This calls the renderListItem function and passes the new flick into it
        const item = this.renderListItem(flick)
        this.list.insertBefore(item, this.list.firstChild)

        //This sets each new list item's up button to disabled because it cannot go any higher
        item.querySelector('.up').disabled = true

        //This says that if the new flick is the only flick, then both the up and down buttons are disabled
        if(this.films.length == 1)
        {
            item.querySelector('.up').disabled = true
            item.querySelector('.down').disabled = true
        }

        //This makes sure that, as a new flick is added, the previous newest flick's up button is reenabled
        if(this.films.length > 1) {
            item.nextSibling.querySelector('.up').disabled = false
        }

        //This causes the page to scroll down to put each new flick into view
        item.scrollIntoView()

        //This resets the form inputs to default values
        f.reset()
    }
 }
 
const app = new App({
    formSelector: '#flickForm',
    listSelector: '#filmList',
    templateSelector: '.flick.template',
})

