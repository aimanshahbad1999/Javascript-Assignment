

window.addEventListener("DOMContentLoaded", function () {
    let user = sessionStorage.getItem(JSON.stringify("Users"));
    user = JSON.parse(user);
    if (user == null) {
        window.location = 'login.html';
    }
});

// window.onload = function() {
//     if(sessionStorage.getItem("Users")==null){
//                 window.location='login.html';
//             }
//             else{

//             }

//   };




const addTodo = document.getElementById('add-todo');
const refresh = document.getElementById('refresh');
const pop_up = document.querySelector('.pop-up');
const show_date = document.querySelector('.show-date');
const main_body = document.querySelector('.main-body');
const submit = document.getElementById('submit');
let invalid_img = document.querySelector('.invalid-image');
const cancel = document.getElementById('cancel');
const update = document.getElementById('edit-submit');
const ul = document.querySelector('ul');
const ul1 = document.querySelector('.add-reminder');
const del_chk = document.getElementById('del-check');
const logout = document.getElementById('logout');
let getImage = document.getElementById('get-profile');
const getProfileName = document.getElementById('profile-name');
const getProfileEmail = document.getElementById('profile-email');
const searchval = document.getElementById('search');
const searchDate = document.getElementById('sdate');
const searchDate1 = document.getElementById('sdate1');
const date_search = document.querySelector(".searchdate");
const searchCat = document.getElementById('scategory');
const searchStatus = document.getElementById('sstatus');
const edit_cancel = document.getElementById('edit-cancel');
const edit_submit = document.getElementById('edit-submit');
const edit_pop_up = document.querySelector('.edit-pop-up');
let get_date = document.getElementById('date');
let edit_get_date = document.getElementById('edate');
let add_end_date = "";
get_date.addEventListener('click', () => {
    console.log("hello");
    let today = new Date().toISOString().slice(0, 10);
    get_date.setAttribute("min", today);
    get_date.setAttribute("max", add_end_date);
});


edit_get_date.addEventListener('click', () => {
    console.log("hello");
    let today = new Date().toISOString().slice(0, 10);
    edit_get_date.setAttribute("min", today);
});

let multi_li_del = [];


refresh.addEventListener('click', refreshItem);

function refreshItem() {
    location.reload();
}
let add_del_btn=0;
function load() {
    add_del_btn=0;
    let add = 0;
    let user = sessionStorage.getItem(JSON.stringify("Users"));
    user = JSON.parse(user);
    let all_user = localStorage.getItem("Users");
    all_user = JSON.parse(all_user);
    let update_user;
    let check = 0;
    for (let i = 0; i < all_user.length; i++) {
        for (const [key, value] of Object.entries(all_user[i])) {
            if (key == "email" && all_user[i].email == user) {
                update_user = all_user[i];
                if (update_user.hasOwnProperty("todo")) {
                    let key_id = 1;
                    for (let j = 0; j < all_user[i].todo.length; j++) {

                        for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                            if (key == "id") {
                                console.log(all_user[i].todo[j]);
                                all_user[i].todo[j].id = key_id;
                                key_id = key_id + 1;

                            }

                        }

                        console.log(all_user[i].todo);


                    }

                    check = 1;
                }

                break;
            }
            else {

            }
        }
    }

    localStorage.setItem("Users", JSON.stringify(all_user));


    if (check == 1) {
        let todo = update_user.todo;
        for (let i = 0; i < todo.length; i++) {
            let newElm = document.createElement('li');
            newElm.className = "a";
            let content = `
    
    <div class="todo-style">
    <div>
    <label class="id">${todo[i].id}</label><br><br>
    <img src="${todo[i].image}" alt="${todo[i].name}" style="width: 50px; height: 50px;">
    </div>
    <div>
    <label>Name:</label>
    <label class="name">${todo[i].name}</label><br>
    <label>End Date:</label>
    <label>${todo[i].end_date}</label><br>
    <label>Reminder Date:</label>
    <label>${todo[i].reminder_date}</label><br>
    <label>Category:</label>
    <label>${todo[i].category}</label><br>
    <label>Status:</label>
    <label>${todo[i].status}</label><br>
    </div><br>
    </div>

    
    
   
    <img src="images/edit.png" alt="" srcset="" id="edit" name="edit">
    <img src="images/delete.png" alt="" srcset="" id="delete" name="delete">
    <input type="checkbox" id="multi-delete" name="check">

    `;
            console.log(content);
            newElm.innerHTML = content;
            ul.appendChild(newElm)
            add_del_btn=1;


            add = 1;
        }
    } else {

    }
    let reminder_found = 0;
    for (let i = 0; i < all_user.length; i++) {
        for (const [key, value] of Object.entries(all_user[i])) {
            if (key == "email" && all_user[i].email == user) {
                reminder_data = all_user[i];
                if (reminder_data.hasOwnProperty("todo")) {
                    console.log("inside 1");
                    for (let j = 0; j < all_user[i].todo.length; j++) {
                        for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                            let today = new Date().toISOString().slice(0, 10);
                            console.log(today);

                            if (key == "reminder_date" && all_user[i].todo[j].reminder_date == today && all_user[i].todo[j].status != "done" && all_user[i].todo[j].reminder != 'no') {
                                console.log("inside 2");

                                console.log("inside 3");

                                let newElm1 = document.createElement('li');

                                let content1 = `
    
                                                    <div>
                                                    <img src="${all_user[i].todo[j].image}" alt="${all_user[i].todo[j].name}" style="width: 50px; height: 50px;"><br>
                                                    <label>Name:</label>
                                                    <label class="name">${all_user[i].todo[j].name}</label><br>
                                                    <label>End Date:</label>
                                                    <label>${all_user[i].todo[j].end_date}</label><br>
                                                    <label>Reminder Date:</label>
                                                    <label>${all_user[i].todo[j].reminder_date}</label><br>
                                                    <label>Category:</label>
                                                    <label>${all_user[i].todo[j].category}</label><br>
                                                    <label>Status:</label>
                                                    <label>${all_user[i].todo[j].status}</label><br>
                                                    </div><br>

                                                    `;

                                newElm1.innerHTML = content1;
                                newElm1.classList.add("li2");
                                ul1.appendChild(newElm1);
                                reminder_found = 1;



                            }


                        }


                    }


                }

            }

        }
    }

    if (reminder_found == 1) {

    } else {
        let r_found = document.querySelector('.reminder-not-found');
        r_found.style.display = "block";
    }

    let empty = document.querySelector('.add');
    if (add == 1) {

        empty.classList.add('dis');

    } else {
        empty.classList.remove('dis');

    }

    if(add_del_btn==1){
        let delete_btn=document.getElementById('del-check');
        delete_btn.style.display="block";
        

    }else{
       
    }
}

function callAlert(r) {
    window.location = "todo.html";
}

function alertRem() {
    let user = sessionStorage.getItem(JSON.stringify("Users"));
    user = JSON.parse(user);
    let all_user = localStorage.getItem("Users");
    all_user = JSON.parse(all_user);
    let update_user;
    let check = 0;
    for (let i = 0; i < all_user.length; i++) {
        if (all_user[i].email == user) {
            getProfileName.innerHTML = all_user[i].first_name;
            getProfileEmail.innerHTML = all_user[i].email;
            getImage.src = all_user[i].image;
            console.log(all_user[i].first_name);
            console.log(all_user[i].email);
            if (all_user[i].email == user && all_user[i].hasOwnProperty('todo')) {
                for (let j = 0; j < all_user[i].todo.length; j++) {
                    for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                        let today = new Date().toISOString().slice(0, 10);
                        if ((all_user[i].todo[j].reminder == "yes") && (all_user[i].todo[j].date == today)) {
                            let r = `REMINDER ALERT \n Name:${all_user[i].todo[j].name}\n Date:${all_user[i].todo[j].date}`;
                            // alert(r);
                            break;
                        }
                    }
                }
            } else {

            }
        } else {

        }
    }



}


load();
alertRem();





logout.addEventListener('click', () => {
    sessionStorage.clear();


});


addTodo.addEventListener('click', addTask);
submit.addEventListener('click', submitItem);
cancel.addEventListener('click', cancelItem);
ul.addEventListener('click', handelEvent);
del_chk.addEventListener('click', DeleteMultipleCheck)



searchval.addEventListener('keyup', function (e) {
    let name_found = 0;
    let found = document.getElementById('date-found');
   
    found.style.display="none";



    const filterVal = e.target.value.toLowerCase();
    const ul = document.querySelector('ul');
    const li = ul.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        if (li[i].textContent.toLowerCase().indexOf(filterVal) != -1) {
            li[i].style.display = 'block';
            name_found = 1;
        } else {
            li[i].style.display = 'none';
            // name_found = 0;
        }
    }
    let demo = 0;

    if (name_found == 1) {
        demo = 1;
    }

    if (searchval == '') {
        found.style.display = "none";

    } else 
    if (name_found ==1) {
        found.style.display = "none";


    } else {
        found.style.display = "block";

    }


});

let date_list = [];

searchDate.addEventListener('change', function (e) {
    let date_found = document.getElementById('date-found');
    date_found.style.display = "none";
    let d1, d2;

    date_search.classList.remove("searchdate");

    d1 = new Date(searchDate.value);
    d1.setDate(d1.getDate() + 1);
    let sdate = document.getElementById('sdate').value;
    searchDate1.setAttribute('min', sdate);

    searchDate1.addEventListener('change', function () {
        let date_found1 = document.getElementById('date-found');
        date_found1.style.display = "none";
        d2 = new Date(searchDate1.value);
        d2.setDate(d2.getDate() + 1);



        let new_ul = document.querySelector('.add-li');
        ul.innerHTML = "";

        let user = sessionStorage.getItem(JSON.stringify("Users"));
        user = JSON.parse(user);
        let all_user = localStorage.getItem("Users");
        all_user = JSON.parse(all_user);

        date_list = [];



        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (all_user[i].email == user) {
                    for (let j = 0; j < all_user[i].todo.length; j++) {
                        for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                            if (key == "end_date") {
                                let check_date = new Date(all_user[i].todo[j].end_date);
                                check_date.setDate(check_date.getDate() + 1);

                                if (check_date >= d1 && check_date <= d2) {
                                    console.log("********");
                                    if (date_list.includes(all_user[i].todo[j].id)) {

                                    }
                                    else {
                                        date_list.push(all_user[i].todo[j].id);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(date_list);


        let id_list = [];
        let content2;
        let date_found = 0;
        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (all_user[i].email == user) {
                    for (let j = 0; j < all_user[i].todo.length; j++) {
                        for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                            if (date_list.includes(all_user[i].todo[j].id)) {
                                if (id_list.includes(all_user[i].todo[j].id)) {


                                }
                                else {
                                    let newElm2 = document.createElement('li');
                                    console.log("Hello")
                                    id_list.push(all_user[i].todo[j].id)
                                    console.log(id_list);
                                    content2 = `
    
                                    <div class="todo-style">
                                    <div>
                                    <label class="id">${all_user[i].todo[j].id}</label><br><br>
                                    <img src="${all_user[i].todo[j].image}" alt="${all_user[i].todo[j].name}" style="width: 50px; height: 50px;">
                                    </div>
                                    <div>
                                    <label>Name:</label>
                                    <label class="name">${all_user[i].todo[j].name}</label><br>
                                    <label>End Date:</label>
                                    <label>${all_user[i].todo[j].end_date}</label><br>
                                    <label>Reminder Date:</label>
                                    <label>${all_user[i].todo[j].reminder_date}</label><br>
                                    <label>Category:</label>
                                    <label>${all_user[i].todo[j].category}</label><br>
                                    <label>Status:</label>
                                    <label>${all_user[i].todo[j].status}</label><br>
                                    </div><br>
                                    </div>

                                    `;

                                    console.log(content2);
                                    newElm2.innerHTML = content2;
                                    // newElm2.classList.add("li1");
                                    ul.appendChild(newElm2);
                                    date_found = 1;





                                }


                            }

                        }


                    }

                }

            }

        }

        if (date_found == 1) {

        }
        else {

            let date_found = document.getElementById('date-found');
            console.log(date_found.innerHTML);
            date_found.style.display = "block";


        }






    });





    // ul.innerHTML = "";

    // const filterVal = e.target.value;
    // const ul = document.querySelector('ul');
    // const li = ul.querySelectorAll('li');
    // for (let i = 0; i < li.length; i++) {
    //     if (li[i].textContent.indexOf(filterVal) != -1) {
    //         li[i].style.display = 'block';
    //     } else {
    //         li[i].style.display = 'none';
    //     }
    // }


});


searchCat.addEventListener('click', function (e) {
    let cat_found = 0;
    let found = document.getElementById('date-found');
    found.style.display = "none";

    const filterVal = e.target.value;
    const ul = document.querySelector('ul');
    const li = ul.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        if (li[i].textContent.indexOf(filterVal) != -1) {
            li[i].style.display = 'block';
            cat_found = 1;
        } else {
            li[i].style.display = 'none';
            // cat_found = 0;
        }
    }

    if (cat_found == 1) {
        found.style.display = "none";

    } else {
        found.style.display = "block";
    }

});


searchStatus.addEventListener('click', function (e) {
    let status_found = 0;
    let found = document.getElementById('date-found');
    found.style.display = "none";
    const filterVal = e.target.value;
    const ul = document.querySelector('ul');
    const li = ul.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        if (li[i].textContent.indexOf(filterVal) != -1) {
            li[i].style.display = 'block';
            status_found = 1;
        } else {
            li[i].style.display = 'none';
            // status_found = 0;
        }
    }

    if (status_found == 1) {
        found.style.display = "none";

    } else {
        found.style.display = "block";
    }

});
let newFile;
function changeImg() {
    let changePicInput = document.getElementById("img");
    let img_RegEx = /.(gif|jpe|jpeg|JPG|JPEG|PNG|png|webp|bmp)$/i;
    let img_test = img_RegEx.test(changePicInput.value);

    if (img_test == true) {
        submit.disabled = false;
        invalid_img.innerHTML = ""
        let reader = new FileReader();
        reader.readAsDataURL(changePicInput.files[0]);
        reader.onloadend = function (event) {
            let Image = document.getElementById("img");
            Image.src = event.target.result;
            // console.log(Image);
            newFile = Image.src;

            if (newFile != null) {
                check_image = 1;

            }
            else {
                check_image = 0;
            }

            // console.log(newFile);

        }

    }
    else {
        submit.disabled = true;
        invalid_img.innerHTML = "Invalid Image";
        invalid_img.classList.add("add-color");
    }


}

function handelEvent(e) {

    if (e.target.name == 'delete') {
        handelDelete(e);
    }

    if (e.target.name == 'edit') {
        handelEdit(e.target.parentNode);

    }

    if (e.target.name = 'check') {

        handelMultipleDelete(e);

    }

}
// let handelDel=document.getElementById('del-check');

function handelMultipleDelete(e) {
    // handelDel.style.display='block';
    let li_id = e.target.parentNode.querySelector('.id').innerHTML;
    multi_li_del.push(parseInt(li_id));


}

function DeleteMultipleCheck() {
    if (confirm("Press Ok button to delete multiple Todo!")) {
        console.log(multi_li_del);
        if (multi_li_del.length == 0) {
            alert("Checkbox Not Selected");
        }

        else {
            let user = sessionStorage.getItem(JSON.stringify("Users"));
            user = JSON.parse(user);
            let all_user = localStorage.getItem("Users");
            all_user = JSON.parse(all_user);
            let update_user;
            let check = 0;
            for (let i = 0; i < all_user.length; i++) {
                for (const [key, value] of Object.entries(all_user[i])) {
                    if (all_user[i].email == user) {
                        for (let j = 0; j < all_user[i].todo.length; j++) {
                            for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                                console.log(multi_li_del.includes(all_user[i].todo[j].id));
                                if (multi_li_del.includes(all_user[i].todo[j].id)) {
                                    all_user[i].todo.splice(j, 1);
                                    localStorage.setItem("Users", JSON.stringify(all_user));
                                    location.reload();
                                }
                            }

                        }

                        break;
                    }
                    else {

                    }
                }
            }
        }

    } else {
        location.reload();

    }


}

function handelDelete(e) {

    if (confirm("Press Ok button to Delete ToDo Item")) {
        let item = e.target.parentNode;
        let update = item.querySelector('.id').innerHTML;
        item.remove();
        let all_user = localStorage.getItem("Users");
        all_user = JSON.parse(all_user);
        let user = sessionStorage.getItem(JSON.stringify("Users"));
        user = JSON.parse(user);
        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (all_user[i].email == user) {
                    for (let j = 0; j < all_user[i].todo.length; j++) {
                        for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                            if (all_user[i].todo[j].id == update) {
                                all_user[i].todo.splice(j, 1);
                                localStorage.setItem("Users", JSON.stringify(all_user));
                                break;
                            }

                        }

                    }

                }
                else {

                }
            }
        }

        location.reload();
    } else {
        location.reload();
    }

}
// let ename=0;


let ename = document.getElementById('ename');
ename.addEventListener('keyup', () => {
    edit_submit.disabled = false;
});


let edate = document.getElementById('edate');
edate.addEventListener('change', () => {
    edit_submit.disabled = false;
});

let rdate = document.getElementById('rdate');
rdate.addEventListener('change', () => {
    edit_submit.disabled = false;
});




let c_edit_name = 0;
let c_edit_edate = 0;
let c_edit_rdate = 0;
function getEditName() {
    const name = document.getElementById('ename').value;
    if (name == '') {
        // ename=0;
        c_edit_name = 0;
    }
    else {
        c_edit_name = 1;
        // ename=1;
    }
    return name;
}

function getEditDate() {

    const date = document.getElementById('edate').value;
    if (date == '') {
        c_edit_edate = 0;
    } else {
        c_edit_edate = 1;
    }
    return date;

}

function getEditCategory() {
    let radio_c = document.getElementsByName('ecategory');
    let category;
    for (i = 0; i < radio_c.length; i++) {
        if (radio_c[i].checked)
            category = radio_c[i].value;
    }
    return category;

}


function getEditStatus() {
    let radio_s = document.getElementsByName('estatus');
    let status;
    for (i = 0; i < radio_s.length; i++) {
        if (radio_s[i].checked)
            status = radio_s[i].value;
    }

    return status;
}

function getEditReminder() {
    let radio_rem = document.getElementsByName('eremind');
    let reminder;
    for (i = 0; i < radio_rem.length; i++) {
        if (radio_rem[i].checked)
            reminder = radio_rem[i].value;
    }

    return reminder;
}

function getEditPublic() {
    let radio_pub = document.getElementsByName('epublic');
    let public;
    for (i = 0; i < radio_pub.length; i++) {
        if (radio_pub[i].checked)
            public = radio_pub[i].value;
    }

    return public;
}

function getEditFile() {
    const file = document.getElementById('efile');
    let image = file.value;

    return image;


}


function getEditReminderDate() {
    const rdate = document.getElementById('rdate').value;
    if (rdate == '') {
        c_edit_rdate = 0;
    } else {
        c_edit_rdate = 1;
    }
    return rdate;
}



function handelEdit(e) {


    edit_pop_up.classList.remove('dis');
    edit_pop_up.classList.add('enable');
    reminder_alert.classList.add("dis");
    reminder_text.classList.add("dis");






    let item = e;
    let add_val = e;
    add_val = add_val.querySelector('.id').innerHTML;
    console.log(add_val);
    let user = sessionStorage.getItem(JSON.stringify("Users"));
    user = JSON.parse(user);

    let all_user = localStorage.getItem("Users");
    all_user = JSON.parse(all_user);
    const name = document.getElementById('ename');
    const date = document.getElementById('edate');
    const category = document.getElementsByName('ecategory');
    const status = document.getElementsByName('estatus');
    const reminder = document.getElementsByName('eremind');
    const public = document.getElementsByName('epublic');
    const r_date = document.getElementById('rdate');

    r_date.addEventListener('click', () => {
        let today = new Date().toISOString().slice(0, 10);
        r_date.setAttribute("min", today);
        r_date.setAttribute("max", date.value);
    });


    for (let i = 0; i < all_user.length; i++) {
        for (const [key, value] of Object.entries(all_user[i])) {
            if (all_user[i].email == user) {
                for (let j = 0; j < all_user[i].todo.length; j++) {
                    for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                        if (key == "id" && all_user[i].todo[j].id == add_val) {
                            name.value = all_user[i].todo[j].name;
                            date.value = all_user[i].todo[j].end_date;
                            r_date.value = all_user[i].todo[j].reminder_date;

                            let str1 = all_user[i].todo[j].category;
                            let str2 = "";
                            for (let i = 0; i < category.length; i++) {
                                str2 = category[i].value;
                                if (str1 == str2) {
                                    category[i].checked = true;
                                }
                            }

                            str1 = all_user[i].todo[j].status;
                            str2 = "";
                            for (let i = 0; i < status.length; i++) {
                                str2 = status[i].value;
                                if (str1 == str2) {
                                    status[i].checked = true;
                                }
                            }


                            str1 = all_user[i].todo[j].reminder;
                            str2 = "";
                            for (let i = 0; i < reminder.length; i++) {
                                str2 = reminder[i].value;
                                if (str1 == str2) {
                                    reminder[i].checked = true;
                                }
                            }

                            str1 = all_user[i].todo[j].public;
                            str2 = "";
                            for (let i = 0; i < public.length; i++) {
                                str2 = public[i].value;
                                if (str1 == str2) {
                                    public[i].checked = true;
                                }
                            }

                            break;

                        }
                    }
                }
            }
        }
    }







    edit_submit.addEventListener('click', () => {

        let edit_error = document.querySelector('.edit-error');




        let edit_name = getEditName();
        let edit_date = getEditDate();
        let edit_category = getEditCategory();
        let edit_status = getEditStatus();
        let edit_reminder = getEditReminder();
        let edit_rem_date = getEditReminderDate();
        let edit_public = getEditPublic();
        // let edit_file = getEditFile();

        if (c_edit_name == 1 && c_edit_edate == 1 && c_edit_rdate == 1) {
            reminder_text.classList.remove("dis");
            reminder_alert.classList.remove("dis");
            edit_error.innerHTML = "";
            item = item.querySelector('.id').innerHTML;
            console.log(parseInt(item));
            let user = sessionStorage.getItem(JSON.stringify("Users"));
            user = JSON.parse(user);

            let all_user = localStorage.getItem("Users");
            all_user = JSON.parse(all_user);

            let update_user;
            let check = 0;
            for (let i = 0; i < all_user.length; i++) {
                for (const [key, value] of Object.entries(all_user[i])) {
                    if (all_user[i].email == user) {
                        for (let j = 0; j < all_user[i].todo.length; j++) {
                            for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                                if (all_user[i].todo[j].id == item) {


                                    if (edit_name != '') {

                                        all_user[i].todo[j].name = edit_name;


                                    }

                                    if (edit_date != '') {

                                        all_user[i].todo[j].end_date = edit_date;

                                    }

                                    if (edit_category != undefined) {

                                        all_user[i].todo[j].category = edit_category;

                                    }

                                    if (edit_status != undefined) {

                                        all_user[i].todo[j].status = edit_status;

                                    }

                                    if (edit_reminder != undefined) {

                                        all_user[i].todo[j].reminder = edit_reminder;

                                    }

                                    if (edit_public != undefined) {

                                        all_user[i].todo[j].public = edit_public;

                                    }

                                    if (edit_rem_date != '') {

                                        all_user[i].todo[j].reminder_date = edit_rem_date;

                                    }

                                    // if (edit_file != undefined) {

                                    //     all_user[i].todo[j].image = edit_file;

                                    // }


                                    localStorage.setItem("Users", JSON.stringify(all_user));
                                    location.reload();

                                }
                                break;


                            }
                        }



                        break;
                    }
                    else {

                    }
                }
            }
            location.reload();
        } else if (c_edit_name == 0 && c_edit_edate == 0 && c_edit_rdate == 0) {
            edit_error.innerHTML = "Enter Name, Select date and reminder date";
            edit_submit.disabled = true;

        } else if (c_edit_name == 0) {
            edit_error.innerHTML = "Enter Name";
            edit_submit.disabled = true;

        } else if (c_edit_edate == 0) {
            edit_error.innerHTML = "Select date";
            edit_submit.disabled = true;

        } else if (c_edit_rdate == 0) {
            edit_error.innerHTML = "Select reminder date";
            edit_submit.disabled = true;


        } else {

        }
    });

}


edit_cancel.addEventListener('click', handelEditcancel);

function handelEditcancel() {
    edit_pop_up.classList.add('dis');
    reminder_alert.classList.remove("dis");
    reminder_text.classList.remove("dis");
    location.reload();

}


let reminder_alert = document.querySelector(".reminder-alert");
let reminder_text = document.querySelector(".reminder-text");
function addTask() {

    pop_up.classList.remove('edit-pop-up');
    main_body.classList.add("main");
    pop_up.classList.add("display-pop-up");
    reminder_alert.classList.add("dis");
    reminder_text.classList.add("dis");




}

function getDate() {


    let date = document.getElementById('date').value;
    new_date = date;
    date.value = '';

    return new_date;

}

function getCategory() {
    let radio_c = document.getElementsByName('category');
    let category;
    for (i = 0; i < radio_c.length; i++) {
        if (radio_c[i].checked)
            category = radio_c[i].value;
    }

    return category;

}


function getStatus() {
    let radio_s = document.getElementsByName('status');
    let status;
    for (i = 0; i < radio_s.length; i++) {
        if (radio_s[i].checked)
            status = radio_s[i].value;
    }

    return status;
}

function getReminder() {
    let radio_rem = document.getElementsByName('remind');
    let reminder;
    for (i = 0; i < radio_rem.length; i++) {
        if (radio_rem[i].checked)
            reminder = radio_rem[i].value;
    }
    return reminder;
}

function getPublic() {
    let radio_pub = document.getElementsByName('public');
    let public;
    for (i = 0; i < radio_pub.length; i++) {
        if (radio_pub[i].checked)
            public = radio_pub[i].value;
    }

    return public;
}

function getFile() {
    const file = document.getElementById('file');
    let image = file.value;

    return image;


}

let check_name = 0;
let check_image = 0;
let check_end_date = 0;

let name = document.getElementById('name');
name.addEventListener('keyup', () => {
    submit.disabled = false;
});

let end_date = document.getElementById('end-date');
end_date.addEventListener('change', () => {
    submit.disabled = false;
});

function getName() {

    let name = document.getElementById('name').value;

    if (name == "") {
        check_name = 0;
    }
    else {
        check_name = 1;
    }
    return name;
}
let reminder = 0;
function getReminderDate(id) {
    reminder_text.classList.add("dis");
    reminder_alert.classList.add("dis");
    console.log("inside getreminderdate");
    console.log(id);
    let = document.getElementById('form-rest').reset();
    let add_reminder = document.getElementById('add-reminder');
    let reminder_date;
    add_reminder.addEventListener('click', () => {


        reminder_date = getDate();
        console.log(reminder_date);

        let user = sessionStorage.getItem(JSON.stringify("Users"));
        user = JSON.parse(user);


        let all_user = localStorage.getItem("Users");
        all_user = JSON.parse(all_user);

        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (key == "email" && all_user[i].email == user) {
                    for (let j = 0; j < all_user[i].todo.length; j++) {
                        for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                            if (key == "id" && all_user[i].todo[j].id == id) {
                                console.log("inside last");
                                all_user[i].todo[j].reminder_date = reminder_date;
                            }

                        }


                    }

                }

            }
        }

        console.log(all_user);
        localStorage.setItem("Users", JSON.stringify(all_user));

        show_date.classList.remove("enable-date");
        main_body.classList.remove("main");
        location.reload();

    });




}

function getEndDate() {
    let end_date = document.getElementById('end-date');
    let today = new Date().toISOString().slice(0, 10);
    end_date.setAttribute("min", today);
    if (end_date.value == "") {
        check_end_date = 0;
    }
    else {
        check_end_date = 1;
    }
    return end_date.value;

}


function submitItem() {

    reminder_text.classList.remove("dis");
    reminder_alert.classList.remove("dis");

    let item_name = getName();
    let item_End_date = getEndDate();
    let item_category = getCategory();
    let item_status = getStatus();
    let item_reminder = getReminder();
    let item_rem_date = undefined;
    let item_public = getPublic();
    let item_file = newFile;
    let item_id = 1;

    if (check_name == 1 && check_image == 1 && check_end_date == 1) {

        add_end_date = item_End_date;

        let user = sessionStorage.getItem(JSON.stringify("Users"));
        user = JSON.parse(user);


        let all_user = localStorage.getItem("Users");
        all_user = JSON.parse(all_user);
        //to increament the id
        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (key == "email" && all_user[i].email == user) {
                    if (all_user[i].hasOwnProperty("todo")) {
                        for (const [key, value] of Object.entries(all_user[i].todo)) {


                            item_id = (all_user[i].todo).length + 1;



                        }

                    }


                }
                else {

                }
            }
        }

        const item = {
            id: item_id,
            name: item_name,
            end_date: item_End_date,
            category: item_category,
            status: item_status,
            reminder: item_reminder,
            reminder_date: item_rem_date,
            image: item_file,
            public: item_public
        };

        if (item_reminder == "yes") {
            pop_up.classList.remove("display-pop-up");
            show_date.classList.add("enable-date");
            reminder_text.classList.remove("dis");
            reminder_alert.classList.remove("dis");
            getReminderDate(item_id, item_End_date);
           
            // console.log("item date");
            // console.log(item_date);



            // pop_up.classList.add('dis');
            // pop_up.classList.remove('edit-pop-up');
            // main_body.classList.add("main");
            // pop_up.classList.add("display-pop-up");


        }

        else {
            location.reload();
            pop_up.classList.remove("display-pop-up");
            main_body.classList.remove("main");


        }








        let update_user;

        for (let i = 0; i < all_user.length; i++) {
            for (const [key, value] of Object.entries(all_user[i])) {
                if (key == "email" && all_user[i].email == user) {
                    update_user = all_user[i];
                    all_user.splice(i, 1);
                    localStorage.setItem("Users", JSON.stringify(all_user));

                    break;
                }
                else {

                }
            }
        }


        // console.log(update_user);   //single object
        // console.log(all_user);  //localStorage
        // console.log(user)   //session

        if (update_user.hasOwnProperty("todo")) {
            update_user["todo"].push(item);
            let data = localStorage.getItem("Users");
            data = JSON.parse(data);
            data.push(update_user);
            localStorage.setItem("Users", JSON.stringify(data));

        } else {
            update_user.todo = [item];
            let data = localStorage.getItem("Users");
            data = JSON.parse(data);
            data.push(update_user);
            localStorage.setItem("Users", JSON.stringify(data));
        }

        let newElm = document.createElement('li');
        let content = `
    <div class="todo-style">
    <div>
    <label>${item_id}</label><br><br>
    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
    </div>
    <div>
   
    <label>Name:</label>
    <label class="name">${item.name}</label><br>
    <label>End Date:</label>
    <label>${item.end_date}</label><br>
    <label>Reminder Date:</label>
    <label>${item.reminder_date}</label><br>
    <label>Category:</label>
    <label>${item.category}</label><br>
    <label>Status:</label>
    <label>${item.status}</label><br>
    </div>
    </div> <br>

    <img src="images/edit.png" alt="" srcset="" id="edit" name="edit">
    <img src="images/delete.png" alt="" srcset="" id="delete" name="delete">
    <input type="checkbox" id="multi-delete" name="check">

    `;
        newElm.innerHTML = content;
        ul.appendChild(newElm);
        // pop_up.classList.remove("display-pop-up");
        // main_body.classList.remove("main");

    }
    else {
        submit.disabled = true;
        let error = document.querySelector('.invalid-image');
        if (check_image == 0 && check_name == 0 && check_end_date == 0) {
            error.innerHTML = "Enter Name, Select Image and Select End Date";

        } else if (check_name == 0) {
            error.innerHTML = "Enter Name";

        } else if (check_end_date == 0) {
            error.innerHTML = "Select End Date";
        }
        else if (check_image == 0) {
            error.innerHTML = "Select Image ";

        }

        else {

        }



    }
}

function cancelItem() {
    pop_up.classList.remove("display-pop-up");
    main_body.classList.remove("main");
    reminder_alert.classList.remove("dis");
    reminder_text.classList.remove("dis");

}




