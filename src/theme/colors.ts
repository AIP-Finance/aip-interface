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

    neutral8: darkMode ? '#f6f9fc' : '#212529',
    neutral7: darkMode ? '#e9ecef' : '#353945',
    neutral6: darkMode ? '#E6E8EC' : '#525f7f',
    neutral5: darkMode ? '#B1B5C3' : '#8898aa',
    neutral4: darkMode ? '#777E90' : '#adb5bd',
    neutral3: darkMode ? '#3D424E' : '#ced4da',
    neutral2: darkMode ? '#23262F' : '#e9ecef',
    neutral1: darkMode ? '#141416' : '#f6f9fc',

    //primary colors
    primary1: '#B1E846',
    primary2: 'rgba(177, 232, 70, 0.1)',
    primary3: 'rgba(177, 232, 70, 0.4)',

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

    modalBG: darkMode ? 'rgba(35, 38, 47, 0.7);' : 'rgba(35, 38, 47, 0.6);',
  }
}

export default colors
