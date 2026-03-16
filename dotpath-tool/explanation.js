const exOpen = document.querySelector(".explanationOpen");
const exOpenP = document.querySelector(".explanationOpen p");

const exText = document.querySelector(".explanationText");

const explanationElement = document.querySelector('#explanation');


exOpen.addEventListener('click', () => {
    if (exText.id === ""){
        exText.id = "explanationTextActive";
        exOpenP.innerHTML = "↑";
        explanationElement.id = "explanationActive";
    } else {
        exText.id = "";
        exOpenP.innerHTML = "↓";
        explanationElement.id = "explanation";

    }
    
})
