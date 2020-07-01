window.onload = ()=>{
    let  search = document.querySelector('.input-group .search');
    let  userInfos = document.querySelectorAll('.ami .user_info');
    const input = document.querySelector('.input-group .type_msg');
    const send_btn = document.querySelector('.input-group .send_btn');

    // les variables responsables du tchat
    let receiver;
    let sender;
    let message;
    //selection dynamique des liste de chat
    const activeItems = document.querySelectorAll(".contacts .d-flex");
    const links = document.querySelectorAll('.user_link');
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

    //communication par socket pour recuperer la liste des utisateur
    //et faire la recherche
    socket.on("users",(users)=>{
        search.addEventListener('input',(event)=>{

            //recherches des utilisateurs
            activeItems.forEach((item)=>{
                if(event.target.value !== ''){
                    if(!(item.children[1].children[0].innerHTML.includes(event.target.value))){
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

    //changement du room l'ors du clique

    const updateUser = document.querySelector('.msg_head .d-flex').children;
    const divImg = updateUser[0];
    const divInfo = updateUser[1];

    socket.on('selectedUser',(user,send)=>{
        divInfo.children[0].innerHTML = `Chat with ${user.pseudo}`;
        divImg.children[0].src=`${user.picture}`;

        //on definis celui qui recois les message a meme temps;
        receiver = user;
        sender = send;
    })

    //changement de room
    links.forEach((link)=>{
        link.addEventListener('click',(event)=>{
            event.preventDefault();
            let userId = link.href.split("//").join('').split('/')[1];
            socket.emit("user",userId); 
       })
    })

    //gestion des envois des message
    send_btn.addEventListener('click',(event)=>{
       if(input.value !== ''){
           let messages = {receiver,sender:sender,message:input.value};
           socket.emit('new_message',messages);
       }
    })   

    socket.on('new_msg',(data)=>{
        console.log(data);
    })

}