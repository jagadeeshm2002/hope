import { Radio} from '@material-tailwind/react';
import React from 'react'

function BrandFilter({value, onChange}) {
    const brandList=["hope"]
  return (
    <div className='w-full my-3 px-1  '>
      <p className="font-sans font-bold text-start pl-3">Brands</p>
      <div className="flex flex-col">
        {brandList.map((brand) => (
          <Radio className="flex flex-row justify-between items-center my-1" key={brand} name={brand} label={brand} defaultChecked={brand === "hope" && true}  disabled/> ))}
      </div>
    </div>
  )
}

export default BrandFilter