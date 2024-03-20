/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./style.css";
import {
  BarcodeDetector as Detector,
  DetectedBarcode as Detected,
  setZXingModuleOverrides,
} from "barcode-detector";
import { Close } from "@mui/icons-material";
import wasmFile from "../../../node_modules/zxing-wasm/dist/reader/zxing_reader.wasm?url";

setZXingModuleOverrides({
  locateFile: (path: any, prefix: any) => {
    if (path.endsWith(".wasm")) {
      return wasmFile;
    }
    return prefix + path;
  },
});

export interface DataScanner {
  startScanning: () => void;
}

export const DataScanner = forwardRef<
  DataScanner,
  { onDetect: (code: string) => void; onClose: () => void }
>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [barcodeDetector, setBarcodeDetector] = useState<Detector | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useImperativeHandle(ref, () => ({
    async startScanning() {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (videoRef.current && newStream && svgRef.current) {
          videoRef.current.srcObject = newStream;
          videoRef.current.play();
          setStream(newStream);
          setTimeout(() => {
            if (svgRef.current && videoRef.current) {
              svgRef.current.setAttribute(
                "viewBox",
                "0 0 " +
                  videoRef.current.videoWidth +
                  " " +
                  videoRef.current.videoHeight
              );
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Error accessing the camera", error);
      }
    },
  }));

  useEffect(() => {
    async function initBarcodeDetector() {
      if ("BarcodeDetector" in window) {
        const formats = await Detector.getSupportedFormats();
        if (formats.length > 0) {
          // const formats = await Detector.getSupportedFormats();
          setBarcodeDetector(new Detector() as any);
        } else {
          console.log("Barcode Detector is not supported by this browser.");
        }
      }
    }
    initBarcodeDetector();
  }, []);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  // Start the camera stream

  const decodeBarcodes = async () => {
    if (!barcodeDetector || !videoRef.current) return;
    try {
      const barcodes = await barcodeDetector.detect(videoRef.current);
      if (barcodes.length > 0) {
        drawOverlay(barcodes);
        props.onDetect(barcodes[0].rawValue);
      }
    } catch (error) {
      console.log("Error decoding barcodes: ", error);
    }
  };

  function getPointsData(lr: any) {
    let pointsData = lr.x1 + "," + lr.y1 + " ";
    pointsData = pointsData + lr.x2 + "," + lr.y2 + " ";
    pointsData = pointsData + lr.x3 + "," + lr.y3 + " ";
    pointsData = pointsData + lr.x4 + "," + lr.y4;
    return pointsData;
  }

  const drawOverlay = (barcodes: Detected[]) => {
    const svg = svgRef.current;
    if (svg) {
      svg.innerHTML = "";
      for (let i = 0; i < barcodes.length; i++) {
        const barcode = barcodes[i];
        const lr = {} as any;
        lr.x1 = barcode.cornerPoints[0].x;
        lr.x2 = barcode.cornerPoints[1].x;
        lr.x3 = barcode.cornerPoints[2].x;
        lr.x4 = barcode.cornerPoints[3].x;
        lr.y1 = barcode.cornerPoints[0].y;
        lr.y2 = barcode.cornerPoints[1].y;
        lr.y3 = barcode.cornerPoints[2].y;
        lr.y4 = barcode.cornerPoints[3].y;
        const points = getPointsData(lr);
        const polygon = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "polygon"
        );
        polygon.setAttribute("points", points);
        polygon.setAttribute("class", "barcode-polygon");
        const text = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        text.innerHTML = barcode.rawValue;
        text.setAttribute("x", lr.x1);
        text.setAttribute("y", lr.y1);
        text.setAttribute("fill", "red");
        text.setAttribute("fontSize", "20");
        svg.append(polygon);
        polygon.addEventListener("click", () => {
          props.onDetect(barcode.rawValue);
        });
        svg.append(text);
      }
    }
  };

  useEffect(() => {
    if (stream) {
      const intervalId = setInterval(decodeBarcodes, 100);
      return () => {
        clearInterval(intervalId);
        stream.getTracks().forEach((track) => track.stop());
        stream.getVideoTracks().forEach((track) => track.stop());
      };
    }
  }, [stream, barcodeDetector]);

  return (
    <div className="scanner">
      <button
        style={{
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "100px",
          border: "none",
          width: "50px",
          height: "50px",
          cursor: "pointer",
          position: "absolute",
          right: 12,
          top: 12,
        }}
        onClick={() => props.onClose()}
      >
        <Close />
      </button>
      <svg ref={svgRef} className="overlay fullscreen" />
      <video
        ref={videoRef}
        playsInline
        muted
        className="camera fullscreen"
        width="100%"
        height="100%"
      />
    </div>
  );
});
