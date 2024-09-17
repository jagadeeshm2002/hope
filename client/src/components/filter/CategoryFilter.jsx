import { Radio} from '@material-tailwind/react';
import React, { useState } from 'react'

export default function CategoryFilter() {
    const categoryList =["all","men","women"]
    const [categoryChecked,setCategoryChecked]=useState("all")
  return (
    <div className='w-full my-3 px-1   '>
      <p className="font-sans font-bold text-start pl-3">Category</p>
      <div className="flex flex-col">
        {categoryList.map((category) => (
          <Radio className="flex flex-row justify-between items-center my-1" key={category} name={category} label={category} checked={category===categoryChecked && true}  onChange={() => setCategoryChecked(category)} />))}
      </div>
    </div>
  )
}
