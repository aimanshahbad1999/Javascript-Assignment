

window.addEventListener("DOMContentLoaded", function () {
    let user = sessionStorage.getItem(JSON.stringify("Users"));
    user = JSON.parse(user);
    if (user == null) {
        window.location = 'login.html';
    }
});




const regex_fname = /^[A-Za-z. ]+$/;
const regex_lname = /^[A-Za-z. ]+$/;


const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const pwd = document.getElementById('pwd');
const cpwd = document.getElementById('cpwd');
const gender = document.getElementsByName('gender');
const address = document.getElementById('address');
const file = document.getElementById('profileimg');
const error_pwd = document.querySelector('.error-pwd');
const submitbtn = document.getElementById('submit');
let error_submit = document.querySelector('.error-submit');





fname.addEventListener('keyup', validateFirstName);
lname.addEventListener('keyup', validateLastName);
submitbtn.addEventListener('click', submitDetails);
pwd.addEventListener('blur', checkPassword);
address.addEventListener('blur', validateAddress);
// file.addEventListener('change', ValidateUpdateProfile);




function load() {
    let user1 = sessionStorage.getItem(JSON.stringify("Users"));
    user1 = JSON.parse(user1);
    let all_user1 = localStorage.getItem("Users");
    all_user1 = JSON.parse(all_user1);
    for (let i = 0; i < all_user1.length; i++) {
        for (const [key, value] of Object.entries(all_user1[i])) {
            if (key == "email" && all_user1[i].email == user1) {
                console.log(all_user1[i]);
                for (const [key, value] of Object.entries(all_user1[i])) {
                    if (key == "first_name") {
                        fname.value = all_user1[i].first_name;
                        console.log(fname.value);
                    } else if (key == "last_name") {
                        lname.value = all_user1[i].last_name;

                    }
                    else if (key == "password") {
                        pwd.value = all_user1[i].password;
                        cpwd.value=all_user1[i].password;
                    }
                    else if (key == "gender") {
                        let str1=all_user1[i].gender;
                        let str2="";
                        for(let i=0;i<gender.length;i++){
                            str2=gender[i].value;
                            if(str1==str2){
                                gender[i].checked=true;
                            }   
                        }
                    }else if(key=="address"){
                        address.value=all_user1[i].address;


                    }else {
                    }

                }
                break;
            }
            
        }
    }

}

load();



function checkValidImage(){
    let img_RegEx=/.(gif|jpe|jpeg|JPG|JPEG|PNG|png|webp|bmp)$/i;
    return img_RegEx.test(file.value);
}


let newFile = "";
let image_count=0;
let image_selected=0;
function changeFile() {
    submitbtn.disabled = false;
    image_selected=1;

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
    reader.onloadend = function (event) {
        let Image = document.getElementById("profileimg");
        Image.src = event.target.result;
        newFile = Image.src;

        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (all_user[i].email == user) {
                    all_user[i].image = newFile;
                    console.log(newFile);
                    break;
                }
            }
        }

    }
}

let user = sessionStorage.getItem(JSON.stringify("Users"));
user = JSON.parse(user);


let all_user = localStorage.getItem("Users");
all_user = JSON.parse(all_user);





function validateFirstName() {
    submitbtn.disabled = false;
    let error_fname = document.querySelector(".error-fname");
    if (regex_fname.test(fname.value)) {
        error_fname.innerHTML = " ";
        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (all_user[i].email == user) {
                    all_user[i].first_name = fname.value;
                    break;
                }
            }
        }

    }
    else {
        // error_fname.innerHTML = "Enter Alphabet only";
    }
}

function validateLastName() {
    submitbtn.disabled=false;
    let error_lname = document.querySelector(".error-lname");
    if (regex_lname.test(lname.value)) {

        error_lname.innerHTML = " ";
        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (all_user[i].email == user) {
                    all_user[i].last_name = lname.value;
                    break;
                }
            }
        }

    }
    else {

        // error_lname.innerHTML = "Enter Alphabet only";
    }
}


let check = 0;
let pwd_check=0;
function checkPassword() {
     submitbtn.disabled = false;

    if((pwd.value).length<8){
        error_pwd.innerHTML="Password length should be 8 character";
        check=1;
    }
    else if((pwd.value).search(/[0-9]/)===-1){
        error_pwd.innerHTML="Password must contain atleast one numric value";
        check=1;
    }
    else if((pwd.value).search(/[a-z]/)===-1){
        error_pwd.innerHTML="Password must contain atleast one small letter";
        check=1;
    }
    else if((pwd.value).search(/[A-Z]/)===-1){
        error_pwd.innerHTML="Password must contain atleast one capital letter";
        check=1;
    }
    else if((pwd.value).search(/[!\@\#\$\%\^\&\*\(\)\_\+\-\:\;]/)===-1){
        error_pwd.innerHTML="Password must contain atleast one special character";
        check=1;
    }else{
        error_pwd.innerHTML=" ";
        check=0;
        pwd_check=1;
    }


    // if (((pwd.value).length) > 6) {
    //     check = 1;
    //     submitbtn.disabled = false;
    //     error_pwd.innerHTML = " "

    // }
    // else {
    //     error_pwd.innerHTML = "Password length should be greater than 6";

    // }

}

let cpwd_check=0

cpwd.addEventListener('blur', confirmPassword);
let pwdcheck = 0
function confirmPassword() {
     submitbtn.disabled = false;
    let error_cpwd = document.querySelector('.error-cpwd');
    if (check == 0) {
        if (pwd.value === cpwd.value) {
            pwdcheck = 0;
            error_cpwd.innerHTML = " ";
            for (let i = 0; i < all_user.length; i++) {
                for (const [key, value] of Object.entries(all_user[i])) {
                    if (all_user[i].email == user) {
                        all_user[i].password = cpwd.value;
                        cpwd_check=1;
                        break;
                    }
                }
            }
            // submitbtn.disabled = false;


        }
        else {

            error_cpwd.innerHTML = "Password Mismatch";
            pwdcheck = 1;


        }
    }
    else {
        // error_submit.innerHTML = "Invalid Passsword";

        
    }


}

function radioValue() {

    let radio_ele = document.getElementsByName('gender');
    let radio_val;
    for (i = 0; i < radio_ele.length; i++) {
        if (radio_ele[i].checked)
            radio_val = radio_ele[i].value;
    }
    for (let i = 0; i < all_user.length; i++) {
        for (const [key, value] of Object.entries(all_user[i])) {
            if (all_user[i].email == user) {
                all_user[i].gender = radio_val;
                break;
            }
        }
    }
}

function validateAddress() {
    for (let i = 0; i < all_user.length; i++) {
        for (const [key, value] of Object.entries(all_user[i])) {
            if (all_user[i].email == user) {
                all_user[i].address = address.value;
                break;
            }
        }
    }
}

function ValidateUpdateProfile() {
    for (let i = 0; i < all_user.length; i++) {
        for (const [key, value] of Object.entries(all_user[i])) {
            if (all_user[i].email == user) {
                all_user[i].image = newFile;
                console.log(newFile);
                break;
            }
        }
    }
}



function submitDetails() {

    if(fname.value==""){
        error_submit.innerHTML="Enter First Name";
        submitbtn.disabled = true;
       
    }
    else if(lname.value==""){

        error_submit.innerHTML="Enter Last Name";
        submitbtn.disabled = true;

    }else if(pwd.value==""){
        error_submit.innerHTML="Enter Password";
        submitbtn.disabled = true;

    }else if(cpwd.value==""){

        error_submit.innerHTML="Enter confirm  Password";
        submitbtn.disabled = true;

    }else{

    radioValue();
    if(image_selected==1 && image_count==0){
        error_submit.innerHTML = "Invalid File";
        submitbtn.disabled = true;

    }
    else if (pwdcheck == 0 && check==0) {
        if(pwd_check==0 && cpwd_check==0){
        localStorage.setItem("Users", JSON.stringify(all_user));
        alert("Profile Updated");
        }else if(pwd_check==1 && cpwd_check==1){
            localStorage.setItem("Users", JSON.stringify(all_user));
        alert("Profile Updated");
        }
        else{
            submitbtn.disabled=true;
            error_submit.innerHTML = "Password Missmatch";

        }

    }
    else {
        submitbtn.disabled = true;
       
        error_submit.innerHTML = "check confirm password or some filed missing";
    }

    }
}

