import React from 'react'
import video from "./assets"

export default function player() {
  return (
    <div>
      <div className="player">
         <video src={video} autoPlay loop controls muted></video>
      </div>
    </div>
  )
}


