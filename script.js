let myLinkr = []
const inputEL = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
//set so the links can remin rendered on the page after refresh
const linkrFromLocalStorage = JSON.parse( localStorage.getItem("myLinkr") )
const tabBtn = document.getElementById("tab-btn")

if (linkrFromLocalStorage) {
    myLinkr = linkrFromLocalStorage
    render(myLinkr)
}



tabBtn.addEventListener("click", function() {
    //Grab the url of the currnet tab
    //chrome.tabs.query({active: true, currentWindow: true}, function(tabs)) {

    //}

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLinkr.push(tabBtn[0].url)
        localStorage.setItem("myLinkr", JSON.stringify(myLinkr))
        render(myLinkr)
    })
    
})



function render(linkr) {
    //1. create a variable, listItems, to hold all the HTML for the list items
    //assign it to an empty string to begin with
    let listItems = ""
    for (i = 0; i < myLinkr.length; i++){
        //make the link open in new tabs by wrapping in an anchor tag <a> the target black attribute opens a new tab when the link is clicked
        //2. add the item to the listItems variable instead to the ulEl.innerHTML like above
        //listItems += "<li><a target='_blank' href = '" + myLinkr[i] + "'>" + myLinkr[i] + "</a> </li>"
        //using template strings to make the code above easir to read buy using backticks ``
        listItems += `
            <li>
                <a target='_blank' href ='${linkr[i]}'>
                    ${linkr[i]}
                </a>
            </li>`
}
//3. render the listItems inside the unordered list using .innerHTML
ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    myLinkr = []
    render(myLinkr)
})


/**   function saveBtn() {
    console.log("Button Clicked from onclick attribute")
}*/



inputBtn.addEventListener("click", function() {
    myLinkr.push(inputEL.value)
    //clear out the input field after saving
    inputEL.value = ""
    //set items in localStorage
    localStorage.setItem("myLinkr", JSON.stringify(myLinkr))
    render(myLinkr)
})  




//ulEl.innerHTML += "<li>" + myLinkr[i] + "</li>"
//lets try a different method:
//use createElement() and append() instead of innerHTML
//create element
//set text content
//append to ul
//const li = document.createElement("li")
//li.textContent = myLinkr[i]
//ulEl.append(li)

//===localStorage===
//localStorage only take in string so storing arrays in the localStorage can be found above
//localStorage.setItem("myLinkr", "www.examplelinkr.com")
//let link = localStorage.getItem("myLinkr")
//console.log(link)
//localStorage.clear()

