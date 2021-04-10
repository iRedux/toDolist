let lists = document.querySelectorAll("li");

for(let x = 0; x < lists.length; x++) {
    lists[x].addEventListener("click", function(){
        lists[x].classList.toggle("active");
        lists[x].classList.toggle("underline");
    });
}

