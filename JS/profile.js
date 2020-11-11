const regex_fname = /^([a-zA-Z0-9]+)/;
const regex_lname = /^([a-zA-Z0-9]+)/;


const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const pwd = document.getElementById('pwd');
const cpwd = document.getElementById('cpwd');
const address = document.getElementById('address');
const file = document.getElementById('profileimg');
const error_pwd = document.querySelector('.error-pwd');
const submitbtn = document.getElementById('submit');

fname.addEventListener('blur', validateFirstName);
lname.addEventListener('blur', validateLastName);
submitbtn.addEventListener('click', submitDetails);
pwd.addEventListener('blur', checkPassword);
address.addEventListener('blur', validateAddress);
// file.addEventListener('change', ValidateUpdateProfile);

let newFile="";
function changeFile(){
    let changePicInput = document.getElementById("profileimg");
    let reader = new FileReader();
    reader.readAsDataURL(changePicInput.files[0]);
    reader.onloadend = function(event) {
        let Image = document.getElementById("profileimg");
        Image.src = event.target.result;    
        newFile=Image.src;
        alert(newFile);
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
        error_fname.innerHTML = "Enter Alphabet only";
    }
}

function validateLastName() {
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

        error_lname.innerHTML = "Enter Alphabet only";
    }
}


let check = 0;
function checkPassword() {


    if (((pwd.value).length) > 6) {
        check = 1;
        submitbtn.disabled = false;
        error_pwd.innerHTML = " "

    }
    else {
        error_pwd.innerHTML = "Password length should be greater than 6";

    }

}


cpwd.addEventListener('blur', confirmPassword);
let pwdcheck = 0
function confirmPassword() {
    let error_cpwd = document.querySelector('.error-cpwd');
    if (check == 0) {
        error_pwd.innerHTML = "Password length should be greater than 6";
    }
    else {
        if (pwd.value === cpwd.value) {
            pwdcheck = 0;
            error_cpwd.innerHTML = " ";
            for (let i = 0; i < all_user.length; i++) {
                for (const [key, value] of Object.entries(all_user[i])) {
                    if (all_user[i].email == user) {
                        all_user[i].password = cpwd.value;
                        break;
                    }
                }
            }
            submitbtn.disabled = false;


        }
        else {

            error_cpwd.innerHTML = "Password Mismatch";
            pwdcheck = 1;


        }
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

    if (pwdcheck == 0) {
        localStorage.setItem("Users", JSON.stringify(all_user));

    }
    else {
        submitbtn.disabled = true;
        let error_submit = document.querySelector('.error-submit');
        error_submit.innerHTML = "check confirm password or some filed missing";
    }


}

