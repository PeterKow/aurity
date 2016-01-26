import React from 'react'

const styles = {
  opacity: 1,
  transition: 'all .4s ease-in-out',
  backgroundColor: '#212339',
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
}

export default function Image({ src }) {
  styles.backgroundImage = 'url(' + src + ')'
  return (
    <div style={styles}/>
  )
}
