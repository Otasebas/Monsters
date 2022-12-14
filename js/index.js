//main

//page limit
let max = 50
let min = 0

const container = document.getElementById('monster-container')

createMonsterForm()

fetch("http://localhost:3000/monsters")
.then(res=> res.json())
.then(monsters => loopMonster(monsters, max, min))  

//button
const btn = document.getElementById("forward")
btn.addEventListener("click",()=>{
    increaseLimit()
})

const btn2 = document.getElementById("back")
btn2.addEventListener("click",()=>{
    decreaseLimit()
})

//functions

function increaseLimit(){
    max += 50
    min += 50
    fetch("http://localhost:3000/monsters")
    .then(res=> res.json())
    .then(monsterArray => loopMonster(monsterArray, max, min)) 
}

function decreaseLimit(){
    max -= 50
    min -= 50
    fetch("http://localhost:3000/monsters")
    .then(res=> res.json())
    .then(monsterArray => loopMonster(monsterArray, max, min)) 
}

function loopMonster(array, most, least){
    removeMonster()
    for(let i = least; i < most; i++){
        addmonster(array[i])
    }
}

function removeMonster(){
    while(document.getElementById("monster-container").firstChild){
        const oldMonster = document.getElementById("monsters")
        oldMonster.remove()
    }
        
}

function addmonster(obj){

    const p = document.createElement("p")
    p.setAttribute("id", "monsters")

    const monsterName = document.createElement("h2")
    const monsterAge = document.createElement("h4")
    const description = document.createElement("p")

    monsterName.innerText = obj.name
    monsterAge.innerText = obj.age
    description.innerText = obj.description

    container.append(p)
    p.append(monsterName,monsterAge, description)

}

function createMonsterForm(){

    const a=document.createElement('form')
    const b=document.createElement('input')
    const c=document.createElement('input')
    const d=document.createElement('input')
    const e=document.createElement('button')

    a.id='monster-form'
    b.id='name'
    c.id='age'
    d.id='description'

    b.placeholder='name...'
    c.placeholder='age...'
    d.placeholder='description...'
    e.innerHTML='Create'
    
    a.appendChild(b)
    a.appendChild(c)
    a.appendChild(d)
    a.appendChild(e)
    document.getElementById('create-monster').appendChild(a)

    a.addEventListener("submit", (event)=> {
        event.preventDefault()
        post(b,c,d)
        event.target.reset()
    })
}

async function post(b,c,d){
    await fetch("http://localhost:3000/monsters",{
    method: "POST",
    headers: {
        "Content-Type":"application/json"
    },

    body:JSON.stringify({
        "name": b.value,
        "age": c.value,
        "description": d.value
    })
})
}
