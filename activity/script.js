let iconContainer = document.querySelector(".icon_container");
let sheetList = document.querySelector(".sheet_list");
let firstSheet = document.querySelector(".sheet");
let allCells = document.querySelectorAll(".grid .cell");
let addressBox = document.querySelector(".address_box");
let leftAlignment = document.querySelector(".left_alignment_button");
let rightAlignment = document.querySelector(".right_alignment_button");
let centerAlignment = document.querySelector(".center_alignment_button");
let fontButton = document.querySelector(".font_size");
let fontFamilyButton = document.querySelector(".font_family");
let boldBtn = document.querySelector(".bold");
let underlineBtn = document.querySelector(".underline");
let italicBtn = document.querySelector(".italic");
let textColorContainerBtn = document.querySelector(".text_color");
let backgroundColorContainerBtn = document.querySelector(".bg_color");
let allAlignmentButtons = document.querySelectorAll(".alignment_container>*");
let formulaBox = document.querySelector(".formula_box");
let gridContainer=document.querySelector(".grid_container");
let top_Row=document.querySelector(".top_row");
let leftCol=document.querySelector(".left_column");
let topLeftBlock=document.querySelector(".top_left_block");
let sheetDB = workSheet[0];


// ******************************* ADD SHEETS ************************************************************
iconContainer.addEventListener("click", addSheets);

function addSheets() {
    let newSheet = document.createElement("div");
    let sheetArr = document.querySelectorAll(".sheet");
    let lastSheet = sheetArr[sheetArr.length - 1];
    let lastIdx = lastSheet.getAttribute("sheet_idx");
    lastIdx = Number(lastIdx);
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheet_idx", `${lastIdx+1}`);
    newSheet.innerText = `Sheet ${lastIdx+2}`;
    sheetList.appendChild(newSheet);

    sheetArr = document.querySelectorAll(".sheet");
    makeLastSheetActive(sheetArr);

    for (let i = 0; i < sheetArr.length; i++) {
        sheetArr[i].addEventListener("click", makeSheetActiveOnClick);
    }


    // Append new sheet in worksheet array 
    initCurrentSheetDatabase();
    sheetDB = workSheet[lastIdx + 1];

    // All Cell Text Empty
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].innerText = "";
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "16px";
        allCells[i].style.textAlign = "left";
        allCells[i].style.color = "black";
        allCells[i].style.backgroundColor = "#FFFFFF";
        allCells[i].innerText = "";
    }


}

// ******************************* MAKE SHEETS ACTIVE *******************************************************

function makeLastSheetActive(sheetArr) {
    for (let i = 0; i < sheetArr.length; i++) {
        sheetArr[i].classList.remove("active_sheet");
    }

    sheetArr[sheetArr.length - 1].classList.add("active_sheet");
}

function makeSheetActiveOnClick(e) {
    let currentSheet = e.currentTarget;
    let sheetArr = document.querySelectorAll(".sheet");
    for (let i = 0; i < sheetArr.length; i++) {
        sheetArr[i].classList.remove("active_sheet");
    }

    currentSheet.classList.add("active_sheet");

    let sheetIdx = currentSheet.getAttribute("sheet_idx");
    sheetDB = workSheet[sheetIdx];

    setUI(sheetDB);
}

// ********************************* Show Address In Address Box On Clicking A Cell ******************************
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("click", handleCell);
     // Change height of top row bloc acc to cell
    
     allCells[i].addEventListener("keydown", function (e) {
        let obj = allCells[i].getBoundingClientRect();
        let height = obj.height;
        let address = addressBox.value;
        let { rid, cid } = convertIntoIndexes(address);
        let leftCol = document.querySelectorAll(".left_column .block")[rid];
        leftCol.style.height = height + "px";
    });
}

function handleCell(e) {
    let cell = e.currentTarget;
    let rid = Number(cell.getAttribute("rid"));
    let cid = Number(cell.getAttribute("cid"));

    let rowAddress = rid + 1;
    let columnAddress = String.fromCharCode(cid + 65);

    let cellAddress = columnAddress + rowAddress;
    addressBox.value = cellAddress;

    let cellObject = sheetDB[rid][cid];
    // console.log(cellObject);

    //Make formula box empty if not present in UI
    if(cellObject.formula!=""){
        formulaBox.value=cellObject.formula;
    }
    else{
        formulaBox.value="";
    }

    // BOLD
    if (cellObject.bold == true) {
        boldBtn.classList.add("active_button");
    } else {
        boldBtn.classList.remove("active_button");
    }

    // ITALIC
    if (cellObject.italic == true) {
        italicBtn.classList.add("active_button");
    } else {
        italicBtn.classList.remove("active_button");
    }

    // UNDERLINE
    if (cellObject.underline == true) {
        underlineBtn.classList.add("active_button");
    } else {
        underlineBtn.classList.remove("active_button");
    }

    // ALIGNMENT
    for (let i = 0; i < allAlignmentButtons.length; i++) {
        allAlignmentButtons[i].classList.remove("active_button");
    }

    if (cellObject.halign == "left") {
        leftAlignment.classList.add("active_button");
    } else if (cellObject.halign == "right") {
        rightAlignment.classList.add("active_button");
    } else if (cellObject.halign == "center") {
        centerAlignment.classList.add("active_button");
    }

    // Font Family
    if (cellObject.fontFamily == "Arial") {
        fontFamilyButton.value = "Arial";
    } else if (cellObject.fontFamily == "Cambria") {
        fontFamilyButton.value = "Cambria";
    } else if (cellObject.fontFamily == "Georgia") {
        fontFamilyButton.value = "Georgia";
    } else if (cellObject.fontFamily == "Monospace") {
        fontFamilyButton.value = "Monospace";
    } else if (cellObject.fontFamily == "Sans-Serif") {
        fontFamilyButton.value = "Sans-Serif";
    } else if (cellObject.fontFamily == "Fantasy") {
        fontFamilyButton.value = "Fantasy";
    }

    //Font Size
    if (cellObject.fontSize == "10") {
        fontButton.value = "10";
    } else if (cellObject.fontSize == "12") {
        fontButton.value = "12";
    } else if (cellObject.fontSize == "16") {
        fontButton.value = "16";
    } else if (cellObject.fontSize == "20") {
        fontButton.value = "20";
    } else if (cellObject.fontSize == "32") {
        fontButton.value = "32";
    } else if (cellObject.fontSize == "64") {
        fontButton.value = "64";
    }

    // TextColor
    textColorContainerBtn.value = cellObject.textColor;

    // BackGround Color
    backgroundColorContainerBtn.value = cellObject.bgColor;



}

gridContainer.addEventListener("scroll", function () {
    // console.log(e);
    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    console.log(left);
    topLeftBlock.style.top = top + "px";
    top_Row.style.top = top + "px";
    leftCol.style.left = left + "px";
    topLeftBlock.style.left = left + "px";
})

allCells[0].click();

// ************************************* LEFT ALIGNMENT OF TEXT ********************************************
leftAlignment.addEventListener("click", function () {
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left";
    for (let i = 0; i < allAlignmentButtons.length; i++) {
        allAlignmentButtons[i].classList.remove("active_button");
    }
    leftAlignment.classList.add("active_button");
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "left";


});

// ************************************* RIGHT ALIGNMENT OF TEXT ********************************************

rightAlignment.addEventListener("click", function () {
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    for (let i = 0; i < allAlignmentButtons.length; i++) {
        allAlignmentButtons[i].classList.remove("active_button");
    }
    rightAlignment.classList.add("active_button");
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "right";
});

// ************************************* CENTER ALIGNMENT OF TEXT ********************************************

centerAlignment.addEventListener("click", function () {
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    for (let i = 0; i < allAlignmentButtons.length; i++) {
        allAlignmentButtons[i].classList.remove("active_button");
    }
    centerAlignment.classList.add("active_button");
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "center";
});

// ************************************* CONVERT ADDRESS INTO INDEXES ********************************************

function convertIntoIndexes(address) {
    // console.log("Address" + typeof address);
    let columnAddress = address.charCodeAt(0);
    let cid = columnAddress - 65;
    let rowAddress = address.slice(1);
    let rid = rowAddress - 1;
    return {
        cid,
        rid
    };
}

// ************************************ FONT SIZE TOGGLING ***************************************************
fontButton.addEventListener("change", function () {
    let fontSize = fontButton.value;
    // console.log(fontSize);
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize = fontSize + "px";
    let cellObject = sheetDB[rid][cid];
    cellObject.fontSize = fontSize;
});

// ********************************** FONT FAMILY TOGGLING ****************************************************
fontFamilyButton.addEventListener("change", function () {
    let fontFamily = fontFamilyButton.value;
    // console.log(fontFamily);
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = fontFamily;
    let cellObject = sheetDB[rid][cid];
    // console.log(cellObject);
    cellObject.fontFamily = fontFamily;
    // console.log(cellObject);
});

// ********************************** MAKES TEXT BOLD ************************************************ 
boldBtn.addEventListener("click", function () {
    let isActive = boldBtn.classList.contains("active_button");
    // console.log(isActive);
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == true) {
        cell.style.fontWeight = "normal";
        boldBtn.classList.remove("active_button");
        cellObject.bold = false;
    } else {
        cell.style.fontWeight = "bold";
        boldBtn.classList.add("active_button");
        cellObject.bold = true;
    }

});

// ********************************** MAKES TEXT ITALIC ************************************************ 

italicBtn.addEventListener("click", function () {
    let isActive = italicBtn.classList.contains("active_button");
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == true) {
        cell.style.fontStyle = "normal";
        italicBtn.classList.remove("active_button");
        cellObject.italic = false;
    } else {
        cell.style.fontStyle = "italic";
        italicBtn.classList.add("active_button");
        cellObject.italic = true;
    }

});

// ********************************** MAKES TEXT UNDERLINE ************************************************ 

underlineBtn.addEventListener("click", function () {
    let isActive = underlineBtn.classList.contains("active_button");
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == true) {
        cell.style.textDecoration = "none";
        underlineBtn.classList.remove("active_button");
        cellObject.underline = false;
    } else {
        cell.style.textDecoration = "underline";
        underlineBtn.classList.add("active_button");
        cellObject.underline = true;
    }

});
// ********************************** ADDS COLOR TO TEXT ************************************************ 

textColorContainerBtn.addEventListener("change", function () {
    let color = textColorContainerBtn.value;
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.color = color;
    let cellObject = sheetDB[rid][cid];
    cellObject.textColor = color;

});

// ********************************** ADDS BACKGROUND COLOR TO TEXT ***************************************** 

backgroundColorContainerBtn.addEventListener("change", function () {
    let bgcolor = backgroundColorContainerBtn.value;
    let address = addressBox.value;
    let {
        rid,
        cid
    } = convertIntoIndexes(address);
    // console.log(rid, cid);
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor = bgcolor;
    let cellObject = sheetDB[rid][cid];
    cellObject.bgColor = bgcolor;

})


// VALUE

for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function () {
        let address = addressBox.value;
        let {
            rid,
            cid
        } = convertIntoIndexes(address);
        // console.log(rid, cid);
        let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
        let cellObject = sheetDB[rid][cid];
        cellObject.value = cell.innerText;

        if(cellObject.value==cell.innerText){
            return;
        }
        //It makes formula bar empty if formula is present and you try to change the value
        if(cellObject.formula!=""){ 
            removeFormula(cellObject,address);
        }
        changeChildrens(cellObject);
    })

}



function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            let {
                bold,
                italic,
                underline,
                fontFamily,
                fontSize,
                textColor,
                bgColor,
                halign,
                value
            } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.style.fontStyle = italic == true ? "italic" : "normal";
            cell.style.textDecoration = underline == true ? "underline" : "none";
            cell.style.fontFamily = fontFamily;
            cell.style.fontSize = fontSize + "px";
            cell.style.color = textColor;
            cell.style.backgroundColor = bgColor;
            cell.style.textAlign = halign;
            cell.innerText = value;
        }

    }
}





// **************************************** FORMULA CODE *********************************************
formulaBox.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaBox.value != "") {
        // Get Formula
        let newFormula = formulaBox.value;

        let address = addressBox.value;
        let {
            rid,
            cid
        } = convertIntoIndexes(address);
        let cellObject=sheetDB[rid][cid];
        let previousFormula=cellObject.formula;

        if(previousFormula==newFormula){
            return;
        }

        if(previousFormula!="" && previousFormula!=newFormula){
            removeFormula(cellObject,address);
        }


        //Evaluate Formula
        let formulaValue = evaluateFormula(newFormula);
        // Set value
        setUIByFormula(formulaValue,rid,cid);

        // Set Formula in database
        setFormula(newFormula, formulaValue, rid, cid,address);
    }
});


function evaluateFormula(formula) {
    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firtCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firtCharOfToken >= 65 && firtCharOfToken <= 90) {
            let {
                rid,
                cid
            } = convertIntoIndexes(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
            let {
                value
            } = cellObject;
            formula = formula.replace(formulaTokens[i], value);
        }
    }

    let eqSol = eval(formula);
    // alert(eqSol);
    return eqSol;
}

function setUIByFormula(value,rid,cid) {
    document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`).innerText=value;

}

function setFormula(formula,value,rid,cid,address){
    let cellObject = sheetDB[rid][cid]; 
    cellObject.value = value;
    cellObject.formula = formula;

    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firtCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firtCharOfToken >= 65 && firtCharOfToken <= 90) {
            let parentRID_CID = convertIntoIndexes(formulaTokens[i]);
            let parentObject = sheetDB[parentRID_CID.rid][parentRID_CID.cid];

            parentObject.childrens.push(address);
        }
    }

}   


function changeChildrens(cellObject){
    let childrenArr=cellObject.childrens;
    for(let i=0;i<childrenArr.length;i++){
        let childRID_CID = convertIntoIndexes(childrenArr[i]);
        let childObject=sheetDB[childRID_CID.rid][childRID_CID.cid];
         let formulaPresent=childObject.formula;
         let updatedValue=evaluateFormula(formulaPresent);
         setUIByFormula(updatedValue,childRID_CID.rid,childRID_CID.cid);
         childObject.value=updatedValue;
         changeChildrens(childObject);
    }
}

function removeFormula(cellObject,address){
    let formula = cellObject.formula;

    let formulaTokens = formula.split(" ");
    for (let i = 0; i < formulaTokens.length; i++) {
        let firtCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firtCharOfToken >= 65 && firtCharOfToken <= 90) {
            let parentRID_CID = convertIntoIndexes(formulaTokens[i]);
            let parentObject = sheetDB[parentRID_CID.rid][parentRID_CID.cid];

            let childrenArr=parentObject.childrens;
            let idx=childrenArr.indexOf(address);
            childrenArr.splice(idx,1);
        }
    }
    cellObject.formula="";

}