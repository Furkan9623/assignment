const URL = "http://localhost:3002/masai";

function studentFormSubmit(event) {
  event.preventDefault();
  let obj = {
    name: document.getElementById("name").value,
    batch: document.getElementById("batch").value,
    section: document.getElementById("section").value,
    score: document.getElementById("eval_score").value,
    image: document.getElementById("image").value,
  };
  dataPost(obj);
}

// data post
function dataPost(obj) {
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...obj, score: +obj.score }),
  })
    .then((res) => res.json())
    .then((result) => console.log(result))
    .catch((er) => console.log(er));
  getData();
}

// get Data
function getData() {
  fetch(URL)
    .then((res) => res.json())
    .then((result) => {
      ShowOnUI(result);
    })
    .catch((er) => console.log(er));
}
getData();

// show on ui
function ShowOnUI(data) {
  let result = "";
  data.forEach((elem) => {
    console.log(elem.id);
    result += `
          <div class="card">
          <img
            src=${elem.image}
            alt=""
          />
          <p>NAME : ${elem.name}</p>
          <p>SCORE : ${elem.score}</p>
          <p>BATCH : ${elem.batch}</p>
          <p>SECTION : ${elem.section}</p>
          <div>
            <button>REMOVE</button>
            <button>UPDATA</button>
          </div>
        </div>
    `;
    document.getElementById("parent").innerHTML = result;
  });
}

// sort low to high
function sortLowToHigh() {
  fetch(`http://localhost:3002/masai?_sort=score`)
    .then((res) => res.json())
    .then((result) => {
      ShowOnUI(result);
    })
    .catch((er) => console.log(er));
}
function sortHighToLow() {
  fetch(`http://localhost:3002/masai?_sort=score&_order=desc`)
    .then((res) => res.json())
    .then((result) => {
      ShowOnUI(result);
    })
    .catch((er) => console.log(er));
}

// filter by greater 5
function filterByScoreGreater5(){
    fetch(`${URL}?score >= 5`)
}