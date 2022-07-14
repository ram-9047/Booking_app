let form = document.getElementById("form");

// console.log(userInfo);
window.addEventListener("DOMContentLoaded", () => {
  displayUser();
});

async function displayUser() {
  let response = await axios.get(
    "https://crudcrud.com/api/14aa5d8e9bd744d29fa0f916d5816a62/userData"
  );
  let temp = await response.data;
  console.log(temp);
  let displayUserInfo = document.querySelector(".display_post");
  displayUserInfo.innerHTML = "";
  temp.forEach((el) => {
    let li = document.createElement("li");
    let name = document.createElement("h3");
    let email = document.createElement("h3");
    let number = document.createElement("h3");
    let date = document.createElement("h3");
    let time = document.createElement("h3");

    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let edit_btn = document.createElement("button");
    let del_btn = document.createElement("button");

    name.textContent = `Name : ${el.name}`;
    email.textContent = `Email-id : ${el.email}`;
    number.textContent = `Phone Number : ${el.number}`;
    date.textContent = `Date : ${el.date}`;
    time.textContent = `Time : ${el.time}`;

    li.append(name);
    li.append(email);
    li.append(number);
    li.append(date);
    li.append(time);
    displayUserInfo.appendChild(li);
  });
}

// console.log(form)
form.addEventListener("submit", (e) => {
  console.log(e, "event");
  handlePost(e);
});

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
      "https://crudcrud.com/api/14aa5d8e9bd744d29fa0f916d5816a62/userData",
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

function handleDelete(id) {
  axios.delete("");
}
