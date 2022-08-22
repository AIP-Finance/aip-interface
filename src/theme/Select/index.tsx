// eslint-disable-next-line no-restricted-imports
import { t } from '@lingui/macro'
import css from '@styled-system/css'
import { ArrowDown2 } from 'iconsax-react'
import ReactSelect from 'react-select'
import styled from 'styled-components/macro'

import { BoxProps } from 'theme/types'

export type SelectProps = BoxProps & any

const StyledSelect = styled(ReactSelect)<SelectProps>(({ hasError }: { hasError?: boolean }) =>
  css({
    border: 'none',
    '& .select__control': {
      alignItems: 'center',
      position: 'relative',
      border: 'normal',
      borderColor: hasError ? 'warning2' : 'neutral6',
      borderRadius: 'sm',
      '&:hover:not([disabled]), &--is-hovered': {
        borderColor: hasError ? 'warning2' : 'neutral5',
        boxShadow: 'none',
      },
      '&:focus-within:not([disabled]), &--is-focused': {
        borderColor: 'primary1',
        boxShadow: 'none',
      },
      '& .select__value-container': {
        px: 3,
        py: '12px',
        color: 'inherit',
        cursor: 'pointer',
        fontSize: '14px',
        lineHeight: '20px !important',
        '& .select__input-container': {
          margin: '0',
          padding: '0',
          color: 'inherit',
        },
        '& .select__single-value': {
          color: 'inherit',
        },
      },
      '& .select__indicators': {
        cursor: 'pointer',
        '& .select__indicator-separator': {
          bg: 'neutral6',
        },
      },
    },
    '& .select__menu': {
      borderRadius: 'sm',
      border: 'small',
      borderColor: 'neutral6',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer !important',
      mt: 1,
      p: 0,
      bg: 'neutral8',
      '&-list': {
        p: 2,
        bg: 'neutral8',
        borderRadius: 'sm',
        color: 'neutral3',
        overflow: 'overlay',
        '& .select__option': {
          borderRadius: 'sm',
          cursor: 'pointer !important',
          '&--is-focused:not([disabled])': {
            bg: 'neutral7',
          },
          '&--is-selected:not([disabled])': {
            bg: 'primary1',
            color: 'neutral8',
          },
        },
      },
    },
  })
)

const StyledArrow = styled(ArrowDown2)`
  color: ${({ theme }) => theme.colors.primary1};
`
const SelectDropdownIndicator = () => {
  return <StyledArrow variant="Bold" />
}
const SelectStyles = {
  indicatorSeparator: () => ({ display: 'none' }),
  indicatorsContainer: (providedStyled: any) => ({ ...providedStyled, paddingRight: '16px' }),
  singleValue: (providedStyled: any) => ({ ...providedStyled, fontWeight: 600 }),
}

const Select = ({ components, ...rest }: any) => {
  return (
    <StyledSelect
      isSearchable
      maxMenuHeight={250}
      noOptionsMessage={() => t`No Data Found`}
      className="select-container"
      classNamePrefix="select"
      components={{ ...components, DropdownIndicator: SelectDropdownIndicator }}
      styles={SelectStyles}
      {...rest}
      // menuIsOpen
    />
  )
}

export default Select
