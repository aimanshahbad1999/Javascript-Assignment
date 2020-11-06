console.log("in validation");
const regex_email = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
const regex_fname=/^([a-zA-Z0-9]+)/;
const regex_lname=/^([a-zA-Z0-9]+)/;
const email = document.getElementById('email');
const fname=document.getElementById('fname');
const lname=document.getElementById('lname');


email.addEventListener('blur',validateEmail);
fname.addEventListener('blur',validateFirstName);
lname.addEventListener('blur',validateLastName);

 function validateEmail(){
    let error_email=document.querySelector(".error-email");
    if(regex_email.test(email.value)){
        console.log('Your email is valid');
        error_email.className="resolve";  
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
        error_fname.className="resolve";  
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
        error_lname.className="resolve";  
    }
    else{
        console.log('Your First Name is not valid');
        error_lname.innerHTML="Enter Alphabet only";

        // email.setCustomValidity('Enter Valid Email');
        
    }


}





