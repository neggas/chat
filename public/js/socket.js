window.onload = ()=>{
    socket.on("users",(users)=>{
        console.log(users);
    })
}