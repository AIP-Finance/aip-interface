import { sizes, variants } from './types'

export const styleVariants = {
  [variants.PRIMARY]: {
    color: 'white',
    bg: 'primary1',
    '&:hover,&:focus,&:active': {
      bg: 'primary2',
    },
  },
  [variants.SECONDARY]: {
    color: 'black',
    bg: 'secondary1',
    '&:hover,&:focus,&:active': {
      bg: 'secondary2',
    },
  },
  [variants.INFO]: {
    color: 'white',
    bg: 'info1',
    '&:hover,&:focus,&:active': {
      bg: 'info2',
    },
  },
  [variants.WARNING]: {
    color: 'white',
    bg: 'warning1',
    '&:hover,&:focus,&:active': {
      bg: 'warning2',
    },
  },
  [variants.SUCCESS]: {
    color: 'white',
    bg: 'success1',
    '&:hover,&:focus,&:active': {
      bg: 'success2',
    },
  },
  [variants.DANGER]: {
    color: 'white',
    bg: 'danger1',
    '&:hover,&:focus,&:active': {
      bg: 'danger2',
    },
  },
  [variants.OUTLINE]: {
    color: 'neutral1',
    bg: 'transparent',
    border: 'normal',
  },

  [variants.OUTLINE_DANGER]: {
    color: 'danger1',
    bg: 'transparent',
    border: 'normal',
    borderColor: 'danger1',
    '&:hover,&:focus,&:active': {
      borderColor: 'danger2',
      color: 'danger2',
    },
  },
  [variants.OUTLINE_PRIMARY]: {
    color: 'primary1',
    bg: 'transparent',
    border: 'normal',
    borderColor: 'primary1',
    '&:hover,&:focus,&:active': {
      borderColor: 'primary2',
      color: 'primary2',
    },
  },
  [variants.GHOST]: {
    color: 'neutral1',
    bg: 'transparent',
    border: 'none',
  },
}

export const sizeVariants = {
  [sizes.ICON]: {
    p: 1,
    borderRadius: '50%',
    lineHeight: 'calc(100% - 4px)',
  },
  [sizes.XS]: {
    px: '8px',
    py: '4px',
    fontSize: '14px',
    borderRadius: '24px',
  },
  [sizes.SM]: {
    px: '12px',
    py: 2,
  },
  [sizes.MD]: {
    px: '14px',
    py: '16px',
  },
  [sizes.LG]: {
    px: 3,
    py: 3,
    lineHeight: '16px',
    fontSize: '16px',
  },
}
