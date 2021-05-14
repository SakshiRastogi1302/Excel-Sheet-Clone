let iconContainer=document.querySelector(".icon_container");
let sheetList=document.querySelector(".sheet_list");
let firstSheet=document.querySelector(".sheet");
let allCells=document.querySelectorAll(".grid .cell");
let addressBox=document.querySelector(".address_box");
let leftAlignment=document.querySelector(".left_alignment_button");
let rightAlignment=document.querySelector(".right_alignment_button");
let centerAlignment=document.querySelector(".center_alignment_button");
let fontButton=document.querySelector(".font_size");


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


for(let i=0;i<allCells.length;i++){
    allCells[0].click(); //On opening first cell should always be clicked
    allCells[i].addEventListener("click",handleCell);
}

function handleCell(e){
    let cell=e.currentTarget;
    let rid=Number(cell.getAttribute("rid"));
    let cid=Number(cell.getAttribute("cid"));

    let rowAddress=rid+1;
    let columnAddress=String.fromCharCode(cid+65);

    let cellAddress=columnAddress+rowAddress;
    addressBox.value=cellAddress;

}


leftAlignment.addEventListener("click",function(){
    let address=addressBox.value;
    let {rid,cid}= convertIntoIndexes(address);
    console.log(rid,cid);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="left";
});

rightAlignment.addEventListener("click",function(){
    let address=addressBox.value;
    let {rid,cid}= convertIntoIndexes(address);
    console.log(rid,cid);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="right";
});

centerAlignment.addEventListener("click",function(){
    let address=addressBox.value;
    let {rid,cid}= convertIntoIndexes(address);
    console.log(rid,cid);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="center";
});

function convertIntoIndexes(address){
    let columnAddress=address.charCodeAt(0);
    let cid=columnAddress-65;
    let rowAddress=address.slice(1);
    let rid=rowAddress-1;
    return {cid,rid};
}

fontButton.addEventListener("change",function(){
    let fontSize=fontButton.value;
    console.log(fontSize);
    let address=addressBox.value;
    let {rid,cid}= convertIntoIndexes(address);
    console.log(rid,cid);
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize=fontSize+"px";
});
