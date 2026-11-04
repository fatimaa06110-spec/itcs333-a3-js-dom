// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

document.addEventListener('DOMContentLoaded',()=> {
    const todoInput =document.getElementById('todo-input');
    const todoList=document.getElementById('todo-list');
    const errorMsg =document.getElementById('error-msg');
    const counter=document.getElementById('counter');

    const todoForm=document.getElementById('todo-form');
    const addButton=document.getElementById('add-btn');

    const filterAll=document.getElementById('filter-all');
    const filterActive=document.getElementById('filter-active');
    const filterDone=document.getElementById('filter-done');
     
    let CurrentFilter='all';

    function updateCounter() {
        const item =todoList.querySelectorAll('li');
        let activeCount=0;
    
    item.forEach(item => {
        if(!item.classList.contains('completed')){
            activeCount++;
        }
    });

    if(counter){
        counter.textContent=`${activeCount} item(s) left`;
    }
    }
    function appFilter(){
        const item =todoList.querySelectorAll('li')
        item.forEach(item =>{
            const isCompleted =item.classList.contains('completed');
            if(CurrentFilter=='all'){
                item.style.display = '';
            } else if (CurrentFilter=='active'){
                item.style.display=isCompleted ? 'none' : '';
            }else if(CurrentFilter=='done'){
                item.style.display=isCompleted ? '' : 'none';
            }
        });
    }
   function handleAdd(e){
    if (e) e.preventDefault();
    const text =todoInput.value.trim();
    if(text ==''){
        if (errorMsg){
            errorMsg.textContent='Task cannot be empty';
            errorMsg.style.display='';
            errorMsg.classList.remove('hidden');
        }
        return;
    }
    if (errorMsg){
        errorMsg.textContent='';
            errorMsg.style.display='none';
            errorMsg.classList.add('hidden');
    } 
    const li=document.createElement('li');
    li.textContent= text;
     
    const deleteBtn =document.createElement('button');
    deleteBtn.textContent='Delete';
    deleteBtn.className='delet-btn';
    li.appendChild(deleteBtn);

    todoList.appendChild(li);

    todoInput.value='';
    updateCounter();
    appFilter();

    
}
if(todoForm){
    todoForm.addEventListener('submit', handleAdd);}
    else if(addButton){
        addButton.addEventListener('click',handleAdd);
        todoInput.addEventListener('keypress',(e) =>{
            if(e.key=='Enter') handleAdd(e);
        });
    }

    todoList.addEventListener('click',(e) =>{
        const  target =e.target;
        const li = target.closest('li');
        if(!li) return;

        if(target.classList.contains('delet-btn')){
            li.remove();
            updateCounter();
            return;
        }
        li.classList.toggle('completed');
        updateCounter();
        appFilter();
    });

    if(filterAll){
        filterAll.addEventListener('click',()=>{
            CurrentFilter='all';
            filterAll.classList.add('active');
            if(filterActive) filterActive.classList.remove('active');
            if(filterDone) filterDone.classList.remove('active');
            appFilter();
        });
        }
        if(filterActive){
            filterActive.addEventListener('click', ()=>{
                CurrentFilter='active';
                if(filterAll) filterAll.classList.remove('active');
                filterActive.classList.add('active');
                if(filterDone) filterDone.classList.remove('active');
                appFilter();
            });

            }
            if(filterDone){
                filterDone.addEventListener('click',() =>{
                     CurrentFilter='done';
                if(filterAll) filterAll.classList.remove('active');
                if(filterActive) filterActive.classList.remove('active');
                appFilter();
            });

            
        }
        updateCounter();
});
