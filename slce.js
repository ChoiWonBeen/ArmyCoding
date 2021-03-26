function showCode(){
  let htmlCode = document.getElementById("html-editor").value;
  let jsCode = "<script>" + document.getElementById("js-editor").value + "</script>";
  let cssCode = "<style>" + document.getElementById("css-editor").value + "</style>";

  let frame = document.getElementById("preview-display").contentWindow.document;
  frame.open();
  frame.write(htmlCode + jsCode + cssCode);
  frame.close();
}

let type = {"HTML", "JS", "CSS"};
let active = "HTML";

function activeHTML(){
  
}
