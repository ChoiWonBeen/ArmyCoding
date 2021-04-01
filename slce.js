let HTMLEditor = document.getElementById("html-editor");
let JSEditor = document.getElementById("js-editor");
let CSSEditor = document.getElementById("css-editor");
let HTMLBtn = document.getElementById("btn__html");
let JSBtn = document.getElementById("btn__js");
let CSSBtn = document.getElementById("btn__css");

HTMLEditor.innerHTML = localStorage.getItem("htmlCode");
JSEditor.innerHTML = localStorage.getItem("jsCode");
CSSEditor.innerHTML = localStorage.getItem("cssCode");

let editors = [HTMLEditor, JSEditor, CSSEditor];
let btns = [HTMLBtn, JSBtn, CSSBtn];
let typeColors = ["red", "#eabf01", "blue"];

showCode();
changeType(0);

editors.map((editor) => {
  editor.addEventListener("keydown", function (e) {
    if(e.key =="Tab") {
      e.preventDefault();
      let start = this.selectionStart;
      let end = this.selectionEnd;
      this.innerHTML = this.innerHTML.substring(0, start) + "\t" + this.innerHTML.substring(end);
      this.selectionStart = this.selectionEnd = start + 1;
    }
  });
  
  editor.addEventListener('paste', (event) => {
    event.preventDefault();
    document.execCommand('inserttext', false, event.clipboardData.getData('text/plain'));
  });

})

function showCode(){
  let htmlCode = HTMLEditor.innerText;
  let jsCode = "<script>" + JSEditor.innerText + "</script>";
  let cssCode = "<style>" + CSSEditor.innerText + "</style>";

  let frame = document.getElementById("preview-display").contentWindow.document;
  frame.open();
  frame.write(htmlCode + jsCode + cssCode);
  frame.close();
}

function changeType(type){
  editors[type].style.display = "block";
  editors[(type + 1) % 3].style.display = "none";
  editors[(type + 2) % 3].style.display = "none";
  
  btns.map((btn, idx) => {
    if(idx == type){
      btn.style.color = "white";
      btn.style.backgroundColor = typeColors[idx];
    }
    else {
      btn.style.color = typeColors[idx];
      btn.style.backgroundColor = "white";  
    }
  })
}

function saveCode() {
  localStorage.setItem("htmlCode", HTMLEditor.innerHTML);
  localStorage.setItem("jsCode", JSEditor.innerHTML);
  localStorage.setItem("cssCode", CSSEditor.innerHTML);
}

window.onbeforeunload = function() {
  saveCode();
}
