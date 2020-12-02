
let main_check=0;
const a=[];
let newFile="";
// const regex_email = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
const regex_email =/\S+@\S+\.\S+/;
const regex_fname=/^[A-Za-z. ]+$/;
const regex_lname=/^[A-Za-z. ]+$/;
const email = document.getElementById('email');
const fname=document.getElementById('fname');
const lname=document.getElementById('lname');
const pwd=document.getElementById('pwd');
const cpwd=document.getElementById('cpwd');
const address=document.getElementById('address');
const file=document.getElementById('profileimg');
const error_pwd=document.querySelector('.error-pwd');
const address1=document.getElementById('address');

const submitbtn=document.getElementById("submit");

email.addEventListener('blur',validateEmail);
fname.addEventListener('blur',validateFirstName);
lname.addEventListener('blur',validateLastName);
submitbtn.addEventListener('click',submitDetails);
pwd.addEventListener('blur',checkPassword);
// address1.addEventListener('keyup',enable_sub_btn);
// file.addEventListener('click',checkValidImage);



// function enable_sub_btn(){
//     let check_address=0;
//     submitbtn.disabled=false;
//     if(address1.value==''){
//         check_address=0;
//     }else{
//         check_address=1;
//     }
   
// }


function checkValidImage(){
    let img_RegEx=/.(gif|jpe|jpeg|JPG|JPEG|PNG|png|webp|bmp)$/i;
    return img_RegEx.test(file.value);
}

let image_count=0
function changeFile(){
  
    
    submitbtn.disabled = false;

    let image_valid=checkValidImage();
    
    if(image_valid==true){
        console.log("Hello Everyone");
        image_count=1;
    }
    else{
        image_count=0;
    }
    let changePicInput = document.getElementById("profileimg");
    let reader = new FileReader();
    reader.readAsDataURL(changePicInput.files[0]);
    reader.onloadend = function(event) {
        let Image = document.getElementById("profileimg");
        Image.src = event.target.result;    
        console.log(Image); 
        newFile=Image.src;
        console.log(newFile);
    }
}

let emailcheck=0;
let emailvalid=0;
let fcount=0;
function validateEmail(){
    let error_email=document.querySelector(".error-email");
    if(regex_email.test(email.value)){
        emailvalid=0;
        error_email.innerHTML=" "; 
        let user = sessionStorage.getItem(JSON.stringify("Users"));
        user = JSON.parse(user);
        let all_user = localStorage.getItem("Users");
        all_user = JSON.parse(all_user);
        for(let i=0;i<all_user.length;i++){
                console.log("********");
                console.log(all_user.email);
                console.log(email.value);
                if(all_user[i].email==(email.value).toLowerCase()){

                    console.log("already exist");
                    emailcheck=1;
                    break;
                }else{
                    emailcheck=0;
                    submitbtn.disabled=false;
                }
        }

    }
    else{
        error_email.innerHTML="Enter Valid Email";
        emailvalid=1;
    }
}


function validateFirstName(){
    let error_fname=document.querySelector(".error-fname");
    if(regex_fname.test(fname.value)){
        error_fname.innerHTML=" ";
        fcount=1;
        submitbtn.disabled=false;
        
    }
    else{
        error_fname.innerHTML="Enter Alphabet only";
    }
}

let lcount=0;
 function validateLastName(){
    let error_lname=document.querySelector(".error-lname");
    if(regex_lname.test(lname.value)){
        error_lname.innerHTML=" ";
        lcount=1;
        submitbtn.disabled=false;
        
    }
    else{
        error_lname.innerHTML="Enter Alphabet only";
    }
}


let check=0;
let pcount=0;
let cpcount=0
function checkPassword(){
    if((pwd.value).length<8){
        error_pwd.innerHTML="Password length should be 8 character";
    }
    else if((pwd.value).search(/[0-9]/)===-1){
        error_pwd.innerHTML="Password must contain atleast one numric value";
    }
    else if((pwd.value).search(/[a-z]/)===-1){
        error_pwd.innerHTML="Password must contain atleast one small letter";
    }
    else if((pwd.value).search(/[A-Z]/)===-1){
        error_pwd.innerHTML="Password must contain atleast one capital letter";
    }
    else if((pwd.value).search(/[!\@\#\$\%\^\&\*\(\)\_\+\-\:\;]/)===-1){
        error_pwd.innerHTML="Password must contain atleast one special character";
    }else{
        check=1;
        submitbtn.disabled = false;
        error_pwd.innerHTML=" ";
        pcount=1;

    }




    // if(((pwd.value).length)>6){
        
    // }
    // else{
    //     error_pwd.innerHTML="Password length should be greater than 6";
    // }

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
            cpcount=1;
            submitbtn.disabled=false;
        }
        else{
            error_cpwd.innerHTML="Password Mismatch";
            pwdcheck=1;
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
    let error_submit=document.querySelector('.error-submit');
    if(emailcheck==1){
        error_submit.innerHTML="Email Already Exist";
        alert("Email Already Exist");
        submitbtn.disabled = true;
    }else if(emailvalid==1){
        error_submit.innerHTML="Email Invalid";
        submitbtn.disabled = true;

    }
    else if(image_count==0){
        
        error_submit.innerHTML="Invalid File";
        submitbtn.disabled = true;
    }
    else if(pwdcheck==0 && emailcheck==0 && fcount==1 && lcount==1 && cpcount==1 && pcount==1 && image_count==1){
        error_submit.innerHTML="";
        let radio=radioValue();
        let user={
            email:(email.value).toLowerCase(),
            first_name:fname.value,
            last_name:lname.value,
            password:cpwd.value,
            gender:radio,
            address:address.value,
            image:newFile
        };
        let item=localStorage.getItem("Users");
        item=JSON.parse(item);
        if(item==null){
            a.push(user);
            localStorage.setItem("Users",JSON.stringify(a));
            alert("Registration Successful");
        }
        else{
            item.push(user);
            localStorage.setItem("Users",JSON.stringify(item));  
            alert("Registration Successful");
        }
    }
    else{
        submitbtn.disabled = true;
        
        error_submit.innerHTML="check confirm password or some filed missing";
    }
    } 
    








