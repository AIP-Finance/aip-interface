import { Colors } from './types'

const white = '#FFFFFF'
const black = '#000000'

function colors(darkMode: boolean): Colors {
  return {
    darkMode,
    // base
    white,
    black,

    // backgrounds / greys

    neutral8: darkMode ? '#212529' : '#f6f9fc',
    neutral7: darkMode ? '#353945' : '#e9ecef',
    neutral6: darkMode ? '#525f7f' : '#ced4da',
    neutral5: darkMode ? '#8898aa' : '#adb5bd',
    neutral4: darkMode ? '#adb5bd' : '#8898aa',
    neutral3: darkMode ? '#ced4da' : '#525f7f',
    neutral2: darkMode ? '#e9ecef' : '#353945',
    neutral1: darkMode ? '#f6f9fc' : '#212529',

    //primary colors
    primary1: '#5e72e4',
    primary2: '#3d55df',

    // secondary colors
    secondary1: '#f4f5f7',
    secondary2: '#dee1e7',

    // other
    info1: '#11cdef',
    info2: '#0eafcc',
    danger1: '#f5365c',
    danger2: '#ec0c38',
    success1: '#2dce89',
    success2: '#26af74',
    warning1: '#fb6340',
    warning2: '#fa441b',

    modalBG: darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.6)',
  }
}

export default colors
