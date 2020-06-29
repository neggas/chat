window.onload = ()=>{
    const activeItems = document.querySelectorAll(".contacts .d-flex");
   
    activeItems.forEach((item)=>{
        item.addEventListener("click",(event)=>{
           const activeDiv = item.parentElement;
           document.querySelector('.contacts .active').classList.remove('active');
           activeDiv.classList.add('active');
          
        })
    })
}