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
        allCells[i].style.fontSize = "10px";
        allCells[i].style.textAlign = "left";
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
    })

}



function setUI(sheetDB){
    for(let i=0;i<sheetDB.length;i++){
        for(let j=0;j<sheetDB[i].length;j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            let{bold,italic,underline,fontFamily,fontSize,textColor,bgColor,halign,value}=sheetDB[i][j];
            cell.style.fontWeight=bold==true?"bold":"normal";
            cell.style.fontStyle=italic==true?"italic":"normal";
            cell.style.textDecoration=underline==true?"underline":"none";
            cell.style.fontFamily=fontFamily;
            cell.style.fontSize=fontSize;
            // cell.style.color=textColor;
            // cell.style.backgroundColor=bgColor;
            cell.style.textAlign=halign;
            cell.innerText=value;
        }

    }
}