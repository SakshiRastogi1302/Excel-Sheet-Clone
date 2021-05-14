let topRow=document.querySelector(".top_row");
let leftColumn=document.querySelector(".left_column");
let gridBox=document.querySelector(".grid");

// ******************************************* TOP ROW ******************************************************

let columns=26;
for(let i=0;i<columns;i++){
    let columnBox=document.createElement("div");
    columnBox.setAttribute("class","top_row_cell");
    columnBox.innerText=`${String.fromCharCode(65+i)}`;
    topRow.appendChild(columnBox);
}

// ***************************************** LEFT COLUMN *****************************************************

let rows=100;
for(let i=0;i<rows;i++){
    let rowBox=document.createElement("div");
    rowBox.setAttribute("class","block");
    rowBox.innerText=`${i+1}`;
    leftColumn.appendChild(rowBox);
}

// **************************************** GRID BOX *********************************************************

for(let i=0;i<rows;i++){
    let row=document.createElement("div");
    row.setAttribute("class","row");
    for(let j=0;j<columns;j++){
        let col=document.createElement("div");
        col.setAttribute("class","cell");
        col.setAttribute("rid",`${i}`);
        col.setAttribute("cid",`${j}`);
        col.setAttribute("contenteditable","true");
        // col.innerText=`${String.fromCharCode(65+j)} ${i+1}`;
        row.append(col);
    }
    gridBox.appendChild(row);
}