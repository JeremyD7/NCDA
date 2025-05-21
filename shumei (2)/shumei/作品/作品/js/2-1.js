function selectTab(thisContent,thisObj){
    thisObj.blur();
    var tab = document.getElementById("tabs").getElementsByTagName("li");
    var tablength = tab.length;
    for(i=0; i<tablength; i++)
    {
      tab[i].className = "";
    }
    thisObj.parentNode.className = "selectContent";
    for(i=0; j=document.getElementById("tabContent"+i); i++)
    {
      j.style.display = "none";
    }
    document.getElementById(thisContent).style.display = "block";	
  }