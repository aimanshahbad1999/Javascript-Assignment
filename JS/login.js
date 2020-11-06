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
        console.log('Your email is valid');
        error_email.innerHTML=" ";
        submit.disabled=false;
         
        

    }
    else{
        console.log('Your email is not valid');
        error_email.innerHTML="Enter Valid Email";
        // email.setCustomValidity('Enter Valid Email');
        
       
        
    }
}

function checkpwd(){
    submit.disabled=false;
}

// function checkPassword(){
//     let error_pwd=document.querySelector('.error-pwd');
    
//     if(((pwd.value).length)>6){
//         console.log("greater then 6");
//     }
//     else{
        
//     }

//     console.log("Hello");
//     const localitem= localStorage.getItem(JSON.stringify(email.value));
//         const item=JSON.parse(localitem);
//         for (const [key, value] of Object.entries(item)) {
//             if(key=="password"){
//                 if(item[value]==pwd.value){
//                     console.log("login successful");
//                 }
//             }
           
                
//         }
//         submit.disable=true;
   

// }

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
    if (user==undefined){
        alert("User not exist ");
        submit.disabled=true;
    }
    else{
        let submit_error= document.querySelector('.invalid');
        submit.disabled=false;
        for(const [key,value] of Object.entries(user)){           
            if(key=="password" && user["password"]==pwd.value){
                submit.disabled=false;
                console.log("successfully login");
                submit_error.innerHTML="";
                sessionStorage.clear();
                sessionStorage.setItem(JSON.stringify("Users"),JSON.stringify(user.email));
                break;
            }
            else{ 
                submit.disabled=true;
                console.log("login failed");
                submit_error.innerHTML="Invalid credential";        
                }
            }
        }

     
    
    
    // const user_info=localStorage.getItem(JSON.stringify( email.value));
    // const item=JSON.parse(user_info);
    // console.log(item);
    // if (item==null){
    //     alert("User not exist ");
    //     submit.disabled=true;
    // }
    // else{
    //     let submit_error= document.querySelector('.invalid');
    //     submit.disabled=false;
    //     for(const [key,value] of Object.entries(item)){
                
    //         console.log(key);
    //         if(key=="password" && item["password"]==pwd.value){
    //             submit.disabled=false;
    //             console.log("successfully login");
    //             break;
    //         }
    //         else{
               
    //             submit.disabled=true;
    //             console.log("login failed");
    //             submit_error.innerHTML="Invalid credential";
    //             // console.log(Object.keys(item));
                
    //         }
    //     }
    // }
        

}