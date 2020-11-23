

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
const refresh=document.getElementById('refresh');
const pop_up = document.querySelector('.pop-up');
const show_date = document.querySelector('.show-date');
const main_body = document.querySelector('.main-body');
const submit = document.getElementById('submit');
const cancel = document.getElementById('cancel');
const update = document.getElementById('edit-submit');
const ul = document.querySelector('ul');
const del_chk = document.getElementById('del-check');
const logout = document.getElementById('logout');
let getImage = document.getElementById('get-profile');
const getProfileName = document.getElementById('profile-name');
const getProfileEmail = document.getElementById('profile-email');
const searchval = document.getElementById('search');
const searchDate = document.getElementById('sdate');
const searchCat = document.getElementById('scategory');
const searchStatus = document.getElementById('sstatus');
const edit_cancel = document.getElementById('edit-cancel');
const edit_submit = document.getElementById('edit-submit');
const edit_pop_up = document.querySelector('.edit-pop-up');


const multi_li_del = [];


refresh.addEventListener('click',refreshItem);

function refreshItem(){
    location.reload();
}

function load() {
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
                    let key_id=1;
                    for(let j=0;j<all_user[i].todo.length;j++){
                        
                        for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                            if(key=="id"){
                            console.log(all_user[i].todo[j]);
                            all_user[i].todo[j].id=key_id;
                            key_id=key_id+1;

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
    
    <div>
    <label class="id">${todo[i].id}</label><br>
    <label>Name:</label>
    <label class="name">${todo[i].name}</label><br>
    <label>Date:</label>
    <label>${todo[i].date}</label><br>
    <label>Category:</label>
    <label>${todo[i].category}</label><br>
    <label>Status:</label>
    <label>${todo[i].status}</label><br>
    </div><br>
    
   
    <img src="images/edit.png" alt="" srcset="" id="edit" name="edit">
    <img src="images/delete.png" alt="" srcset="" id="delete" name="delete">
    <input type="checkbox" id="multi-delete" name="check">

    `;
            newElm.innerHTML = content;
            ul.appendChild(newElm)
        }
    } else {

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
            if (all_user[i].email == user && all_user[i].hasOwnProperty('todo')) {
                for (let j = 0; j < all_user[i].todo.length; j++) {
                    for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                        let today = new Date().toISOString().slice(0, 10);
                        if ((all_user[i].todo[j].reminder == "yes") && (all_user[i].todo[j].date == today)) {
                            let r = `REMINDER ALERT \n Name:${all_user[i].todo[j].name}\n Date:${all_user[i].todo[j].date}`;
                            alert(r);
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
    const filterVal = e.target.value.toLowerCase();
    const ul = document.querySelector('ul');
    const li = ul.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        if (li[i].textContent.toLowerCase().indexOf(filterVal) != -1) {
            li[i].style.display = 'block';
        } else {
            li[i].style.display = 'none';
        }
    }
});


searchDate.addEventListener('change', function (e) {
    const filterVal = e.target.value;
    const ul = document.querySelector('ul');
    const li = ul.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        if (li[i].textContent.indexOf(filterVal) != -1) {
            li[i].style.display = 'block';
        } else {
            li[i].style.display = 'none';
        }
    }


});


searchCat.addEventListener('click', function (e) {
    const filterVal = e.target.value;
    const ul = document.querySelector('ul');
    const li = ul.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        if (li[i].textContent.indexOf(filterVal) != -1) {
            li[i].style.display = 'block';
        } else {
            li[i].style.display = 'none';
        }
    }
});

searchStatus.addEventListener('click', function (e) {
    const filterVal = e.target.value;
    const ul = document.querySelector('ul');
    const li = ul.querySelectorAll('li');
    for (let i = 0; i < li.length; i++) {
        if (li[i].textContent.indexOf(filterVal) != -1) {
            li[i].style.display = 'block';
        } else {
            li[i].style.display = 'none';
        }
    }

});




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

function handelMultipleDelete(e) {
    let li_id = e.target.parentNode.querySelector('.id').innerHTML;
    multi_li_del.push(parseInt(li_id));

}

function DeleteMultipleCheck() {

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
}

function handelDelete(e) {
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
}

function getEditName() {
    const name = document.getElementById('ename').value;
    return name;
}

function getEditDate() {

    const date = document.getElementById('edate').value;
    return date

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



function handelEdit(e) {


    edit_pop_up.classList.remove('dis');
    edit_pop_up.classList.add('enable');


    let item = e;

    edit_submit.addEventListener('click', () => {
        let edit_name = getEditName();
        let edit_date = getEditDate();
        let edit_category = getEditCategory();
        let edit_status = getEditStatus();
        let edit_reminder = getEditReminder();
        let edit_public = getEditPublic();
        // let edit_file = getEditFile();

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

                                    all_user[i].todo[j].date = edit_date;

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

    });
}


edit_cancel.addEventListener('click', handelEditcancel);

function handelEditcancel() {
    edit_pop_up.classList.add('dis');

}



function addTask() {

    pop_up.classList.remove('edit-pop-up');
    main_body.classList.add("main");
    pop_up.classList.add("display-pop-up");

}

function getDate() {

    let new_date;
    const date = document.getElementById('date').value;
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

function getName() {
    const name = document.getElementById('name').value;
    return name;
}

function getReminderDate(id) {
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
                    for(let j=0;j<all_user[i].todo.length;j++){
                        for (const [key, value] of Object.entries(all_user[i].todo[j])) {
                            if(key=="id" && all_user[i].todo[j].id==id){
                                console.log("inside last");
                                all_user[i].todo[j].date=reminder_date;
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




function submitItem() {


    let item_name = getName();
    let item_date = undefined;
    let item_category = getCategory();
    let item_status = getStatus();
    let item_reminder = getReminder();
    let item_public = getPublic();
    // let item_file = getFile();
    let item_id=1;


    

    let user = sessionStorage.getItem(JSON.stringify("Users"));
    user = JSON.parse(user);


    let all_user = localStorage.getItem("Users");
    all_user = JSON.parse(all_user);
    //to increament the id
    for (let i = 0; i < all_user.length; i++) {
        for (const [key, value] of Object.entries(all_user[i])) {
            if (key == "email" && all_user[i].email == user) {
                if(all_user[i].hasOwnProperty("todo")){
                    for (const [key, value] of Object.entries(all_user[i].todo)) {


                        item_id=(all_user[i].todo).length+1;
                        
    
    
                    }
                    
                }


            }
            else {

            }
        }
    }

    const item = {
        id:item_id,
        name: item_name,
        date: item_date,
        category: item_category,
        status: item_status,
        reminder: item_reminder,
        public: item_public
    };

    if (item_reminder == "yes") {
        pop_up.classList.remove("display-pop-up");
        show_date.classList.add("enable-date");
        getReminderDate(item_id);
        // console.log("item date");
        // console.log(item_date);



        // pop_up.classList.add('dis');
        // pop_up.classList.remove('edit-pop-up');
        // main_body.classList.add("main");
        // pop_up.classList.add("display-pop-up");


    }

    else {
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
    <div>
    <label>${item_id}</label><br>
    <label>Name:</label>
    <label class="name">${item.name}</label><br>
    <label>Date:</label>
    <label>${item.date}</label><br>
    <label>Category:</label>
    <label>${item.category}</label><br>
    <label>Status:</label>
    <label>${item.status}</label><br>
    </div> <br>

    <img src="images/edit.png" alt="" srcset="" id="edit" name="edit">
    <img src="images/delete.png" alt="" srcset="" id="delete" name="delete">
    <input type="checkbox" id="multi-delete" name="check">

    `;
    newElm.innerHTML = content;
    ul.appendChild(newElm)
    // pop_up.classList.remove("display-pop-up");
    // main_body.classList.remove("main");
}

function cancelItem() {
    pop_up.classList.remove("display-pop-up");
    main_body.classList.remove("main");

}




