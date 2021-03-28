let HTMLEditor = document.getElementById("html-editor");
let JSEditor = document.getElementById("js-editor")
let CSSEditor = document.getElementById("css-editor")

function showCode(){
  let htmlCode = HTMLEditor.value;
  let jsCode = "<script>" + JSEditor.value + "</script>";
  let cssCode = "<style>" + CSSEditor.value + "</style>";

  let frame = document.getElementById("preview-display").contentWindow.document;
  frame.open();
  frame.write(htmlCode + jsCode + cssCode);
  frame.close();
}

let type = {"HTML", "JS", "CSS"};
let active = "HTML";

function activeHTML(){
  HTMLEditor.style.display = "block"
  JSEditor.style.display = "none"
  CSSEditor.style.display = "none"
}

function activeJS(){
  HTMLEditor.style.display = "none"
  JSEditor.style.display = "block"
  CSSEditor.style.display = "none"
}

function activeCSS(){
  HTMLEditor.style.display = "none"
  JSEditor.style.display = "none"
  CSSEditor.style.display = "block"
}
