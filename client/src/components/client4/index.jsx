import { useEffect, useState } from "react";
import Jane from "../../jane.json";
//import Zlib from "node:zlib";
import Zlib from "react-zlib-js";

const Client4 = () => {
  //const [backendData, setBackendData] = useState([{}]);

  const [backendData, setBackendData] = useState([]);

  //object需要用 ()=>({})的方式建立初始值
  const [jsonData, setJsonData] = useState( ()=>({
    message: "Hello, server!",
    Kelly: { name: "Kelly Tseng", gender: "female" }
  }));

  /////////////////////////////////////////////compress/////start//////////////////////////////////////////////////////////////

  function handleCompress() {
    //const jsonData = { message: "Hello, server!",Kelly:{name:"Kelly", gender :"female"} }; // 要壓縮的JSON數據
    //const jsonString = JSON.stringify(jsonData);
    //const jsonString = JSON.stringify(Jane);

    setJsonData(JSON.stringify(Jane));//用自己的資料~
    const jsonString = JSON.stringify(jsonData);

    //const buffer = Buffer.from(jsonString, "utf-8");
    const uint8Array = new TextEncoder().encode(jsonString); //使用了TextEncoder將JSON字符串轉換為Uint8Array

    // 壓縮JSON數據
    //zlib.gzip(buffer, (err, compressedData) => {

    Zlib.gzip(uint8Array, (err, compressedData) => {
      //將Uint8Array作為壓縮的輸入。這樣就可以在瀏覽器端進行壓縮操作了。

      if (err) {
        console.error("Error while compressing data:", err);
        return;
      }
      setBackendData(compressedData);
      console.log("Compressed data:\n", compressedData);
      // 在這裡可以將壓縮過的數據發送給WebSocket伺服器或其他地方
      // socket.send(compressedData);
      socket.send(JSON.stringify({ compressed: true, data: compressedData }));
    });
  }

  /////////////////////////////////////////////compress/////end//////////////////////////////////////////////////////////////

  /////////////////////////////////////////////decompress/////start//////////////////////////////////////////////////////////////

  function handleDecompress() {
    // 假設這裡有壓縮過的數據要解壓縮
    //暫時用backendData來表示

    // 解壓縮JSON數據
    Zlib.gunzip(backendData, (err, decompressedData) => {
      if (err) {
        console.error("Error while decompressing data:", err);
        return;
      }

      const jsonString = decompressedData.toString("utf8");
      const jsonData = JSON.parse(jsonString); //gunzip
      console.log("Decompressed JSON data:\n", jsonData);
      socket.send(jsonString); // 之後要加回來喔
      // 在這裡可以對解壓縮後的數據進行操作
    });
  }

  /////////////////////////////////////////////decompress/////end//////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////functions/////start////////////////////////////////////////////////////////////////

  function isJSON(message) {
    try {
      let toUTF = message.toString("utf8");
      console.log("(Client4)JSON 字串:"); // 當收到訊息時，假設訊息是檔案內容，將其寫入檔案並進行壓縮
      console.log(toUTF);
      JSON.parse(toUTF);
      return true;
    } catch (error) {
      return false;
    }
  }

  ///////////////////////////////////////////////////functions/////end/////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////// ws connection start//////////////////////////////////////////////////////

  //創建一個WebSocket連接到地址為 "ws://localhost:5000" 的伺服器。
  const socket = new WebSocket("ws://localhost:5000");

  //open
  //監聽WebSocket連接的打開事件，當連接成功建立時執行指定的函式，並在控制台中顯示一條訊息。

  socket.addEventListener("open", function (event) {
    console.log("( Client 4 )Connection to ws server");
  });

  //message
  //監聽WebSocket接收到訊息的事件，當接收到訊息時執行指定的函式，並在console中顯示收到的訊息。
  socket.addEventListener("message", function (event) {
    console.log("( Client 4 )Message from server", event.data);

    // 在消息中添加壓縮標誌並發送消息
    if (isJSON(event.data)) {

      //之後要加回來 setJsonData(event.data);
      console.log("Your JSON data has been saved by the JSON fairy. ");

    } else {
      console.log("Not a valid JSON. ");
    }
  });

  ////////////////////////////////////////////////////ws connection//////end////////////////////////////////////////////////

  //////////////////////////////////////////////// button-functions start /////////////////////////////////////////////////////////

  // 定義一個名為 sendMessage 的函式，用於向伺服器發送一條訊息。
  function sendMessage() {
    socket.send("(Client 4)Hello~ From Client 4");
  }

  // 定義一個名為 sendJson 的函式，用於向伺服器發送JSON格式的資料。
  function sendJson() {
    //將object轉為JSON
    socket.send(JSON.stringify(Jane));
  }

  //////////////////////////////////////////////// button-functions end /////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////return//////start////////////////////////////////////////////////////////////////
  return (
    <div>
      <button onClick={sendMessage}>send message from client 4</button>

      <br />
      <button onClick={sendJson}>send Json from client 3</button>

      <br />
      <button onClick={handleCompress}>client 4 gzip</button>

      <br />
      <button onClick={handleDecompress}>client 4 gunzip</button>
    </div>
  );
};
/////////////////////////////////////////////////////return//////end/////////////////////////////////////////////////////////////////

export default Client4;
