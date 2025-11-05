import React, { useEffect, useRef, useState } from 'react'
import './Webcam.css';

// Webcam 을 활용한 간단한 사진 캡쳐 & 표시 기능
// 웹캠으로 사진을 찍고, 찍은 사진을 화면에 표시
// - useState, useRef, useEffect 사용

function Webcam() {
  // === Hooks ===
  // useState: 웹캠의 비디오 스트림 저장
  const [image, setImage] = useState<string | null>(null);

  // useRef: HTML 요소에 직접적인 조작
  // 비디오 HTML 요소
  const videoRef = useRef<HTMLVideoElement>(null);

  // 캔버스 HTML 요소
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 마운트시 실행될 로직 작성(웹캠 설정)
  useEffect(() => {
    // 비동기 함수로 웹캠 설정
    async function setupWebcam() {
      // 사용자의 미디어 장치에 접근하여 비디오 스트림 값을 요청
      const stream = await navigator.mediaDevices.getUserMedia({video: true}); 

      if(videoRef.current) {
        videoRef.current.srcObject = stream; // 비디오 요소의 소스(src 값)로 stream 을 설정
      }
    }

    setupWebcam();

  }, []);

  // === Event Handler ===
  // 이미지 캡쳐 이벤트 핸들러
  const handleCaptureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if(video && canvas) {
      // 캔버스의 2D 렌더링 컨텍스트 가져오기
      const context = canvas.getContext('2d');
      
      if(context) {
        // 비디오에 현재 스트림을 캔버스에 그림
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // 캔버스의 내용을 png 형식으로 데이터 URL 변환
        const imageData = canvas.toDataURL('image/png');
        setImage(imageData);
      }
    }
  };
  
  return (
    <div className='container'>
      <div className='camera-card'>
        <h4 className='title'>카메라 앱</h4>
        {/* playsInline: 전체 화면 전환 없이 발 ㅗ재생 */}
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          width='320'
          height='240'
          className='video'
        ></video>
        <button onClick={handleCaptureImage} className='capture-button'>이미지 캡쳐</button>

        {/* 캡처를 위한 내부 처리용 캔버스 (사용자가 직접 보는 용도 아님) */}
        <canvas
        ref={canvasRef}
        width='320'
        height='240'
        style={{
          display: 'none'
        }}></canvas>

        {image && (
          <div className='image-section'>
            <h5 className='subtitle'>캡처된 이미지</h5>
            <img src={image} alt='캡처된 이미지' style={{ width: '320', height: '240'}} className='captured-image' />
          </div>
        )}
      </div>
    </div>
  )
}

export default Webcam