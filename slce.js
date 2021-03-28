let HTMLEditor = document.getElementById("html-editor");
let JSEditor = document.getElementById("js-editor")
let CSSEditor = document.getElementById("css-editor")

HTMLEditor.value = localStorage.getItem("htmlCode");
JSEditor.value = localStorage.getItem("jsCode");
CSSEditor.value = localStorage.getItem("cssCode");
showCode(0);

function showCode(){
  let htmlCode = HTMLEditor.value;
  let jsCode = "<script>" + JSEditor.value + "</script>";
  let cssCode = "<style>" + CSSEditor.value + "</style>";

  let frame = document.getElementById("preview-display").contentWindow.document;
  frame.open();
  frame.write(htmlCode + jsCode + cssCode);
  frame.close();
}

let types = ["HTML", "JS", "CSS"];
let editors = [HTMLEditor, JSEditor, CSSEditor];

function changeType(type){
  editors[type].style.display = "block";
  editors[(type + 1) % 3].style.display = "none";
  editors[(type + 2) % 3].style.display = "none";
  
  if(types[type] == "HTML"){
    document.getElementById("btn__html").style.color = "white"
    document.getElementById("btn__html").style.backgroundColor = "red"
    
    document.getElementById("btn__js").style.color = "#eabf01"
    document.getElementById("btn__js").style.backgroundColor = "white"
    
    document.getElementById("btn__css").style.color = "blue"
    document.getElementById("btn__css").style.backgroundColor = "white"
  }
  
  if(types[type] == "JS"){
    document.getElementById("btn__html").style.color = "red"
    document.getElementById("btn__html").style.backgroundColor = "white"
    
    document.getElementById("btn__js").style.color = "white"
    document.getElementById("btn__js").style.backgroundColor = "#eabf01"
    
    document.getElementById("btn__css").style.color = "blue"
    document.getElementById("btn__css").style.backgroundColor = "white"
  }
  
  if(types[type] == "CSS"){
    document.getElementById("btn__html").style.color = "red"
    document.getElementById("btn__html").style.backgroundColor = "white"
    
    document.getElementById("btn__js").style.color = "#eabf01"
    document.getElementById("btn__js").style.backgroundColor = "white"
    
    document.getElementById("btn__css").style.color = "white"
    document.getElementById("btn__css").style.backgroundColor = "blue"
  }
}

setInterval(() => {
  localStorage.setItem("htmlCode", HTMLEditor.value);
  localStorage.setItem("jsCode", JSEditor.value);
  localStorage.setItem("cssCode", CSSEditor.value);
}, 30000)

window.beforeunload = function() {
  return false;
}
