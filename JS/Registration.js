console.log("in regi");
let main_check=0;

const regex_email = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
const regex_fname=/^([a-zA-Z0-9]+)/;
const regex_lname=/^([a-zA-Z0-9]+)/;


const email = document.getElementById('email');
const fname=document.getElementById('fname');
const lname=document.getElementById('lname');
const pwd=document.getElementById('pwd');
const cpwd=document.getElementById('cpwd');
const address=document.getElementById('address');
const file=document.getElementById('file');
const error_pwd=document.querySelector('.error-pwd');



const submitbtn=document.getElementById("submit");

email.addEventListener('blur',validateEmail);
fname.addEventListener('blur',validateFirstName);
lname.addEventListener('blur',validateLastName);
submitbtn.addEventListener('click',submitDetails);
pwd.addEventListener('blur',checkPassword);


function validateEmail(){
    let error_email=document.querySelector(".error-email");
    if(regex_email.test(email.value)){
        console.log('Your email is valid');
        error_email.innerHTML=" "; 
     

    }
    else{
        console.log('Your email is not valid');

        
        error_email.innerHTML="Enter Valid Email";
        

        // email.setCustomValidity('Enter Valid Email');
        
    }
}


function validateFirstName(){
    let error_fname=document.querySelector(".error-fname");
    if(regex_fname.test(fname.value)){
        console.log('Your First Name is valid');
        error_fname.innerHTML=" ";
       
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
        return radio_val;
     

}






const a=[];

function submitDetails(){
  
    if(pwdcheck==0){
        // submitbtn.enab
       
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
        console.log(item);
        if(item==null){
            console.log("null");
            a.push(user);
            localStorage.setItem("Users",JSON.stringify(a));
        }
        else{
            console.log(item);
            item.push(user);
            console.log(item);
            localStorage.setItem("Users",JSON.stringify(item));
            
        }
       

       
        

    }
    else{
        submitbtn.disabled = true;
        let error_submit=document.querySelector('.error-submit');
        error_submit.innerHTML="check confirm password or some filed missing";
    }
        


    } 
    








