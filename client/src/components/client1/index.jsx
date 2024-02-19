const Client1 = () => {
    //create ws connection
    const socket = new WebSocket('ws://localhost:5000');
    
    //connection opened
    socket.addEventListener('open', function(event)
    {
      console.log('( Client 1 )Connection to ws server');
    });
  
    socket.addEventListener('message',function(event){console.log('( Client 1 )Message from server',event.data);});
  
    function sendMessage(){
      socket.send('Hello~ From Client 1');
    }
  
    return (
      <div>
        <button onClick={sendMessage}>send message from client 1</button>
      </div>
    )

    } 

     export default Client1