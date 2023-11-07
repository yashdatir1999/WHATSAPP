const more = document.querySelector(".more")
const moreoption = document.querySelector(".more-options")
var morecounter = 1
more.addEventListener("click" , function(){
    if(morecounter === 1){
        moreoption.style.display="initial"
        morecounter = 0
    }else{
        moreoption.style.display="none"
        morecounter = 1
    }
})
