import React, { useState } from 'react'
import MultiRangeSlider from '../../utilities/multiRangeSlider';


export default function Price() {
  const [rangeValue, setRangeValue] = useState([1, 5000]);
  return (
    <div className=' bg-white '>
        <div className=' rounded-xl border border-gray-600 h-32 w-96 flex flex-col'>
          <div className='px-4 py-2'>Price</div>
          <hr  className='border-gray-600'/>
          <div className='px-7 py-8'><MultiRangeSlider  defaultValue={rangeValue} onChange={setRangeValue} max={5000} className={'flex'}/></div>
        </div>
    </div>
  )
}
