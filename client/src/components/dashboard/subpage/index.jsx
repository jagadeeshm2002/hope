import React from 'react'

const SubPage = (props) => {
    const{titleText,actionName,action} =props
  return (
    <div className="flex flex-row justify-between items-center px-2">
        <h2 className="text-xl font-normal text-start">{titleText}</h2>
        <button className="py-1 px-2 border border-gray-400 text-sm rounded-md" onClick={action}>
          {actionName}
        </button>
      </div>
  )
}

export default SubPage