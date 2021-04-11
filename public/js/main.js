let lists = document.querySelectorAll("li");
let isActive = [];

for(let x = 0; x < lists.length; x++) {
    lists[x].addEventListener("click", function(){
        lists[x].classList.toggle("active");
        lists[x].classList.toggle("underline");

        let request = new XMLHttpRequest();
        request.open("post","/active",true);
        request.send(JSON.stringify({x:x}));
    });
}