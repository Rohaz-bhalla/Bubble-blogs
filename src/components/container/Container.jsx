import React from 'react'    // container accepts ur properties as a children... children ek name h kuch b rkh lo iski jgah

function container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
      {children}
    </div>
  ) // chahe toh yeh braces hta kr ending </div> ke sath ; lga do taki pta lge ek line h... industry grade main use hota
}

export default container