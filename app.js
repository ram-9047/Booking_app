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
    "https://crudcrud.com/api/3bffd9c54adb4dab8939d1190e5825df/userData"
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
    let del_btn = document.createElement("button");
    del_btn.innerText = "Delete";

    li.id = el._id;
    name.textContent = `Name : ${el.name}`;
    email.textContent = `Email-id : ${el.email}`;
    number.textContent = `Phone Number : ${el.number}`;
    date.textContent = `Date : ${el.date}`;
    time.textContent = `Time : ${el.time}`;
    del_btn.addEventListener("click", () => handleDelete(el._id));

    li.append(name);
    li.append(email);
    li.append(number);
    li.append(date);
    li.append(time);
    li.append(del_btn);
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
      "https://crudcrud.com/api/3bffd9c54adb4dab8939d1190e5825df/userData",
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
      `https://crudcrud.com/api/3bffd9c54adb4dab8939d1190e5825df/userData/${id}`
    )
    .then(function sucess(msg) {
      console.log(msg);
      displayUser();
    })
    .catch(function failure() {
      console.log(msg);
    });
}
