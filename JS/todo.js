const addTodo=document.getElementById('add-todo');
const pop_up=document.querySelector('.pop-up');
const main_body=document.querySelector('.main-body');
const submit=document.getElementById('submit');
const cancel=document.getElementById('cancel');


addTodo.addEventListener('click',addTask);
submit.addEventListener('click',submitItem);
cancel.addEventListener('click',cancelItem);

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
    
    main_body.classList.add("main");
    pop_up.classList.add("display-pop-up");
  

}

function getDate(){

    const date=document.getElementById('date').value;
    console.log(date);
    return date

}

function getCategory(){
    let radio_cat = document.getElementsByName('category'); 
        let category;
        for(i = 0; i < radio_cat.length; i++) { 
            if(radio_cat[i].checked) 
            category=radio_cat[i].value;
        } 
    console.log(category);
    return radio_cat;

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



    
    pop_up.classList.remove("display-pop-up");
    main_body.classList.remove("main");

}

function cancelItem(){
    pop_up.classList.remove("display-pop-up");
    main_body.classList.remove("main");

}
