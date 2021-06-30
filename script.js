let myLibrary = localStorage.getItem("libarray") != null ? JSON.parse(localStorage.getItem("libarray")) : [];
const displayContainer = document.getElementById("display-container");
const inputTitle = document.getElementById("book-title");
const inputAuthor = document.getElementById("book-author");
const inputPages = document.getElementById("book-pages");
const inputRead = document.getElementById("book-read");

class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function updateLocalStorage(){
    localStorage.setItem("libarray", JSON.stringify(myLibrary));
}

function addBookToLibrary(book){
    myLibrary.push(book);
    updateLocalStorage();
    updateDisplay();
}

function updateDisplay(){
    while(displayContainer.children.length > 1){
        displayContainer.removeChild(displayContainer.lastChild);
    }
    for(let i = 0; i < myLibrary.length; i++){
        let temporary = myLibrary[i];
        addBookToDisplay(temporary.title, temporary.author, temporary.pages, temporary.read);
        if(displayContainer.classList.contains("invisible")) displayContainer.classList.remove("invisible");
    }
    
}


function addBookToDisplay(title, author, pages, read) {
    let tmp_array = [title, author, pages];
    let new_div = document.createElement("div");
    new_div.classList.add("row");
    for(let i = 0; i < 3; i++){
        let new_row_div = document.createElement("div");
        new_row_div.classList.add("row-element");
        new_row_div.textContent = tmp_array[i];
        new_div.appendChild(new_row_div);
    }
    let new_row_div = document.createElement("div");
    new_row_div.classList.add("row-element");
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    if(read) checkbox.checked = true;
    checkbox.addEventListener("click", checkListener);
    new_row_div.appendChild(checkbox);
    new_div.appendChild(new_row_div);
    displayContainer.appendChild(new_div);
}

function resetInputFields(){
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.checked = false;
}



const submitButton = document.getElementById("form-submit");
submitButton.addEventListener("click", ()=>{
    let a = inputTitle.value;
    let b = inputAuthor.value;
    let c = inputPages.value;
    let d = inputRead.checked;
    if(a && b && c){
        const newBook = new Book(a, b, c, d);
        addBookToLibrary(newBook);
        resetInputFields();
    }
    else{
        alert("Please kindly fill on all the fields.");
    }

})


function checkListener(){
    let number = Array.from(document.querySelectorAll(".checkbox")).indexOf(this);
    if(this.checked){
        myLibrary[number].read = true;
        updateLocalStorage();
    }
    else{
        myLibrary[number].read = false;
        updateLocalStorage();
    }
}

const resetButton = document.getElementById("reset-button");
resetButton.onclick = ()=>{
    localStorage.removeItem("libarray");
    myLibrary = [];
    updateDisplay();
    displayContainer.classList.add("invisible");
}


updateDisplay();
