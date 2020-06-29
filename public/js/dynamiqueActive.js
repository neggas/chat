window.onload = ()=>{
    const activeItems = document.querySelectorAll(".contacts .d-flex");
    const el =  document.querySelector(".contacts");
    const current = el.firstChild.nextSibling;
    current.classList.add('active');
    
    activeItems.forEach((item)=>{
        item.addEventListener("click",(event)=>{
           const activeDiv = item.parentElement;
           document.querySelector('.contacts .active').classList.remove('active');
           activeDiv.classList.add('active');
          
        })
    })
}