// const files = require.context('.', false, /\.vue$/)
// const modules = {}
// files.keys().forEach((key) => {
//   modules[key.replace(/(\.\/|\.vue)/g, '')] = files(key)
// })

// export default modules

import Media from './Media'
import Photo from './Photo'
import SwapMedia from './SwapMedia'
import LockScreen from './LockScreen'

export {
  Media,
  Photo,
  SwapMedia,
  LockScreen
}
