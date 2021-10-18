import React, { useEffect, useRef, useState } from 'react'
// Source: https://codesandbox.io/s/pz7s1?file=/src/getThumbnail.js
// import Thumbnail from "./Thumbnail";
// 1. Make sure user is uploading a video
// This is already checked in the Illfact videoupload

// 2. Do some testing before implementing it.
// 3. You have to get the file URL with the Form Apped

export default function App() {
  const [file, setFile] = useState<File>()
  const videoInput = useRef<HTMLInputElement>(null)
  const videoElem = useRef<HTMLVideoElement>(null)
  const [imgSrc, setImgSrc] = useState<string>('')

  const videoChangeHandler = () => {
    if(!videoInput.current){
      return;
    }
    if(!videoInput.current.files){
      return;
    }
    setFile(videoInput.current.files[0])
  }

  const captureThumbnail = () => {
    if(!videoElem.current){
      return;
    }

    const canvas = document.createElement('canvas')
    canvas.width = videoElem.current.videoWidth
    canvas.height = videoElem.current.videoHeight

    canvas
      .getContext('2d')!
      .drawImage(
        videoElem.current,
        0,
        0,
        videoElem.current.videoWidth,
        videoElem.current.videoHeight,
      )

    setImgSrc(canvas.toDataURL())
    fetch(imgSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const NewFile = new File([blob], 'video_thumbnail', {
          type: 'image/png',
        })
      })
  }

  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <input
        ref={videoInput}
        accept="video/mp4,video/x-m4v,video/*"
        onChange={videoChangeHandler}
        type="file"
      />

      {file ? (
        <video
          style={{ width: '100px', display: 'none' }}
          ref={videoElem}
          src={URL.createObjectURL(file)}
          //type="video/mp4"
          // controls
          autoPlay
          onLoadedData={captureThumbnail}
          
        ></video>
      ) : (
        ''
      )}

      {imgSrc ? (
        <div>
          <img style={{ width: '100px' }} src={imgSrc} alt="" />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
