function showCode(){
  let htmlCode = document.getElementById("html-editor").value;
  let jsCode = "<script>" + document.getElementById("js-editor").value + "</script>";
  let cssCode = "<style>" + document.getElementById("css-editor").value + "</style>";
  console.log("html: " + htmlCode + "\njs: " + jsCode + "\ncss: " + cssCode);
  
  let frame = document.getElementById("preview-display").contentWindow.document;
  frame.open();
  frame.write(htmlCode + jsCode + cssCode);
  frame.close();
}
