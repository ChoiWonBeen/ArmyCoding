let HTMLEditor = document.getElementById("html-editor");
let JSEditor = document.getElementById("js-editor");
let CSSEditor = document.getElementById("css-editor");
let HTMLBtn = document.getElementById("btn__html");
let JSBtn = document.getElementById("btn__js");
let CSSBtn = document.getElementById("btn__css");
let CHANGEBtn = document.getElementById("btn__change");

HTMLEditor.innerHTML = localStorage.getItem("htmlCode");
JSEditor.innerHTML = localStorage.getItem("jsCode");
CSSEditor.innerHTML = localStorage.getItem("cssCode");

let editors = [HTMLEditor, JSEditor, CSSEditor];
let btns = [HTMLBtn, JSBtn, CSSBtn];
let typeColors = ["red", "#eabf01", "blue"];

let fullFlag = false;

showCode();
changeType(0);

let wrapperList = {
  "{": "}",
  "(": ")",
  "[": "]",
  '"': '"',
  "'": "'",
  "`": "`",
  "<": ">",
};

editors.map((editor) => {
  editor.addEventListener("keydown", function (e) {   
    if(e.key == "Tab") {
      e.preventDefault();
      let start = Math.min(window.getSelection().anchorOffset, window.getSelection().extentOffset);
      let end = Math.max(window.getSelection().anchorOffset, window.getSelection().extentOffset);
      let node = window.getSelection().baseNode;
      
      if(!node.data){
        let text = document.createTextNode("  ");
        node.appendChild(text);
        if(node.childNodes.length !== 1) node.removeChild(node.childNodes[0]);
        let range = window.getSelection().getRangeAt(0);
        range.setStart(text, 2);
      }
      else { 
        let front = node.data.slice(0, start);
        let back = node.data.slice(end, node.length);
        node.data = front + "  " + back;
      
        let range = window.getSelection().getRangeAt(0);
        range.setStart(range.startContainer, start + 2);
      }
    }
    
    for(let wrapper in wrapperList){
      if(e.key == wrapper){
        let start = Math.min(window.getSelection().anchorOffset, window.getSelection().extentOffset);
        let end = Math.max(window.getSelection().anchorOffset, window.getSelection().extentOffset);
        let node = window.getSelection().baseNode;
        if(!node.data){
          console.log(window.getSelection());
          e.preventDefault();
          let text = document.createTextNode(`${wrapper + wrapperList[wrapper]}`);
          node.appendChild(text);
          if(node.childNodes.length !== 1) node.removeChild(node.childNodes[0]);
          let range = window.getSelection().getRangeAt(0);
          range.setStart(text, 1);
        }
        else {
          let nextChar = node.data.slice(start, start + 1);

          if(nextChar != wrapperList[wrapper]) {
            let front = node.data.slice(0, start);
            let back = node.data.slice(end, node.length);
            node.data = front + wrapperList[wrapper] + back;
            let range = window.getSelection().getRangeAt(0);
            range.setStart(range.startContainer, start);
          }
        }
      }
    }
    
    if(e.key == "Backspace" && window.getSelection().anchorOffset == window.getSelection().extentOffset){
      let start = window.getSelection().anchorOffset;
      let node = window.getSelection().baseNode;
      let prevChar = node.data.slice(start - 1, start);
      let nextChar = node.data.slice(start, start + 1);

      for(let wrapper in wrapperList){
        if(prevChar == wrapper && nextChar == wrapperList[wrapper]){
          let front = node.data.slice(0, start);
          let back = node.data.slice(start + 1, node.length);
          node.data = front + back;          
          let range = window.getSelection().getRangeAt(0);
          range.setStart(range.startContainer, start);
        }
      }
    }
    
    if(e.key == "Enter"){
      
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
  if(type !== 3){
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
  else {
    if(fullFlag){
      document.getElementById("container").style.display = "block";
      document.getElementById("container").style.height = "auto";
      document.getElementById("container").style.minHeight = "calc(100vh - 40px)";
      document.getElementById("editor-field").style.width = "100%";
      document.getElementById("display-field").style.width = "100%";
      document.getElementById("display-field").style.height = "100vh";
      fullFlag = false;
      CHANGEBtn.style.color = "5cb85c";
      CHANGEBtn.style.backgroundColor = "white";
    }
    else {
      document.getElementById("container").style.display = "flex";
      document.getElementById("container").style.height = "calc(100vh - 40px)";
      document.getElementById("editor-field").style.width = "calc(60% - 10px)";
      document.getElementById("display-field").style.width = "40%";
      document.getElementById("display-field").style.height = "auto";
      fullFlag = true;
      CHANGEBtn.style.color = "white";
      CHANGEBtn.style.backgroundColor = "5cb85c";
    }
  }
}

function saveCode() {
  localStorage.setItem("htmlCode", HTMLEditor.innerHTML);
  localStorage.setItem("jsCode", JSEditor.innerHTML);
  localStorage.setItem("cssCode", CSSEditor.innerHTML);
}

window.onbeforeunload = function() {
  saveCode();
}
