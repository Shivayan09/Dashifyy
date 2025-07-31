import React, { useEffect, useState } from 'react'

const BrandName = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ?
        <div>
          <div className='flex items-center justify-center w-full p-3 gap-2 absolute mt-5 top-0'>
            <img src="/main-logo3.png" alt="" className='h-6' />
            <p className='text-md font-bold text-purple-800/80 uppercase text-center'>Dashify</p>
          </div>
        </div> :
        <div>
          <div className='flex items-center justify-center w-fit p-3 gap-2 absolute mt-5 top-0'>
            {!isMobile && <img src="/main-logo3.png" alt="" className='h-6' />}
            <p className='text-md font-bold text-purple-800/80 uppercase text-center'>Dashify</p>
          </div>
        </div>
      }
    </div>
  )
}

export default BrandName
