document.addEventListener("DOMContentLoaded", () => {
  const monsterContainer = document.getElementById("monster-container")
  const createMonsterDiv = document.getElementById("create-monster")

  const monsterForm = document.createElement('form')
  monsterForm.innerHTML = `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <label for="age">Age:</label>
    <input type="number" id="age" name="age">
    <label for="description">Description:</label>
    <input type="text-field" id="description" name="description">
    <input type="submit" value="Create Monster">
  `
  createMonsterDiv.appendChild(monsterForm)

  const addMonsterToDom = (monster) => {
    let monsterDiv = document.createElement("div")
    monsterDiv.className = "monster"
    monsterDiv.innerHTML = `
      <h3>Name: ${monster.name}</h3>
      <h5>Age: ${monster.age}</h5>
      <p>${monster.description}</p>
      <p>-----------------------</p>      
      `
    monsterContainer.appendChild(monsterDiv)
  };

  // const createButton = document.querySelector("input[type='submit']")
  // console.log(createButton)
  document.addEventListener("submit", (e) => {
    e.preventDefault()
    const form = e.target

    const formData = {
      name: form.name.value,
      age: parseInt(form.age.value),
      description: form.description.value
    }

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
      }
    )
    .then(resp => resp.json())
    .then(json => {
      addMonsterToDom(json)
    })
    
    form.reset()
  });
  
  fetch("http://localhost:3000/monsters/?_limit=50")
  .then(resp => resp.json())
  .then(json => {
    for(const monster of json){
      addMonsterToDom(monster) 
    };
  });
  
  const forwardButton = document.getElementById('forward')
  const backButton = document.getElementById('back')
  let pageCounter = 2

  document.addEventListener('click', (e) =>{
    if (e.target === forwardButton){
      monsterContainer.innerHTML = "";
      fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
      .then(resp => resp.json())
      .then(json => {
        for(const monster of json){
          addMonsterToDom(monster) 
        };
      }); 
      ++pageCounter 
    } else if (e.target === backButton && pageCounter > 1){
        --pageCounter
        monsterContainer.innerHTML = "";
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageCounter}`)
        .then(resp => resp.json())
        .then(json => {
          for(const monster of json){
            addMonsterToDom(monster) 
          };
        }); 
      }
  });

}); 
