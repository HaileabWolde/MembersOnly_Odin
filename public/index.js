const myform = document.getElementById('myform');

const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const username = document.getElementById('username')
const password = document.getElementById("password");
const confrim_password = document.getElementById("confrimpassword");

//error spans
const firstError = document.getElementById('first_name');
const lastError = document.getElementById('last_name');
const user_Error = document.getElementById('user_name')
const passwordError = document.getElementById('pass_word');
const confrimpassword = document.getElementById('confrim_password');

///regex values
const regex = /^[a-zA-Z]+$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;


function validateForm(event){
    event.preventDefault();
    if(!regex.test(firstName.value) || !(firstName.value)){
        firstError.style.display = "block"
        firstError.textContent = "Please type alphabbetic letters only"
        firstError.style.color = '#EA0063'
        firstError.style.fontStyle = "italic"
        firstName.style.border = "2px solid red";
    }
    else if(!regex.test(lastName.value) || !(lastName.value)){
        firstName.style.border = "2px solid #54ACDb";
        firstError.style.display = "none";
        firstName.style.border = "2px solid #54ACDB";
        lastError.style.display = "block";
        lastError.textContent = "Please type alphabbetic letters only";
        lastError.style.color = '#EA0063';
        lastError.style.fontStyle = "italic";
        lastName.style.border = "2px solid red";
    }
   else if(!regex.test(username .value) || !(username.value)){
        lastName.style.border = "2px solid #54ACDb";
        firstError.style.display = "none";
        lastError.style.display = "none";
        username.style.border = "2px solid red";
        user_Error.style.display = "block"
        user_Error.textContent = "Please type alphabbetic letters only";
        user_Error.style.color = '#EA0063';
        user_Error.style.fontStyle = "italic";
      
    }
   
    else if(!regexPassword.test(password.value) || !(password.value)){
        username.style.border = "2px solid #54ACDb";
        firstError.style.display = "none";
        lastError.style.display = "none";
        user_Error.style.display = "none";
        password.style.border = "2px solid red";
        passwordError.style.display = "block";
        passwordError.textContent = "Please Type A password b/n 6 and 12 containing atleast 1 uppercase, 1 lowwercase, 1character"
        passwordError.style.color = '#EA0063';
        passwordError.style.fontStyle = "italic";
    }
    else if(password.value != confrim_password.value || !(confrim_password.value)){
        firstError.style.display = "none";
        firstName.style.border = "2px solid #54ACDB";
        lastError.style.display = "none";
        lastName.style.border = "2px solid #54ACDB";
        password.style.border = "2px solid #54ACDb";
        passwordError.style.display = "none";
        confrimpassword.style.display = "block";
        confrimpassword.textContent = "please make sure password and confrim password is the same";
        confrimpassword.style.color = '#EA0063';
        confrimpassword.style.fontStyle = "italic";
        confrim_password.style.border = "2px solid red";
    }
    else{
        passwordError.style.display = "none";
        confrimpassword.style.display = "none";
        confrim_password.style.border = '2px solid #54ACDB';
        alert("Thank You Your Account Will be Created Shortly")
    }
    }
myform.addEventListener('submit', validateForm);

    