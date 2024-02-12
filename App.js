import {useState} from "react";

function Qrcode(){
  const [img, setImg]=useState("");
  const [loading, setLoading]=useState(false);
  const[qrdata, setQrData]=useState("https://www.youtube.com/");
  const [qrsize, setQrSize]= useState("150");
  async function generateqr(){
     setLoading(true);
     try{
      const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}*${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
     }
     catch(error){
      console.log("QR generating error",error);
     }
     finally{
      setLoading(false);
     }
  }
  function downloadqr(){
    fetch(img).then((response)=>response.blob()).then((blob)=>
    {
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    })
  
  }
  return(
    <div className="container">
    <h4>QR Code Generator</h4>
    {loading && <p>Please wait...</p>}
    {img && <img src={img} alt="" className="img-code"/>}
    <div>
      <label htmlFor="inputdata" className="data-generator">Data for QR code</label>
      <input type="text" id="inputdata" value={qrdata} onChange={(e)=>setQrData(e.target.value)} placeholder="Enter data for QR code"/>
      <label htmlFor="inputsize" className="data-generator">Image size (e.g.,150)</label>
      <input type="text" id="inputsize" value={qrsize} onChange={(e)=>setQrSize(e.target.value)} placeholder="Enter image size"/>
      <button className="generate-button" disabled={loading} onClick={generateqr}>Generate QR Code</button>
      <button className="download-button" onClick={downloadqr}>Download QR Code</button>
    </div>
    <p>Designed by <a href="www.google.com">Gowribharathi</a></p>
  </div>
  );
}
function App() {
  return (
    <>
    <Qrcode />
    </>
  );
}

export default App;
