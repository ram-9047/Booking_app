let form = document.getElementById("form");

window.addEventListener("DOMContentLoaded", () => {
  displayUser();
});

form.addEventListener("submit", (e) => {
  console.log(e, "event");
  handlePost(e);
});

async function displayUser() {
  let response = await axios.get(
    "https://crudcrud.com/api/aac6918804ca43d6ade737b2d77055af/userData"
  );
  let temp = await response.data;
  console.log(temp, "data from fetch");
  let displayUserInfo = document.querySelector(".display_post");
  displayUserInfo.innerHTML = "";
  temp.forEach((el) => {
    let li = document.createElement("li");
    let name = document.createElement("h3");
    let email = document.createElement("h3");
    let number = document.createElement("h3");
    let date = document.createElement("h3");
    let time = document.createElement("h3");

    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let edit_btn = document.createElement("button");
    edit_btn.innerText = "Edit";
    let del_btn = document.createElement("button");
    del_btn.innerText = "Delete";

    li.id = el._id;
    name.textContent = `Name : ${el.name}`;
    email.textContent = `Email-id : ${el.email}`;
    number.textContent = `Phone Number : ${el.number}`;
    date.textContent = `Date : ${el.date}`;
    time.textContent = `Time : ${el.time}`;
    del_btn.addEventListener("click", () => handleDelete(el._id));
    edit_btn.addEventListener("click", () => handleEdit(el));

    li.append(name);
    li.append(email);
    li.append(number);
    li.append(date);
    li.append(time);
    li.append(del_btn);
    li.append(edit_btn);
    // div1.appendChild(li)
    displayUserInfo.appendChild(li);
    // displayUserInfo.appendChild(div2)
  });
}

function getValue(name) {
  return document.getElementById(name).value;
}

function handlePost(event) {
  event.preventDefault();
  let name = getValue("name");
  let email = getValue("email");
  let number = getValue("number");
  let date = getValue("date");
  let time = getValue("time");

  let data = {
    name: name,
    email: email,
    number: number,
    date: date,
    time: time,
  };

  axios
    .post(
      "https://crudcrud.com/api/aac6918804ca43d6ade737b2d77055af/userData",
      data
    )
    .then(function sucess(msg) {
      console.log(msg);
    })
    .catch(function failure(msg) {
      console.log(msg);
    });

  displayUser();
}

///// -----------DELETE USER----------

async function handleDelete(id) {
  console.log(id, "handle del");
  await axios
    .delete(
      `https://crudcrud.com/api/aac6918804ca43d6ade737b2d77055af/userData/${id}`
    )
    .then(function sucess(msg) {
      console.log(msg);
      displayUser();
    })
    .catch(function failure() {
      console.log(msg);
    });
}

/////////////-------------EDit User

function handleEdit(item) {
  console.log(item);
  let nameInput = document.getElementById("name");
  nameInput.value = item.name;
  let emailInput = document.getElementById("email");
  emailInput.value = item.emailId;
  let numberInput = document.getElementById("number");
  numberInput.value = item.number;
  let dateInput = document.getElementById("date");
  dateInput.value = item.date;
  let timeInput = document.getElementById("time");
  timeInput.value = item.time;

  let update_btn = document.getElementById("update-button");
  update_btn.style.display = "block";
  let smt_btn = document.getElementById("submit-button");
  smt_btn.style.display = "none";

  update_btn.addEventListener("click", (e, item) => handleEditPost(e, item));
}

function handleEditPost(e, item) {
  e.preventDefault();
  let name = getValue("name");
  let email = getValue("email");
  let number = getValue("number");
  let date = getValue("date");
  let time = getValue("time");

  let data = {
    name: name,
    email: email,
    number: number,
    date: date,
    time: time,
  };

  axios
    .put(
      `https://crudcrud.com/api/aac6918804ca43d6ade737b2d77055af/userData/${item._id}`,
      data
    )
    .then(function sucess(msg) {
      console.log(msg);
    })
    .catch(function failure(msg) {
      console.log(msg);
    });

  let update_btn = document.getElementById("update-button");
  update_btn.style.display = "none";
  let smt_btn = document.getElementById("submit-button");
  smt_btn.style.display = "block";
  displayUser();
}
