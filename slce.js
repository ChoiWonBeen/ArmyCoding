let HTMLEditor = document.getElementById("html-editor");
let JSEditor = document.getElementById("js-editor")
let CSSEditor = document.getElementById("css-editor")

HTMLEditor.innerText = localStorage.getItem("htmlCode");
JSEditor.innerText = localStorage.getItem("jsCode");
CSSEditor.innerText = localStorage.getItem("cssCode");
let types = ["HTML", "JS", "CSS"];
let editors = [HTMLEditor, JSEditor, CSSEditor];

showCode();
changeType(0);

function showCode(){
  let htmlCode = HTMLEditor.innerText.replaceAll("&nbsp", "");
  let jsCode = "<script>" + JSEditor.innerText.replaceAll("&nbsp", "") + "</script>";
  let cssCode = "<style>" + CSSEditor.innerText.replaceAll("&nbsp", "") + "</style>";

  let frame = document.getElementById("preview-display").contentWindow.document;
  frame.open();
  frame.write(htmlCode + jsCode + cssCode);
  frame.close();
}

document.querySelector('.editor').addEventListener('paste', (event) => {
  event.preventDefault();
  document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
});

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

function saveCode() {
  localStorage.setItem("htmlCode", HTMLEditor.innerText);
  localStorage.setItem("jsCode", JSEditor.innerText);
  localStorage.setItem("cssCode", CSSEditor.innerText);
}

window.onbeforeunload = function() {
  saveCode();
}
