window.onload = ()=>{
    let  search = document.querySelector('.input-group .search');
    let  userInfos = document.querySelectorAll('.ami .user_info');

    //selection dynamique des liste de chat
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

    //communication par socket
    socket.on("users",(users)=>{

        search.addEventListener('input',(event)=>{
            activeItems.forEach((item)=>{

                if(event.target.value !== ''){
                    if(!(item.children[1].children[0].innerHTML.includes(event.target.value))){
                        console.log("l'element est cacher");
                        item.parentElement.style.display = 'none';
                    }else{
                        item.parentElement.style.display = 'block';
                    }
                }else{
                    item.parentElement.style.display = 'block';
                }
            })
        })

    })
}