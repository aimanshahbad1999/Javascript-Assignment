const regex_email = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
const email = document.getElementById('email');
const pwd=document.getElementById('pwd');
const submit=document.getElementById('submit');
email.addEventListener('blur',validateEmail);
pwd.addEventListener('blur',checkpwd);
submit.addEventListener('click',login);


function validateEmail(){
    let error_email=document.querySelector(".error-email");
    if(regex_email.test(email.value)){
        error_email.innerHTML=" ";
        submit.disabled=false;
    }
    else{
        error_email.innerHTML="Enter Valid Email"; 
    }
}

function checkpwd(){
    submit.disabled=false;
}


function getDetails(){
    let check=0;
    let valid_user;
    let users=localStorage.getItem("Users");
    users=JSON.parse(users);
    for(i=0;i<users.length;i++){
        for(const [key,value] of Object.entries(users[i])){
            if(key=="email" && users[i]["email"]==email.value){
                valid_user=users[i];
                check=check+1;
                break;
            }
            else{

            }
        }
    }

    return valid_user;
}


function login(){
    const user=getDetails();
    let submit_error= document.querySelector('.invalid');
    if((email.value==="")  && (pwd.value==="")){
        console.log("Enter Email and Password");
        submit_error.innerHTML="Enter Email and Password";  
    }else if(email.value===""){
        console.log("Enter Email");
        submit_error.innerHTML="Enter Email";  

    }else if(pwd.value===""){
        console.log("Enter Password");
        submit_error.innerHTML="Enter Password";  

    }else{

        if (user==undefined){
            alert("User not exist ");
            submit.disabled=true;
        }
        else{
            
            submit.disabled=false;
            for(const [key,value] of Object.entries(user)){           
                if(key=="password" && user["password"]==pwd.value){
    
                    submit.disabled=false;
                    submit_error.innerHTML="";
                    sessionStorage.clear();
                    sessionStorage.setItem(JSON.stringify("Users"),JSON.stringify(user.email));
                   
                    // window.location='todo.html';
                    break;
                }
                else{ 
                    submit.disabled=true;
                    submit_error.innerHTML="Invalid credential";        
                    }
                }
            }
    }

    
}