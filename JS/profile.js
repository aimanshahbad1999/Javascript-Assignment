let main_user;
window.onload=function(){
    let check=0;
    let valid_user;
    let user_session=sessionStorage.getItem(JSON.stringify("Users"));
    user_session=JSON.parse(user_session);
    console.log(user_session);
    let user=localStorage.getItem("Users");
    user=JSON.parse(user);
    main_user=user;
    console.log("inside onload");
    console.log(main_user);
    for(let i=0;i<user.length;i++){
        for(const [key,value] of Object.entries(user[i])){
            if(key=="email" && user[i].email==user_session){
                main_user=user[i];
                user.splice(i,1);
                console.log(user);
                localStorage.setItem("Users",JSON.stringify(user));
                break;
            }
            else{

            }
        }
    }
    
    

  

}
console.log("in profile");
let main_check=0;

const regex_email = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
const regex_fname=/^([a-zA-Z0-9]+)/;
const regex_lname=/^([a-zA-Z0-9]+)/;


// const email = document.getElementById('email');
const fname=document.getElementById('fname');
const lname=document.getElementById('lname');
const pwd=document.getElementById('pwd');
const cpwd=document.getElementById('cpwd');
const address=document.getElementById('address');
const file=document.getElementById('file');
const error_pwd=document.querySelector('.error-pwd');
const submitbtn=document.getElementById("submit");

let old_detail,new_email,new_firstname,new_lastname,new_password,new_gender,new_image;

setTimeout(() => {
    console.log("inside timeout");
    // old_detail=getDetails();
    console.log(main_user);
    new_email=main_user.email;
    new_firstname=main_user.first_name;
    new_lastname=main_user.last_name;
    new_password=main_user.password;
    new_gender=main_user.gender;
    new_address=main_user.address;
    new_image=main_user.image;

    
}, 1000);
   


// email.addEventListener('blur',validateEmail);
fname.addEventListener('blur',validateFirstName);
lname.addEventListener('blur',validateLastName);
submitbtn.addEventListener('click',submitDetails);
pwd.addEventListener('blur',checkPassword);
address.addEventListener('blur',validateAddress);
file.addEventListener('change',ValidateUpdateProfile);



// function getDetails(){
//     console.log("inside get details");
//     console.log(main_user);
//     let valid_user;
//     let user_obj;
//     valid_user=sessionStorage.getItem(JSON.stringify("Users"));
//     valid_user=JSON.parse(valid_user);
//     for(let i=0;i<main_user.length;i++){
//         for(const [key,value] of Object.entries(main_user[i])){
//             if(key=="email" && main_user[i].email==user_session){
//                 user_obj=main_user[i];
//                 break;
//             }
//             else{

//             }
//         }
//     }
//     return user_obj;
// }

function checkDetailAvailable(){

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

    return check;

    

}

// function validateEmail(){
//     let error_email=document.querySelector(".error-email");
//     if(regex_email.test(email.value)){
//         console.log('Your email is valid');
//         error_email.innerHTML=" "; 
      
//         const avaiable=checkDetailAvailable();
//         if(avaiable==1){
//             error_email.innerHTML="Email Already Registered";
//             alert("Email Already Registered");

//         }
//         else{
//                 new_email=email.value;
//         }
//         // user.email=email.value;
//     }
//     else{
//         console.log('Your email is not valid');

        
//         error_email.innerHTML="Enter Valid Email";
        

//         // email.setCustomValidity('Enter Valid Email');
        
//     }
    
// }


function validateFirstName(){
    let error_fname=document.querySelector(".error-fname");
    if(regex_fname.test(fname.value)){
        console.log('Your First Name is valid');
        error_fname.innerHTML=" ";
        new_firstname=fname.value;
       
    }
    else{
        console.log('Your First Name is not valid');
        error_fname.innerHTML="Enter Alphabet only";

        // email.setCustomValidity('Enter Valid Email');
        
    }


}

 function validateLastName(){
    let error_lname=document.querySelector(".error-lname");
    if(regex_lname.test(lname.value)){
        console.log('Your First Name is valid');
        error_lname.innerHTML=" ";
        new_lastname=lname.value;
  
    }
    else{
        console.log('Your First Name is not valid');
        error_lname.innerHTML="Enter Alphabet only";

        // email.setCustomValidity('Enter Valid Email');
        
    }


}


let check=0;
function checkPassword(){
    
    console.log("Hello");
    if(((pwd.value).length)>6){
        console.log("greater then 6");
       
        check=1;
        submitbtn.disabled = false;
        console.log("Hello");
        error_pwd.innerHTML=" "

    }
    else{
        console.log("less then 6");
        error_pwd.innerHTML="Password length should be greater than 6";

    }

}


cpwd.addEventListener('blur',confirmPassword);
let pwdcheck=0
function confirmPassword(){
    let error_cpwd=document.querySelector('.error-cpwd');
    if (check==0){
        error_pwd.innerHTML="Password length should be greater than 6";
    }
    else{
        if (pwd.value === cpwd.value){
            console.log("hey");
            pwdcheck=0;
            error_cpwd.innerHTML=" ";
            new_password=cpwd.value;
            submitbtn.disabled=false;
    

        }
        else{
            console.log(typeof(pwd.value),typeof(cpwd.value));
            error_cpwd.innerHTML="Password Mismatch";
            pwdcheck=1
            console.log(typeof(pwd.value));
            console.log(typeof(cpwd.value));

        }
    }
    
   
}

function radioValue(){
    
        let radio_ele = document.getElementsByName('gender'); 
        let radio_val;
        for(i = 0; i < radio_ele.length; i++) { 
            if(radio_ele[i].checked) 
            radio_val=radio_ele[i].value;
        } 
        new_gender= radio_val;
        
        
    

   

}

function validateAddress(){
    new_address=address.value;   
}

function ValidateUpdateProfile(){
    new_image=file.value;
}


function submitDetails(){
    // submitbtn.disabled=true;
if(pwdcheck==0)
    {
        let new_user={
            email:new_email,
            first_name:new_firstname,
            last_name:new_lastname,
            password:new_password,
            gender:new_gender,
            address:new_address,
            image:new_image
        };
        let get_user=localStorage.getItem("Users");
        get_user=JSON.parse(get_user);
        console.log(get_user);
        console.log(new_user);
        get_user.push(new_user);
        localStorage.setItem("Users",JSON.stringify(get_user));
        // sessionStorage.clear();
        // sessionStorage.setItem("Users",JSON.stringify(new_user));

    } 
    else{
        submitbtn.disabled=true;
        let error_submit=document.querySelector('.error-submit');
        error_submit.innerHTML="check confirm password or some filed missing";
    }   
        

}



// const a=[];

// function submitDetails(){
//     if(pwdcheck==0){
//         // submitbtn.enab
       
//         let radio=radioValue();
//         let user={
//             email:email.value,
//             first_name:fname.value,
//             last_name:lname.value,
//             password:cpwd.value,
//             gender:radio,
//             address:address.value,
//             image:file.value
    
    
//         };

//         let item=localStorage.getItem("Users");
//         item=JSON.parse(item);
//         console.log(item);
//         if(item==null){
//             console.log("null");
//             a.push(user);
//             localStorage.setItem("Users",JSON.stringify(a));
//         }
//         else{
            
//             item.push(user);
//             console.log(item);
//             localStorage.setItem("Users",JSON.stringify(item));
//         }

       
        

//     }
//     else{
//         submitbtn.disabled = true;
//         let error_submit=document.querySelector('.error-submit');
//         error_submit.innerHTML="check confirm password or some filed missing";
//     }
        


//     } 
    








