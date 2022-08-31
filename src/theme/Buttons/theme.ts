import { sizes, variants } from './types'

const HOVER_STATE = '&:hover:not([disabled]),&:focus:not([disabled]),&:active:not([disabled])'

export const styleVariants = {
  [variants.PRIMARY]: {
    color: 'white',
    bg: 'primary1',
    [HOVER_STATE]: {
      bg: 'primary2',
    },
  },
  [variants.SECONDARY]: {
    color: 'black',
    bg: 'secondary1',
    [HOVER_STATE]: {
      bg: 'secondary2',
    },
  },
  [variants.INFO]: {
    color: 'white',
    bg: 'info1',
    [HOVER_STATE]: {
      bg: 'info2',
    },
  },
  [variants.WARNING]: {
    color: 'white',
    bg: 'warning1',
    [HOVER_STATE]: {
      bg: 'warning2',
    },
  },
  [variants.SUCCESS]: {
    color: 'white',
    bg: 'success1',
    [HOVER_STATE]: {
      bg: 'success2',
    },
  },
  [variants.DANGER]: {
    color: 'white',
    bg: 'danger1',
    [HOVER_STATE]: {
      bg: 'danger2',
    },
  },
  [variants.OUTLINE]: {
    color: 'neutral8',
    bg: 'transparent',
    border: 'small',
    borderColor: 'neutral4',
    [HOVER_STATE]: {
      borderColor: 'neutral6',
      bg: 'neutral8',
      color: 'neutral1',
    },
  },

  [variants.OUTLINE_DANGER]: {
    color: 'danger1',
    bg: 'transparent',
    border: 'normal',
    borderColor: 'danger1',
    [HOVER_STATE]: {
      borderColor: 'danger2',
      color: 'danger2',
    },
  },
  [variants.OUTLINE_PRIMARY]: {
    color: 'primary1',
    bg: 'primary2',
    border: 'small',
    borderColor: 'primary1',
    [HOVER_STATE]: {
      borderColor: 'primary1',
      bg: 'primary1',
      color: 'neutral1',
    },
  },
  [variants.GHOST]: {
    color: 'neutral8',
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
