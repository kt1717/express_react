import { useState } from "react";
import Jane from "../../jane.json";
//import Zlib from "node:zlib";
import Zlib from "react-zlib-js";


const Client5 = () => {
  const [backendData, setBackendData] = useState("");

  const handleCompress = () => {

    const jsonData = { message: "Hello, server!" }; // 要壓縮的JSON數據
    const jsonString = JSON.stringify(jsonData);//使用JSON.stringify將jsonData物件轉換為JSON格式的字串。
    //const buffer = Buffer.from(jsonString, "utf-8");
	const uint8Array = new TextEncoder().encode(jsonString); 
	//使用TextEncoder的encode方法將JSON字串轉換為Uint8Array格式的數據
    
    
    Zlib.gzip(uint8Array, (err, compressedData) => { 
        //將Uint8Array作為壓縮的輸入。這樣就可以在瀏覽器端進行壓縮操作了。
    
    if (err) {
        console.error("Error while compressing data:", err);
        return;
      }
      setBackendData(compressedData);
      console.log("Compressed data:", compressedData);
      // 在這裡可以將壓縮過的數據發送給WebSocket伺服器或其他地方
		  socket.send(compressedData);
      
    });
  };

  const handleDecompress = () => {
    // 假設這裡有壓縮過的數據要解壓縮
        //暫時用backendData來表示
    
        // 解壓縮JSON數據
    Zlib.gunzip(backendData, (err, decompressedData) => {
      if (err) {
        console.error("Error while decompressing data:", err);
        return;
      }

      const jsonString = decompressedData.toString("utf-8");//將解壓縮後的數據轉換為UTF-8格式的字串，並存儲在jsonString中。
      const jsonData = JSON.parse(jsonString); //將jsonString解析為JSON格式的數據(object)，存儲在jsonData中。
      console.log("Decompressed JSON data:", jsonData);
	    socket.send(jsonString);
      // 在這裡可以對解壓縮後的數據進行操作
    });
  };

  //create ws connection
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
  });

  // 定義一個名為 sendMessage 的函式，用於向伺服器發送一條訊息。
  function sendMessage() {
    socket.send("(Client 4)Hello~ From Client 4");
  }

  // 定義一個名為 sendJson 的函式，用於向伺服器發送JSON格式的資料。
  function sendJson() {
    //將object轉為JSON
    socket.send(JSON.stringify(Jane));
  }

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

export default Client5;