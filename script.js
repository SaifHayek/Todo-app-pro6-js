let todoInput = document.querySelector('.todo-input');
let todoAdd = document.querySelector('.todo-add-btn');
let todoList = document.querySelector('.todo-list');


todoAdd.addEventListener('click',addNewTodo);

// create list item function : 
function createLi(value){
    let newTodo = document.createElement('li');
    newTodo.innerHTML = 
    `
      <p>${value}</p>
      <div class="icons"> 
            <i class="fa-solid fa-circle-xmark delete-icon general-icon" title="delete" ></i>
            <i class="fa-solid fa-pen-to-square edit-icon general-icon" title="edit" ></i>
      </div>
    ` ;
    todoList.appendChild(newTodo);
    newTodo.classList.add('new-todo');
}

function addNewTodo(event){
    // prevent default setting for the form and btn
     event.preventDefault();

   //   create array to store the data 
     let allTodo = [];

    // check if localStorage is empty or not 
    if(localStorage.getItem('allTodo')){
        allTodo = JSON.parse(localStorage.getItem('allTodo'));
    }

   let inputValue = todoInput.value ;
   if(inputValue != ""){

    //   create li element with his children
     createLi(inputValue);

    // push the new value into array 
    allTodo.push(inputValue);

    // add the new Array into local storage
    localStorage.setItem('allTodo',JSON.stringify(allTodo));

    // empty textBox input 
    todoInput.value = '';
   }

}


window.onload = resetTodo ;
function resetTodo(){
    let allTodo = [];
    if(localStorage.getItem('allTodo')){
         allTodo = JSON.parse(localStorage.getItem('allTodo'));
    } 
    for(let i = 0 ; i<allTodo.length ; i++){
        createLi(allTodo[i]);
    }
}

// Delete function and Edit function 
function deleteAndEdit(e){
    let clickedItem = e.target;

    if(clickedItem.className.includes('general-icon')){
        let iconsDiv = clickedItem.parentElement ;
        let ListItem = iconsDiv.parentElement;
    
        if(clickedItem.className.includes('delete-icon')){
  
            let allTodo = [];
            if(localStorage.getItem('allTodo')){
                allTodo = JSON.parse(localStorage.getItem('allTodo'));
            } 
            let textLi = ListItem.innerText.trimEnd();
            let IndexOfDeleteIcon = allTodo.indexOf(textLi);
            
            // Delete Element form the array 
            allTodo.splice(IndexOfDeleteIcon,1);
            localStorage.setItem('allTodo',JSON.stringify(allTodo));


            // Delete Element form the page 
            ListItem.remove();

  
        }else if(clickedItem.className.includes('edit-icon')){

            if(ListItem.querySelector('p')){
                let LiPara = ListItem.querySelector('p');
                let textLi = LiPara.innerText.trimEnd();
                
                
                // create the alternative Item to update
                let card =  EditText(textLi);
                ListItem.replaceChild(card,ListItem.querySelector('p')); 

            }
    }   
  }
}
document.addEventListener('click',deleteAndEdit) ;





function EditText(value){

    let card = document.createElement('div');
    card.setAttribute('class','card');
    card.innerHTML = `
    <input type="text" class="edited-input" value="${value}">
    <button type="submit" class="todoEdit" onclick="EditValue(this)">Edit</button>
    `

    
    return card ;

}

function EditValue(me){
        
        let allTodo = [];
        if(localStorage.getItem('allTodo')){
            allTodo = JSON.parse(localStorage.getItem('allTodo'));
        }

         let parentCard = me.parentElement;

         let parentListItem = parentCard.parentElement;

         let newValue =  parentCard.querySelector('.edited-input').value;

        
        let newPara = document.createElement('p');
        newPara.textContent = newValue ;


        parentListItem.replaceChild(newPara,parentCard);

        console.log(parentListItem.parentElement);
        let parentList = parentListItem.parentElement;
        AllListItems = parentList.querySelectorAll('li');


       let index  = -1 ;
       for(let i = 0 ; i<allTodo.length ; i++){
           if(AllListItems[i].querySelector('.card')){
               let p = document.createElement('p');
               p.innerText = AllListItems[i].querySelector('.card').querySelector('.edited-input').value;
               AllListItems[i].replaceChild(p,AllListItems[i].querySelector('.card'));
           }
           allTodo[i] = AllListItems[i].querySelector('p').innerText;
       }

       localStorage.setItem('allTodo',JSON.stringify(allTodo));

  

}

// add light mode 
let lightIcon = document.querySelector('.mode');
let body = document.body;

lightIcon.addEventListener('click',setThemeOn);

function changeTheme(){
    body.classList.toggle('light');
}


function setThemeOn(){
    let light ;
    if(localStorage.getItem('light')){
        light = localStorage.getItem('light');
    }
   
    if(light != "On"){
       localStorage.setItem('light','On');
       changeTheme();
    }else{
        localStorage.setItem('light','Off');
        changeTheme();
    }
}

let light = localStorage.getItem('light');

if(light == 'On'){
    changeTheme();
}



