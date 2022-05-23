console.log("hello");
//function constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {

}

//Add methods to display prototype
Display.prototype.add=function(book){
    let tableBody=document.getElementById("tableBody");
    let uiString=`
                <tr>
                    <th scope="row">1</th>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                </tr>`;
    tableBody.innerHTML+=uiString;
}

//clear function
Display.prototype.clear=function(){
    let libraryForm = document.getElementById("libraryForm");
    //reset is given bcouz clear will make all values blank but reset work only for that value
    //confirm and check once
    libraryForm.reset();
}

//Validate function
Display.prototype.validate=function(book){
    let libraryForm = document.getElementById("libraryForm");
    if(book.name.length<2 || book.author.length<2){
        return false;
    }
    else{
        return true;
    }
}

//show function
Display.prototype.show=function(type,displayMessage){
    let message=document.getElementById("message");
    let boldText;
    if(type==="success"){
        boldText="Success ";
    }
    else{
        boldText="Error! ";
    }
    message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText}: </strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
    setTimeout(function(){
        message.innerHTML=""},2000);
}

//Event listener for add book button(like submit button) in form(libraryForm)
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");
    let type;

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    
    let display=new Display();
    if(display.validate(book)===true){
        display.add(book);
        display.clear();
        display.show("success","Your book is successfully added.");
    }
    else{
        display.show("danger", "can't add this book.");
    }
    e.preventDefault();
}