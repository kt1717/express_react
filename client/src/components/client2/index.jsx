const Client2 = () => {
    //create ws connection
    const socket = new WebSocket('ws://localhost:5000');
    
    //connection opened
    socket.addEventListener('open', function(event)
    {
      console.log('( Client 2 )Connection to ws server');
    });
  
    socket.addEventListener('message',function(event){console.log('( Client 2 )Message from server',event.data);});
  
    function sendMessage(){
      socket.send('Mamimo~ From Client 2');
    }
  
    return (
      <div>
        <button onClick={sendMessage}>send message from client 2</button>
      </div>
    )

    } 
    
     export default Client2