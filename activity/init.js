let topRow=document.querySelector(".top_row");
let leftColumn=document.querySelector(".left_column");
let gridBox=document.querySelector(".grid");

let columns=26;
for(let i=0;i<columns;i++){
    let columnBox=document.createElement("div");
    columnBox.setAttribute("class","cell");
    columnBox.innerText=`${String.fromCharCode(65+i)}`;
    topRow.appendChild(columnBox);
}

let rows=100;
for(let i=0;i<rows;i++){
    let rowBox=document.createElement("div");
    rowBox.setAttribute("class","block");
    rowBox.innerText=`${i}`;
    leftColumn.appendChild(rowBox);
}

for(let i=0;i<rows;i++){
    let row=document.createElement("div");
    row.setAttribute("class","row");
    for(let j=0;j<columns;j++){
        let col=document.createElement("div");
        col.setAttribute("class","cell");
        col.innerText=`${String.fromCharCode(65+j)} ${i+1}`;
        row.append(col);
    }
    gridBox.appendChild(row);
}