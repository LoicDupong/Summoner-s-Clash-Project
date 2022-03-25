const urlLoL = "https://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion/__name__.json"
const urlLolGeneral = "http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json"

const searchHTML = document.querySelector("#searchbar input")
const searchBtnHTML = document.getElementById("search-btn")
const champContainerHTML = document.getElementById("champ-container")
const champTilesHTML = document.getElementsByClassName("champion-tile")

const loadingImageContainerHTML = document.getElementById("loading-img")
const nameContainerHTML = document.getElementById("name")
const titleContainerHTML = document.getElementById("title")
const classContainerHTML = document.getElementById("class")

const attackContainerHTML = document.getElementById("attack")
const defenseContainerHTML = document.getElementById("defense")
const mrContainerHTML = document.getElementById("mr")
const asContainerHTML = document.getElementById("as")

// const attackImgHTML = document.getElementById("attackImg")
// const defenseImgHTML = document.getElementById("defImg")
// const mrImgHTML = document.getElementById("mrImg")
// const asImgHTML = document.getElementById("asImg")

const loreContainerHTML = document.getElementById("lore")

const passiveContainerHTML = document.getElementById("passive")
const spellQContainerHTML = document.getElementById("spellQ")
const spellWContainerHTML = document.getElementById("spellW")
const spellEContainerHTML = document.getElementById("spellE")
const spellRContainerHTML = document.getElementById("spellR")

const spellNameContainerHTML = document.getElementById("spell-name")
const spellDescriptionContainerHTML = document.getElementById("spell-description")

let previousChamp = "Aatrox"



const userNameHTML = document.getElementById("username")
const username = []



    searchHTML.addEventListener("keyup", (e) => {
        const name = searchHTML.value
        if (e.key === "Enter") {
            let champRemoveActive = document.getElementById(previousChamp)
            champRemoveActive.setAttribute("class", "champion-tile")
            let champActive = document.getElementById(name)
            fetch(urlLoL.replace("__name__", name))
                .then(Response => Response.json())
                .then(data => {
                    
                    // Loading-image
                    loadingImageContainerHTML.src = "img/img/loading/"+name+"_0.jpg"

                    // Name / Title / Class
                    nameContainerHTML.innerText = name
                    titleContainerHTML.innerText = data.data[name].title

                    classContainerHTML.innerText = data.data[name].tags 
                    

                    // Stats
                    const attackImgHTML = document.createElement("img")
                    attackImgHTML.setAttribute("src", "img/StatMods/StatModsAdaptiveForceIcon.png")
                    attackContainerHTML.appendChild(attackImgHTML)
                    attackContainerHTML.innerText = "Attack : " + data.data[name].stats.attackdamage
                    defenseContainerHTML.innerText = "Armor : " + data.data[name].stats.armor
                    mrContainerHTML.innerText = "Magic Resist : " + data.data[name].stats.spellblock
                    asContainerHTML.innerText = "Attack Speed : " + data.data[name].stats.attackspeed

                    // Lore
                    loreContainerHTML.innerText = data.data[name].lore

                    // Spells images
                    passiveContainerHTML.src = "img/passive/" + data.data[name].passive.image.full
                    spellQContainerHTML.src = "img/spell/" + data.data[name].spells[0].image.full
                    spellWContainerHTML.src = "img/spell/" + data.data[name].spells[1].image.full
                    spellEContainerHTML.src = "img/spell/" + data.data[name].spells[2].image.full
                    spellRContainerHTML.src = "img/spell/" + data.data[name].spells[3].image.full

                    // Spell Description
                    spellNameContainerHTML.innerText = data.data[name].passive.name
                    spellDescriptionContainerHTML.innerText =  data.data[name].passive.description
                    console.log(data.data[name])

                    champActive.classList.add("active")
                    currentChampTab = data.data[name].id
                    
                    previousChamp = currentChampTab

                })
        }
    }) 

const champsTab = []
let currentChampTab = ""

fetch(urlLolGeneral)
    .then(Response => Response.json())
    .then(data => {
        for (const element of Object.keys(data.data)){
            let champTilesHTML = document.createElement("div")
            champTilesHTML.classList.add("champion-tile")
            champTilesHTML.setAttribute("id", data.data[element].id)
            champTilesHTML.style.backgroundImage = "url"+"(img/champion/"+data.data[element].image.full+")"
            champContainerHTML.appendChild(champTilesHTML)
            champsTab.push(data.data[element].id)
            // console.log(data.data[element].id)
        }
        
        for (let i = 0; i < champsTab.length; i++){
            champTilesHTML[i].addEventListener("click", () => {
                
                let champRemoveActive = document.getElementById(previousChamp)
                champRemoveActive.setAttribute("class", "champion-tile")
                let champActive = document.getElementById(champsTab[i])
                console.log(champsTab[i])

                // let spellRemoveActive = document.querySelector("img.active")
                // // spellRemoveActive[0].classList.remove("active")
                // console.log(spellRemoveActive)

                fetch(urlLoL.replace("__name__", champsTab[i]))
                    .then(Response => Response.json())
                    .then(data => { 
                        // Loading-image
                        loadingImageContainerHTML.src = "img/img/loading/"+champsTab[i]+"_0.jpg"
    
                        // Name / Title / Class
                        nameContainerHTML.innerText = champsTab[i]
                        titleContainerHTML.innerText = data.data[champsTab[i]].title
    
                        classContainerHTML.innerText = data.data[champsTab[i]].tags 
                        
    
                        // Stats
                        const attackImgHTML = document.createElement("img")
                        attackImgHTML.setAttribute("src", "img/StatMods/StatModsAdaptiveForceIcon.png")
                        attackContainerHTML.appendChild(attackImgHTML)
                        attackContainerHTML.innerText = "Attack : " + data.data[champsTab[i]].stats.attackdamage
                        defenseContainerHTML.innerText = "Armor : " + data.data[champsTab[i]].stats.armor
                        mrContainerHTML.innerText = "Magic Resist : " + data.data[champsTab[i]].stats.spellblock
                        asContainerHTML.innerText = "Attack Speed : " + data.data[champsTab[i]].stats.attackspeed
    
                        // Lore
                        loreContainerHTML.innerText = data.data[champsTab[i]].lore
    
                        // Spells images
                        passiveContainerHTML.src = "img/passive/"+data.data[champsTab[i]].passive.image.full
                        spellQContainerHTML.src = "img/spell/"+data.data[champsTab[i]].spells[0].image.full
                        spellWContainerHTML.src = "img/spell/"+data.data[champsTab[i]].spells[1].image.full
                        spellEContainerHTML.src = "img/spell/"+data.data[champsTab[i]].spells[2].image.full
                        spellRContainerHTML.src = "img/spell/"+data.data[champsTab[i]].spells[3].image.full
    
                        // Spell Description
                        spellNameContainerHTML.innerText = "Passive : " +  data.data[champsTab[i]].passive.name
                        spellDescriptionContainerHTML.innerText = data.data[champsTab[i]].passive.description
                        
                        console.log(data.data[champsTab[i]])
                        champActive.classList.add("active")
                        currentChampTab = data.data[champsTab[i]].id
                        previousChamp = currentChampTab
                    })
    
            })

           
        }


        const spell = ["Passive : ", "Spell Q : ", "Spell W : ", "Spell E : ", "Spell R : "]
        const spellHTML = document.querySelectorAll(".spell img")
        

        for (let j = 0; j < spellHTML.length +1 ; j++){
            spellHTML[j].addEventListener("click", () => {
                
                let spellRemoveActive = document.getElementsByClassName("active")
                spellRemoveActive[0].classList.remove("active")
                
                console.log(spellRemoveActive[0], spellHTML[j])
                // spellRemoveActive.setAttribute("class", "spell")
                // console.log(spellHTML[j])
                // let spellRemoveActive = document.getElementById(previousSpell)
                // spellRemoveActive.setAttribute("class", "champion-tile")
                // let spellActive = document.querySelectorAll(".spell")
                // console.log(spellActive)

                fetch(urlLoL.replace("__name__", currentChampTab))
                    .then(Response => Response.json())
                    .then(data => {
                        if(j === 0){
                            spellNameContainerHTML.innerText = spell[j] +  data.data[currentChampTab].passive.name
                            spellDescriptionContainerHTML.innerText = data.data[currentChampTab].passive.description

                            spellHTML[j].classList.add("active")
                        } else {
                            spellNameContainerHTML.innerText =spell[j] + data.data[currentChampTab].spells[j -1].name
                            spellDescriptionContainerHTML.innerText = data.data[currentChampTab].spells[j-1].description

                            spellHTML[j].classList.add("active")
                            
                        }
                        // spellActive.classList.add("active")
                        // previousSpell = spellHTML[j]
                        // console.log(previousSpell)
                    })
                    
            })
            // if(spellHTML[i].id === "passive"){
                
            // }
        }
    })

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

    // Play Button 

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
const playButtonHTML = document.getElementById("play-btn")

playButtonHTML.addEventListener("click", () => {
    console.log(currentChampTab)
})







///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

    // Fighting system | Rift.html

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


