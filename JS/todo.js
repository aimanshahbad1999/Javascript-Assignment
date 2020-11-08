const addTodo=document.getElementById('add-todo');
const pop_up=document.querySelector('.pop-up');
const main_body=document.querySelector('.main-body');
const submit=document.getElementById('submit');
const cancel=document.getElementById('cancel');
const update=document.getElementById('edit-submit');
const ul=document.querySelector('ul');
const del_chk=document.getElementById('del-check');


const edit_cancel=document.getElementById('edit-cancel');
const edit_submit=document.getElementById('edit-submit');
const edit_pop_up=document.querySelector('.edit-pop-up');

const multi_li_del=[];

// const edit_pop_up=document.querySelector('.edit-pop-up');
// const edit_cancel=document.getElementById('edit-cancel');
// const edit_submit=document.getElementById('edit-submit');
// const edit=document.querySelector('.edit');



function load(){

    let user=sessionStorage.getItem(JSON.stringify("Users"));
    user=JSON.parse(user);
    console.log(user);

    let all_user=localStorage.getItem("Users");
    all_user=JSON.parse(all_user);
    console.log(all_user); 

    let update_user;
    let check=0;
    for(let i=0;i<all_user.length;i++){
        for(const [key,value] of Object.entries(all_user[i])){
            if(key=="email" && all_user[i].email==user){
                update_user=all_user[i]; 
                if(update_user.hasOwnProperty("todo")){
                    check=1;
                }

                break;
            }
            else{

            }
        }
    }
    

    if(check==1){

    let todo=update_user.todo;

    console.log(todo);

    for(let i=0;i<todo.length;i++){

    let newElm=document.createElement('li');
    let content=`
    <div>
    <img src="${todo[i].image}" alt="" srcset="">
    </div>
    <div>
    <label>Name:</label>
    <label class="name">${todo[i].name}</label><br>
    <label>Date:</label>
    <label>${todo[i].date}</label><br>
    <label>Category:</label>
    <label>${todo[i].category}</label><br>
    <label>Status:</label>
    <label>${todo[i].status}</label><br>
    </div><br>
    
   
    <img src="images/edit.png" alt="" srcset="" id="edit" name="edit">
    <img src="images/delete.png" alt="" srcset="" id="delete" name="delete">
    <input type="checkbox" id="multi-delete" name="check">

    `;
    newElm.innerHTML=content;
    ul.appendChild(newElm)
    }
}else{

}
   

}




load();






addTodo.addEventListener('click',addTask);
submit.addEventListener('click',submitItem);
cancel.addEventListener('click',cancelItem);
ul.addEventListener('click',handelEvent);
del_chk.addEventListener('click',DeleteMultipleCheck)





function handelEvent(e){
    if(e.target.name=='delete'){
        handelDelete(e);
    }

    if(e.target.name=='edit'){
        handelEdit(e.target.parentNode);
        console.log("inside edithandel");
        console.log(e.target.parentNode);
    }

    if(e.target.name='check'){
        handelMultipleDelete(e);
    }



}

function  handelMultipleDelete(e){
    let li_name=e.target.parentNode.querySelector('.name').innerHTML;
    multi_li_del.push(li_name);

}

function DeleteMultipleCheck(){

    if(multi_li_del.length==0){
        alert("Checkbox Not Selected");
    }

    else{

        console.log("hey in checkbox");
    console.log(multi_li_del);

    let user=sessionStorage.getItem(JSON.stringify("Users"));
    user=JSON.parse(user);
    console.log(user);

    let all_user=localStorage.getItem("Users");
    all_user=JSON.parse(all_user);
    console.log(all_user); 

    let update_user;
    let check=0;
    for(let i=0;i<all_user.length;i++){
        for(const [key,value] of Object.entries(all_user[i])){
            if(all_user[i].email==user){
                for(let j=0;j<all_user[i].todo.length;j++){
                    for(const [key,value] of Object.entries(all_user[i].todo[j])){
                        if(multi_li_del.includes(all_user[i].todo[j].name)){
                            all_user[i].todo.splice(j,1);
                            console.log(all_user[i].todo);

                            localStorage.setItem("Users",JSON.stringify(all_user));
                            location.reload();
                        }
                    }

                }
                
                break;
            }
            else{

            }
        }
    }




    }

    

}

function handelDelete(e){
    console.log(e);
    let item=e.target.parentNode;
    console.log(item);
    let update=item.querySelector('.name').innerHTML;
    console.log(update);
    item.remove();

    let all_user=localStorage.getItem("Users");
    all_user=JSON.parse(all_user);
    console.log(all_user); 

    let user=sessionStorage.getItem(JSON.stringify("Users"));
    user=JSON.parse(user);
    console.log(user);

    for(let i=0;i<all_user.length;i++){
        for(const [key,value] of Object.entries(all_user[i])){
            if(all_user[i].email==user){
                for(let j=0;j<all_user[i].todo.length;j++){
                    for(const [key,value] of Object.entries(all_user[i].todo[j])){
                        if(all_user[i].todo[j].name==update){
                            all_user[i].todo.splice(j,1);
                            localStorage.setItem("Users",JSON.stringify(all_user));
                            break;
                        }

                    }

                }
                
            }
            else{

            }
        }
    }




}

function getEditName(){
    const name=document.getElementById('ename').value;
    return name;
}

function getEditDate(){

    const date=document.getElementById('edate').value;
    console.log(date);
    return date

}

function getEditCategory(){
    let radio_c = document.getElementsByName('ecategory'); 
        let category;
        for(i = 0; i < radio_c.length; i++) { 
            if(radio_c[i].checked) 
            category=radio_c[i].value;
        } 
    console.log(category);
    return category;

}


function getEditStatus(){
    let radio_s = document.getElementsByName('estatus'); 
        let status;
        for(i = 0; i < radio_s.length; i++) { 
            if(radio_s[i].checked) 
            status=radio_s[i].value;
        } 
    console.log(status);
    return status;
}

function getEditReminder(){
    let radio_rem = document.getElementsByName('eremind'); 
    let reminder;
    for(i = 0; i < radio_rem.length; i++) { 
        if(radio_rem[i].checked) 
        reminder=radio_rem[i].value;
    } 
    console.log(reminder);
    return reminder;
}

function getEditPublic(){
    let radio_pub = document.getElementsByName('epublic'); 
    let public;
    for(i = 0; i < radio_pub.length; i++) { 
        if(radio_pub[i].checked) 
        public=radio_pub[i].value;
    } 
    console.log(public);
    return public;
}

function getEditFile(){
    const file=document.getElementById('efile');
    let image=file.value;
    console.log(image);
    return image;


}



function handelEdit(e){
    console.log("********");
    console.log(e);

    edit_pop_up.classList.remove('dis');
    edit_pop_up.classList.add('enable');
    console.log("hey aim");

    let item=e;

    edit_submit.addEventListener('click',()=>{
        let edit_name=getEditName();
        let edit_date=getEditDate();
        let edit_category=getEditCategory();
        let edit_status=getEditStatus();
        let edit_reminder=getEditReminder();
        let edit_public=getEditPublic();
        let edit_file=getEditFile();
        console.log(edit_name,edit_date,edit_category);
        console.log(edit_status,edit_reminder,edit_public,edit_file);

        item=item.querySelector('.name').innerHTML;
        console.log(item);

        let user=sessionStorage.getItem(JSON.stringify("Users"));
        user=JSON.parse(user);
        console.log(user);
    
        let all_user=localStorage.getItem("Users");
        all_user=JSON.parse(all_user);
        console.log(all_user); 
    
        let update_user;
        let check=0;
        for(let i=0;i<all_user.length;i++){
            for(const [key,value] of Object.entries(all_user[i])){
                if(all_user[i].email==user ){
                    for(let j=0;j<all_user[i].todo.length;j++){
                        for(const [key,value] of Object.entries(all_user[i].todo[j])){
                            if(all_user[i].todo[j].name==item){
                                console.log(all_user[i].todo[j]);
                            
                                if(edit_name!=''){
                                    console.log(edit_name)
                                    all_user[i].todo[j].name=edit_name;
                                   

                                }
                           
                                if(edit_date!=''){
                                    console.log(edit_date)
                                    all_user[i].todo[j].date=edit_date;
                                   
                                }

                                if(edit_category!=undefined){
                                    console.log(edit_category)
                                    all_user[i].todo[j].category=edit_category;
                                   
                                }

                                if(edit_status!=undefined){
                                    console.log(edit_status)
                                    all_user[i].todo[j].status=edit_status;
                                   
                                }

                                if(edit_reminder!=undefined){
                                    console.log(edit_reminder)
                                    all_user[i].todo[j].reminder=edit_reminder;
                                   
                                }

                                if(edit_public!=undefined){
                                    console.log(edit_public)
                                    all_user[i].todo[j].public=edit_public;
                                   
                                }

                                if(edit_file!=undefined){
                                    console.log(edit_file)
                                    all_user[i].todo[j].image=edit_file;
                                   
                                }
                               
                                console.log(all_user[i].todo[j]);
                                localStorage.setItem("Users",JSON.stringify(all_user));
                                location.reload();
                                
                            }
                            break;


                        }
                    }

                   
    
                    break;
                }
                else{
    
                }
            }
        }



        



        




    });

    



    
    
    // edit_pop_up.classList.remove('display-edit-cancel')
    // edit_pop_up.classList.add('display-edit');
    // edit_cancel.addEventListener('click',()=>{
    //     edit_pop_up.classList.add('display-edit-cancel');
    // });

    // edit_submit.addEventListener('click',()=>{
    //     console.log("Aiman");
    // })



}


edit_cancel.addEventListener('click',handelEditcancel);

function handelEditcancel(){
    edit_pop_up.classList.add('dis');

}

// function getDetails(){
//     let valid_user=sessionStorage.getItem(JSON.stringify("Users"));
//     valid_user=JSON.parse(valid_user);
//     console.log(valid_user);
//     return valid_user;
// }

// const user=getDetails();
// console.log(user);


function addTask(){
    console.log("inside Add Task");
    pop_up.classList.remove('edit-pop-up');
    main_body.classList.add("main");
    pop_up.classList.add("display-pop-up");
    
    

  

}

function getDate(){

    const date=document.getElementById('date').value;
    console.log(date);
    return date

}

function getCategory(){
    let radio_c = document.getElementsByName('category'); 
    let category;
    for(i = 0; i < radio_c.length; i++) { 
        if(radio_c[i].checked) 
        category=radio_c[i].value;
    } 
console.log(category);
return category;

}


function getStatus(){
    let radio_s = document.getElementsByName('status'); 
        let status;
        for(i = 0; i < radio_s.length; i++) { 
            if(radio_s[i].checked) 
            status=radio_s[i].value;
        } 
    console.log(status);
    return status;
}

function getReminder(){
    let radio_rem = document.getElementsByName('remind'); 
    let reminder;
    for(i = 0; i < radio_rem.length; i++) { 
        if(radio_rem[i].checked) 
        reminder=radio_rem[i].value;
    } 
    console.log(reminder);
    return reminder;
}

function getPublic(){
    let radio_pub = document.getElementsByName('public'); 
    let public;
    for(i = 0; i < radio_pub.length; i++) { 
        if(radio_pub[i].checked) 
        public=radio_pub[i].value;
    } 
    console.log(public);
    return public;
}

function getFile(){
    const file=document.getElementById('file');
    let image=file.value;
    console.log(image);
    return image;


}

function getName(){
    const name=document.getElementById('name').value;
    return name;
}
function submitItem(){

    let item_name=getName();
    let item_date=getDate();
    let item_category=getCategory();
    let item_status=getStatus();
    let item_reminder=getReminder();
    let item_public=getPublic();
    let item_file=getFile();
    
    const item={
        name:item_name,
        date:item_date,
        category:item_category,
        status:item_status,
        reminder:item_reminder,
        public:item_public,
        image:item_file



    };
    console.log(item);

    let user=sessionStorage.getItem(JSON.stringify("Users"));
    user=JSON.parse(user);
    console.log(user)

    let all_user=localStorage.getItem("Users");
    all_user=JSON.parse(all_user);
    console.log(all_user); 

    let update_user;

    for(let i=0;i<all_user.length;i++){
        for(const [key,value] of Object.entries(all_user[i])){
            if(key=="email" && all_user[i].email==user){
                update_user=all_user[i];
                all_user.splice(i,1);
                localStorage.setItem("Users",JSON.stringify(all_user));
                
                break;
            }
            else{

            }
        }
    }


    console.log(update_user);   //single object
    console.log(all_user);  //localStorage
    console.log(user)   //session
    console.log("**********");
    console.log(update_user.hasOwnProperty("todo'"));
    if (update_user.hasOwnProperty("todo")){
        update_user["todo"].push(item);
        let data=localStorage.getItem("Users");
        data=JSON.parse(data);
        data.push(update_user);
        localStorage.setItem("Users",JSON.stringify(data));

    }else{
        update_user.todo=[item];
        let data=localStorage.getItem("Users");
        data=JSON.parse(data);
        data.push(update_user);
        localStorage.setItem("Users",JSON.stringify(data));
    }

    let newElm=document.createElement('li');
    let content=`
    <div>
    <img src="${item.image}" alt="" srcset="">
    </div>
    <div>
    <label>Name:</label>
    <label class="name">${item.name}</label><br>
    <label>Date:</label>
    <label>${item.date}</label><br>
    <label>Category:</label>
    <label>${item.category}</label><br>
    <label>Status:</label>
    <label>${item.status}</label><br>
    </div> <br>

    <img src="images/edit.png" alt="" srcset="" id="edit" name="edit">
    <img src="images/delete.png" alt="" srcset="" id="delete" name="delete">
    <input type="checkbox" id="multi-delete" name="check">

    `;
    newElm.innerHTML=content;
    ul.appendChild(newElm)
               
                    



   
    
    pop_up.classList.remove("display-pop-up");
    main_body.classList.remove("main");

}

function cancelItem(){
    pop_up.classList.remove("display-pop-up");
    main_body.classList.remove("main");

}
