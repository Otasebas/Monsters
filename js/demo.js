console.log("hi");

const URL_PREFIX = "http://localhost:3000/";
let page = 1;
const getMonsters = (a) => {
    console.log("get monsters function"),
      fetch(URL_PREFIX + `monsters/?_limit=50&_page=${a}`)
        .then((b) => b.json())
        .then((b) => {
          document.querySelector("#monster-container").innerHTML = "";
          for (let c = 0; c < b.length; c++)
            console.log("monster", b[c]), createMonsterCard(b[c]);
        });
  },
  createMonsterCard = (a) => {
    let b = document.createElement("div"),
      c = document.createElement("h2"),
      d = document.createElement("h4"),
      e = document.createElement("p");
    (c.innerHTML = `${a.name}`),
      (d.innerHTML = `Age: ${a.age}`),
      (e.innerHTML = `Bio: ${a.description}`),
      b.appendChild(c),
      b.appendChild(d),
      b.appendChild(e),
      document.querySelector("#monster-container").appendChild(b);
  },
  createMonsterForm = () => {
    const a = document.createElement("form"),
      b = document.createElement("input"),
      c = document.createElement("input"),
      d = document.createElement("input"),
      e = document.createElement("button");
    (a.id = "monster-form"),
      (b.id = "name"),
      (c.id = "age"),
      (d.id = "description"),
      (b.placeholder = "name..."),
      (c.placeholder = "age..."),
      (d.placeholder = "description..."),
      (e.innerHTML = "Create"),
      a.appendChild(b),
      a.appendChild(c),
      a.appendChild(d),
      a.appendChild(e),
      document.getElementById("create-monster").appendChild(a),
      addSubmitEventListener();
  },
  addSubmitEventListener = () => {
    document.querySelector("#monster-form").addEventListener("submit", (a) => {
      a.preventDefault(),
        console.log("submitted", getFormData()),
        postNewMonster(getFormData()),
        clearForm();
    });
  },
  getFormData = () => {
    let a = document.querySelector("#name"),
      b = document.querySelector("#age"),
      c = document.querySelector("#description");
    return { name: a.value, age: parseFloat(b.value), description: c.value };
  },
  postNewMonster = (a) => {
    let b = URL_PREFIX + `monsters`,
      c = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(a),
      };
    fetch(b, c)
      .then((d) => d.json())
      .then((d) => console.log("new monster", d));
  },
  clearForm = () => {
    document.querySelector("#monster-form").reset();
  },
  addNavListeners = () => {
    let a = document.querySelector("#back"),
      b = document.querySelector("#forward");
    a.addEventListener("click", () => {
      pageDown();
    }),
      b.addEventListener("click", () => {
        pageUp();
      });
  },
  pageUp = () => {
    page++, getMonsters(page);
  },
  pageDown = () => {
    1 < page ? (page--, getMonsters(page)) : alert("Aint no monsters here");
  },
  init = () => {
    getMonsters(), createMonsterForm(), addNavListeners();
  };
document.addEventListener("DOMContentLoaded", init);
