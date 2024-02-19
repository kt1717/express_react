import React, {useState,useEffect} from 'react';

function App() {

  const [backendData,setBackendData]=useState([{}]);

  useEffect(()=>{
    fetch("http://localhost:5000/api").then(
      response => response.json()
    ).then(
      data => {
          setBackendData(data);
      }
    )
  },[])

  return (
    <div>App</div>
  )
}
export default App