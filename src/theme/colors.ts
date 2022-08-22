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
    neutral6: darkMode ? '#525f7f' : '#E6E8EC',
    neutral5: darkMode ? '#8898aa' : '#B1B5C3',
    neutral4: darkMode ? '#adb5bd' : '#777E90',
    neutral3: darkMode ? '#ced4da' : '#3D424E',
    neutral2: darkMode ? '#e9ecef' : '#23262F',
    neutral1: darkMode ? '#f6f9fc' : '#141416',

    //primary colors
    primary1: '#B1E846',
    primary2: '#rgba(177, 232, 70, 0.1)',

    // secondary colors
    secondary1: '#465DDD',
    secondary2: '#AFBBFD',

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
