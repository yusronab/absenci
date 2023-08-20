import { useState } from "react";
import { useAppState } from "../AppContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiSend, BiQrScan, BiStop } from "react-icons/bi";
import QrScanner from "qr-scanner";

let stopScan: boolean = false;
let resultScan: string = "";

const Scanner = () => {
  const { state } = useAppState();
  const [loading, setLoading] = useState(false);

  const [btnScan, setBtnScan] = useState(true);

  const [message, setMessage] = useState({
    error: false,
    info: '',
  })

  const getFullname: Record<string, string> = {
    ferdi: "Ferdi Setyo Amanda",
    asrof: "M. Asyrofurizqi",
    reziq: "M. Reziq Darusman",
    yusron: "Yusron Arly Bazarah",
  }

  const scanNow = async (isScan: boolean) => {
    setBtnScan(isScan);

    if (isScan) stopScan = true;
    if (!btnScan) return;

    stopScan = false;
    await new Promise(r => setTimeout(r, 100))

    const videoElement = document.getElementById('scanView') as HTMLVideoElement;
    const scanner = new QrScanner(
      videoElement,
      result => {
        resultScan = result.data
        setBtnScan(true)
        setMessage({ ...message, error: false, info: 'Scan berhasil!' })
        stopScan = true
      },
      {
        onDecodeError: error => {
          console.error(error)
          setMessage({ ...message, error: true, info: error.toString() })
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true
      }
    )

    await scanner.start()
    while (!stopScan) await new Promise(r => setTimeout(r, 100))
    scanner.stop()
    scanner.destroy()
  }

  const sendToSheet = async () => {
    setLoading(true)
    
    await fetch('https://sheetdb.io/api/v1/gfre646e6awhx', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: {
          ...state,
          fullname: getFullname[state.name],
          timestamp: new Date(),
          presence: resultScan
        }
      })
    }).then((response) => response.json())
      .then(data => console.log(data))
      .catch(error => console.log('Error:', error))

    setLoading(false);

    window.location.href = "/";
  }

  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        {!btnScan && (
          <video
            id="scanView"
            style={{
              width: "70%",
              height: "70%",
              borderStyle: "dotted",
            }}
          ></video>
        )}
        <p className={`${message.error ? 'text-red-500' : 'text-white'}`}>{message.info}</p>
        {resultScan ? (
          <button onClick={sendToSheet} className="bg-white text-teal-600 p-3 rounded-md transition-all
          duration-300 group mx-auto">
            {loading ? <AiOutlineLoading3Quarters className="animate-spin" /> : (
              <span className="flex gap-2 items-center">
                <BiSend className="-rotate-45 group-hover:rotate-0 transition-all duration-300" />Kirim
              </span>
            )}
          </button>
        ) : (
          <button onClick={() => scanNow(!btnScan)} className="p-4 bg-white rounded-full">
            {btnScan ? <BiQrScan color="teal" size={24} /> : <BiStop color="teal" size={24} />}
          </button>
        )}
      </div>
    </>
  )
}

export default Scanner