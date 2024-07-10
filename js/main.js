

var nameSignUp = document.getElementById('nameSignUp');
var mailSignUp = document.getElementById('mailSignUp');
var passSignUp = document.getElementById('passSignUp');
var btnSignUp = document.getElementById('btnSignUp');
var mailExist = document.getElementById('mailExist');
var signUpMessage = document.getElementById('signUpMessage');
var success = document.getElementById('success');
var loginMail = document.getElementById('loginMail');
var loginPass = document.getElementById('loginPass');
var btnLogin = document.getElementById('btnLogin');
var wrongMessage = document.getElementById('wrongMessage');
var userName = localStorage.getItem('loginUser')
var logOut = document.getElementById('logOut')

var array;

if (localStorage.getItem('feedBack') == null) {
    array = []
}
else {
    array = JSON.parse(localStorage.getItem('feedBack'))
}

btnSignUp?.addEventListener('click', function signUp() {

    if (check() == false && isExist() == false) {
        var user = {
            name: nameSignUp.value,
            mail: mailSignUp.value,
            pass: passSignUp.value,
        }
        array.push(user)
        localStorage.setItem('informationUser', JSON.stringify(array))
        clear()
        success.classList.replace('d-none', 'd-block')
    }


})


function clear() {
    nameSignUp.value = "";
    mailSignUp.value = "";
    passSignUp.value = "";

    nameSignUp.classList.remove('is-valid', 'is-invalid');
    mailSignUp.classList.remove('is-valid', 'is-invalid');
    passSignUp.classList.remove('is-valid', 'is-invalid');
}


function validateInputs(element) {

    if (element.value == "") {
        element.classList.remove('is-valid', 'is-invalid')
        element.nextElementSibling.classList.replace('d-block', 'd-none')
        return false
    }

    var regex = {
        nameSignUp: /^[A-z]{2,6}$/,
        mailSignUp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        passSignUp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        loginMail: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        loginPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block', 'd-none')
    }
    else {
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none', 'd-block')

    }
}

nameSignUp?.addEventListener('input', function () {
    validateInputs(nameSignUp)
})
mailSignUp?.addEventListener('input', function () {
    validateInputs(mailSignUp)
})
passSignUp?.addEventListener('input', function () {
    validateInputs(passSignUp)
})
loginMail?.addEventListener('input', function () {
    validateInputs(loginMail)
})
loginPass?.addEventListener('input', function () {
    validateInputs(loginPass)
})


function isExist() {
    for (let i = 0; i < array.length; i++) {
        if (array[i].mail == mailSignUp.value) {
            mailExist.classList.replace('d-none', 'd-block')
            return true
        }
    }
    mailExist.classList.replace('d-block', 'd-none')
    return false
}


function check() {
    if (nameSignUp.value == "" || mailSignUp.value == "" || passSignUp.value == "") {
        signUpMessage.classList.replace('d-none', 'd-block')
        success.classList.replace('d-block', 'd-none')
        return true
    }
    else {
        signUpMessage.classList.replace('d-block', 'd-none')
        return false
    }
}



btnLogin?.addEventListener('click', function login() {
    var userFound = false
    for (let i = 0; i < array.length; i++) {
        if (array[i].mail == loginMail.value && array[i].pass == loginPass.value) {

            localStorage.setItem('loginUser', array[i].name)
            window.location.replace ('welcome.html')
            userFound = true
        }

    }
    if (userFound == false) {
        wrongMessage.classList.replace('d-none', 'd-block')
    }
    else {
        wrongMessage.classList.replace('d-block', 'd-none')

    }
})


function welcome() {
    document.getElementById('welcome').innerHTML = ' welcome ' + userName
}

window.addEventListener('load', welcome)



logOut?.addEventListener('click', function logOut() {
    localStorage.removeItem('loginUser')
    window.location.replace ('login.html') 
})