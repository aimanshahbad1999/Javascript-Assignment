
let main_check=0;
const a=[];
const regex_email = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
const regex_fname=/^([a-zA-Z0-9]+)/;
const regex_lname=/^([a-zA-Z0-9]+)/;
const email = document.getElementById('email');
const fname=document.getElementById('fname');
const lname=document.getElementById('lname');
const pwd=document.getElementById('pwd');
const cpwd=document.getElementById('cpwd');
const address=document.getElementById('address');
const file=document.getElementById('profileimg');
const error_pwd=document.querySelector('.error-pwd');

const submitbtn=document.getElementById("submit");

email.addEventListener('blur',validateEmail);
fname.addEventListener('blur',validateFirstName);
lname.addEventListener('blur',validateLastName);
submitbtn.addEventListener('click',submitDetails);
pwd.addEventListener('blur',checkPassword);

let emailcheck=0
function validateEmail(){
    let error_email=document.querySelector(".error-email");
    if(regex_email.test(email.value)){
        error_email.innerHTML=" "; 
        let user = sessionStorage.getItem(JSON.stringify("Users"));
        user = JSON.parse(user);
        let all_user = localStorage.getItem("Users");
        all_user = JSON.parse(all_user);
        for(let i=0;i<all_user.length;i++){
                if(all_user[i].email==email.value){
                    emailcheck=1;
                }else{
                    emailcheck=0;
                    submitbtn.disabled=false;
                }
        }

    }
    else{
        error_email.innerHTML="Enter Valid Email";
    }
}


function validateFirstName(){
    let error_fname=document.querySelector(".error-fname");
    if(regex_fname.test(fname.value)){
        error_fname.innerHTML=" ";
    }
    else{
        error_fname.innerHTML="Enter Alphabet only";
    }
}

 function validateLastName(){
    let error_lname=document.querySelector(".error-lname");
    if(regex_lname.test(lname.value)){
        error_lname.innerHTML=" ";
    }
    else{
        error_lname.innerHTML="Enter Alphabet only";
    }
}


let check=0;
function checkPassword(){
    if(((pwd.value).length)>6){
        check=1;
        submitbtn.disabled = false;
        error_pwd.innerHTML=" ";
    }
    else{
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
            pwdcheck=0;
            error_cpwd.innerHTML=" ";
            submitbtn.disabled=false;
        }
        else{
            error_cpwd.innerHTML="Password Mismatch";
            pwdcheck=1
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
        return radio_val;
}



function submitDetails(){
    if(pwdcheck==0 && emailcheck==0){
        let radio=radioValue();
        let user={
            email:email.value,
            first_name:fname.value,
            last_name:lname.value,
            password:cpwd.value,
            gender:radio,
            address:address.value,
            image:file.value
        };
        let item=localStorage.getItem("Users");
        item=JSON.parse(item);
        if(item==null){
            a.push(user);
            localStorage.setItem("Users",JSON.stringify(a));
        }
        else{
            item.push(user);
            localStorage.setItem("Users",JSON.stringify(item));  
        }
    }
    else if(emailcheck==1){
        alert("Email Already Exist");
        submitbtn.disabled = true;
    }
    else{
        submitbtn.disabled = true;
        let error_submit=document.querySelector('.error-submit');
        error_submit.innerHTML="check confirm password or some filed missing";
    }
    } 
    








