//import React, { useState, useEffect } from "react";
// import Jane from "../../../public/jane.json";
import Jane from "../../jane.json";

const Client3 = () => {
  // const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   //connection opened
  //   // fetch("http://localhost:5000/api")  //error correction

  //   //  fetch("ws://localhost:5000/api")
  //     fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);

  //create ws connection
  //創建一個WebSocket連接到地址為 "ws://localhost:5000" 的伺服器。
  const socket = new WebSocket("ws://localhost:5000");

  //open
  //監聽WebSocket連接的打開事件，當連接成功建立時執行指定的函式，並在控制台中顯示一條訊息。
  socket.addEventListener("open", function (event) {
    console.log("( Client 3 )Connection to ws server");
  });

  //message
  //監聽WebSocket接收到訊息的事件，當接收到訊息時執行指定的函式，並在console中顯示收到的訊息。
  socket.addEventListener("message", function (event) {

    // if (event.data.endsWith(".gz")) {
    //   socket.send("gunzip");
    //   console.log("delivered gunzip");
    // } 
    // else {
      console.log("( Client 3 )Message from server", event.data);
    // }

  });

  // 定義一個名為 sendMessage 的函式，用於向伺服器發送一條訊息。
  function sendMessage() {
    socket.send("(Client 3)Hello~ From Client 3");
  }

  // 定義一個名為 sendJson 的函式，用於向伺服器發送JSON格式的資料。
  function sendJson() {
    //將object轉為JSON
    socket.send(JSON.stringify(Jane));
    //socket.send(Jane);
  }

  // function unzip_message()
  // {

  //   socket.send("gunzip");

  // }

  return (
    <div>
      {/* <button onClick={sendMessage()}>send message from client 3</button> */}
      <button onClick={sendMessage}>send message from client 3</button>
      <br />
      <button onClick={sendJson}>send Json from client 3</button>
      {/* {/* <p>This is your backendData : {backendData}</p> */}{" "}
      {/*error correction*/}
    </div>
  );
};

export default Client3;
