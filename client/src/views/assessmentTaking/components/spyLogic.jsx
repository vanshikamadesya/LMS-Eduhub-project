import React, { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useReactMediaRecorder } from "react-media-recorder";
import { useSelector } from "react-redux";
import "./../styles.css";
import cheatingService from "../../../services/cheatingService";
import ReactCountdown from "react-countdown"; // Update import to use react-countdown
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SpyLogic = (props) => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const [cnt, setCnt] = useState(1);
  const [frst, setFrst] = useState(true);

  const { examId, timeRemaining } = props;

  const CLOUD_NAME = process.env.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
      video: false,
      blobPropertyBag: { type: "audio/mp3" },
    }
  );

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        formData
      );
      console.log("Upload successful:", response.data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const eventHandler = () => {
    document.title = document.hidden ? window.close() : "DON'T go away";
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", eventHandler);
    try {
      cheatingService.clear();
    } catch {
      console.log("no pre counter found");
    }
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("visibilitychange", eventHandler);
      stopRecording();
      navigate.goBack();
    };
  }, [navigate]);

  useEffect(() => {
    if (mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          blob.name = "recording.mp3";
          handleUpload(blob);
        });
    }
  }, [mediaBlobUrl]);

  const capture = useCallback(async () => {
    if (frst) {
      setFrst(false);
    } else {
      if (cnt === 1) {
        startRecording();
      }
      setCnt(cnt + 1);
      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());
      blob.name = cnt.toString() + ".jpeg";
      if (cnt === 7) {
        setCnt(1);
        stopRecording();
      }
      console.log(blob);
      handleUpload(blob);
      cheatingService.batchInc(examId);
    }
  }, [webcamRef, cnt, frst]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      capture();
    }, 1500);

    return () => clearInterval(intervalId);
  }, [webcamRef, cnt, frst]);

  return (
    <div className="container">
      <Webcam
        audio={false}
        width={240}
        height={240}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 240,
          height: 240,
          facingMode: "user",
        }}
      />
      <ReactCountdown
        date={Date.now() + timeRemaining * 1000}
        renderer={({ seconds }) => (
          <div>
            <p>{seconds}</p>
          </div>
        )}
        onComplete={() => {
          stopRecording();
          cheatingService.clear();
          document.removeEventListener("visibilitychange", eventHandler);
          window.close();
        }}
      />
    </div>
  );
};

export default SpyLogic;
