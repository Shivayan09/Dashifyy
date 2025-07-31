import React from 'react'

const BgDesign = () => {
  return (
    <div>
      <div
  className="absolute top-0 right-0 -z-20 w-[100vw] h-[140vh] bg-purple-400"
  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
></div>
    </div>
  )
}

export default BgDesign
