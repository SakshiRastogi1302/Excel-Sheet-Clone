let iconContainer=document.querySelector(".icon_container");
let sheetList=document.querySelector(".sheet_list");
let firstSheet=document.querySelector(".sheet");

iconContainer.addEventListener("click",addSheets);

function addSheets(){
    let newSheet=document.createElement("div");
    let sheetArr=document.querySelectorAll(".sheet");
    let lastSheet=sheetArr[sheetArr.length-1];
    let lastIdx=lastSheet.getAttribute("sheet_idx");
    lastIdx=Number(lastIdx);
    newSheet.setAttribute("class","sheet");
    newSheet.setAttribute("sheet_idx",`${lastIdx+1}`);
    newSheet.innerText=`Sheet ${lastIdx+2}`;
    sheetList.appendChild(newSheet);

    sheetArr=document.querySelectorAll(".sheet");
    makeLastSheetActive(sheetArr);

    for(let i=0;i<sheetArr.length;i++){
        sheetArr[i].addEventListener("click",makeSheetActiveOnClick);
    }

}

function makeLastSheetActive(sheetArr){
    for(let i=0;i<sheetArr.length;i++){
        sheetArr[i].classList.remove("active_sheet");
    }

    sheetArr[sheetArr.length-1].classList.add("active_sheet");
}

function makeSheetActiveOnClick(e){
    let currentSheet=e.currentTarget;
    let sheetArr=document.querySelectorAll(".sheet");
    for(let i=0;i<sheetArr.length;i++){
        sheetArr[i].classList.remove("active_sheet");
    }

    currentSheet.classList.add("active_sheet");
}