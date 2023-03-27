import React, { useEffect } from 'react'
import * as PANOLENS from "panolens"
export default function Image() {

    const panorama = new PANOLENS.ImagePanorama("/assets/cyber.png");
    const viewer = new PANOLENS.Viewer({
      container: document.querySelector(".image-container"),
      autoRotate:true,
      autoRotateSpeed:0.3
    })
    viewer.add(panorama)
  return (
        <div className='image-container'></div>
  )
}
