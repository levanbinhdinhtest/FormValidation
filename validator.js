let username = document.querySelector('#username');
let password = document.querySelector('#password');
let email = document.querySelector('#email');
let confirmPassword = document.querySelector('#cf-password');
let form = document.querySelector('form');

function showError(input, message){
    //input.parentelement la lay ra thang cha cua input
    //console.log(input.parentelement) -> showError(username) -> control-form

    let parent = input.parentElement;
    let small = parent.querySelector('small');


    //them class error vao parent
    parent.classList.add('error');
    //them text vao the small
    small.innerText = message;

};

function showSucess(input){
    //input.parentelement la lay ra thang cha cua input
    //console.log(input.parentelement) -> showError(username) -> control-form

    let parent = input.parentElement;
    let small = parent.querySelector('small');


    //them class error vao parent
    parent.classList.remove('error');
    //them text vao the small
    small.innerText ='';

};
//ham ktra input rong va length
function checkEmptyError(listinput,min,max){
    let isEmptyError = false;
    listinput.forEach(input => {
                //chuan hoa input, xoa khoang trang 2 dau
                input.value = input.value.trim();

                //kiem tra rong
                if(!input.value){
                    isEmptyError = true;
                    showError(input,'khong duoc de trong');
                }else{
                    checkLengthError(input, min,max);
                   // showSucess(input);
                }
    });
    return isEmptyError;
}

//test callback
function checkempty2(listinput,mycallback){
    let isEmptyError = false;
    let min = 5;
    let max = 10;
    listinput.forEach(input =>{
        input.value = input.value.trim();
        if(!input.value){
            isEmptyError = true;
            showError(input,'khong duoc de trong');
        }else{
            mycallback(input, min,max);
           // showSucess(input);
        }
    });
}

//check email bang rigex email tren gg
function checkEmailError(input){
    const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim();
    let isEmailError = !regexEmail.test(input.value); 
    if(regexEmail.test(input.value)){
        showSucess(input);
    }else{
        showError(input,'Email Invalid');
    }

    return isEmailError;
}

function checkLengthError(input, min,max){
    input.value = input.value.trim();

    if(input.value.length < min){
        showError(input,`phai co it nhat ${min} ki tu`);
        return true;
    }
    if(input.value.length > max){
        showError(input,`khong duoc vuot qua toi da ${max} ki tu`);
        return true;
    }
    showSucess(input);
    return false;
}

function checkMatchPassword(passwordInput,cfPassword){
    if(passwordInput.value!==cfPassword.value){
        showError(cfPassword,'Mk k trung khop');
        return true;
    }
    return false;
}

form.addEventListener('submit',function(e){
    //khong can load trang khi click
    e.preventDefault();
   // let isEmptyError = checkEmptyError([username , password, email, confirmPassword],5,15);
   let isEmptyError = checkempty2([username , password, email, confirmPassword],checkLengthError);
    let isEmailError = checkEmailError(email);
   // let isUsernameLengthError = checkLengthError(username,3,10);
  //  let isPasswordLengthError = checkLengthError(password,3,15);
    let isMathcPassword = checkMatchPassword(password,confirmPassword);
    
});
