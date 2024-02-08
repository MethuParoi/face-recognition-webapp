import { useState, useEffect, useRef } from "react";
import "../App.css";
import "./css/cameraModule.css";

export const CameraModule = () => {

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [imageBlob, setImageBlob] = useState(null);
    const [isCameraOpen, setCameraOpen] = useState(true);
    const [isSnaped, setSnaped] = useState(false);
    const [isDownloaded, setDownloaded] = useState(false);

    useEffect(() => {
      if (isCameraOpen) {
        getVideo(); // Open the camera when the component mounts
      }
    }, [isCameraOpen]);

    const toggleCamera = () => {
      if (isCameraOpen) {
        closeVideo();
      } else {
        getVideo();
      }
      setCameraOpen(!isCameraOpen);
    };

    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 720, height: 480 },
        })
        .then((stream) => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
          setCameraOpen(true); // Set camera open state to true after successfully opening the camera
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const closeVideo = () => {
      let video = videoRef.current;
      let stream = video.srcObject;

      if (stream) {
        let tracks = stream.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });

        video.srcObject = null;
        setCameraOpen(false);
      }
    };

    const takePhoto = () => {
      //showing message
      setSnaped(true);
      setTimeout(() => {
        setSnaped(false);
      }, 5000);

      //download functionality
      const width = 720;
      const height = 480;

      let video = videoRef.current;

      // Create a canvas element dynamically
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      let ctx = canvas.getContext("2d");

      // Flip the image horizontally to correct the mirror effect
      ctx.translate(width, 0);
      ctx.scale(-1, 1);

      // Draw the video frame onto the canvas
      ctx.drawImage(video, 0, 0, width, height);

      // Reset the transformation
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Convert canvas image data to a Blob object
      canvas.toBlob((blob) => {
        // Here you can do whatever you want with the blob
        console.log("Blob:", blob);
        // For example, you can set it as state
        setImageBlob(blob);
        // Or you can save it to local storage
        // localStorage.setItem('capturedImage', blob);
      }, "image/png");
    };

    const downloadImage = () => {
      //showing message
      setSnaped(false);
      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
      }, 5000);


      // Check if an image Blob exists
      if (imageBlob) {
        // Create a temporary URL for the Blob
        const imageUrl = URL.createObjectURL(imageBlob);

        // Create an anchor element
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "image.png";

        // Simulate a click to trigger the download
        document.body.appendChild(link);
        link.click();

        // Remove the anchor element
        document.body.removeChild(link);

        // Revoke the temporary URL to free up memory
        URL.revokeObjectURL(imageUrl);
      }
    };
  return (
    <div className="camera-parent">
      <div className="header">
        <h1 className="auth-heading">Get Authenticated !</h1>
      </div>

      {isSnaped && (
        <div className="snap">
          <p className="snap-text">Image Captured !</p>
        </div>
      )}

      {isDownloaded && (
        <div className="snap">
          <p className="snap-text">Image Downloaded !</p>
        </div>
      )}

      <div className="camera">
        <video src="" ref={videoRef} className="mirrored"></video>
      </div>

      <div className="buttons">
        <div className="btn-ch">
          <button className="btn" onClick={takePhoto}>
            Snap
          </button>
        </div>

        <div className="btn-ch">
          <button className="btn" onClick={downloadImage}>
            Download
          </button>
        </div>

        <div className="btn-ch">
          <button className="btn" onClick={toggleCamera}>
            Close
          </button>
        </div>
      </div>
      <canvas ref={photoRef}></canvas>
      {/* <div className="result hasphoto"></div> */}
    </div>
  );
}

export default CameraModule
