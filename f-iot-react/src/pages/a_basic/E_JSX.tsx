import React from 'react'

// https://cdn.pixabay.com/photo/2015/03/27/13/16/maine-coon-694730_1280.jpg

const cat = {
  catUrl: 'https://cdn.pixabay.com/photo/',
  description: '2015/03/27/13/16/',
  imageId: 'maine-coon-694730_1280.jpg',
  name: '아기고양이',
  imageTheme: {
    width: '200px',
    height: '150px'
  },
  theme: {
    backgroundColor: 'black',
    color: 'white'
  }
}

function E_jsx() {
  return (
    <>
      <div style={cat.theme}>
        <p>{cat.name}'s Picture</p>
        <img 
        src={cat.catUrl + cat.description + cat.imageId} alt={cat.name}
        width={cat.imageTheme.width}
        height={cat.imageTheme.height} 
        />
      </div>
    </>
  )
}

export default E_jsx                        