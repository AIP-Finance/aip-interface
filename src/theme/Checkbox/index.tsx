import { ForwardedRef, ReactElement, forwardRef, useCallback, useEffect } from 'react'
import styled from 'styled-components/macro'

import useToggleInput from 'hooks/helpers/useToggleInput'
import CheckIcon from 'theme/Icons/CheckIcon'

interface CheckboxProps {
  defaultChecked?: boolean
  checked?: boolean
  disabled?: boolean
  onChange?: (value?: boolean) => void
  children?: ReactElement | ReactElement[] | string
}

const CheckboxWrapper = styled.div<{ disabled?: boolean; hasError: boolean }>`
  display: flex;
  align-items: center;
  width: fit-content;
  position: relative;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral1};
  input {
    position: absolute;
    top: calc(50% - 12px);
    left: 0;
    width: 24px;
    height: 24px;
    margin: 0;
    opacity: 0.0001;
    z-index: 2;
    cursor: pointer;
  }
  .checkbox {
    position: relative;
    z-index: 1;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.neutral1};
    border: 2px solid ${({ theme, hasError }) => (hasError ? theme.colors.danger1 : theme.colors.neutral6)};
    border-radius: 24px;
    margin-right: 8px;
  }
  &[disabled] {
    cursor: not-allowed;
    .checkbox {
      background: ${({ theme }) => theme.colors.neutral6};
      color: ${({ theme }) => theme.colors.neutral5};
      border: 2px solid ${({ theme }) => theme.colors.neutral5};
    }
    input {
      cursor: not-allowed;
    }
  }
`

// eslint-disable-next-line react/display-name
const Checkbox = forwardRef(
  (
    { defaultChecked = false, checked, disabled, children, onChange, hasError = false, ...rest }: CheckboxProps & any,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const { active, toggleActive } = useToggleInput({
      defaultActive: defaultChecked,
    })
    useEffect(() => {
      if (checked == null || active === checked) return
      toggleActive(checked)
    }, [checked, active, toggleActive])

    const handleChange = useCallback(
      (e) => {
        const checked = !!e.target.checked

        if (checked === active) return
        toggleActive(checked)
        if (onChange) {
          onChange({
            ...e,
            stopPropagation() {
              e.stopPropagation()
            },
            nativeEvent: e.nativeEvent,
          })
        }
      },
      [active, onChange, toggleActive]
    )

    return (
      <CheckboxWrapper disabled={disabled} hasError={hasError}>
        <input
          type="checkbox"
          {...rest}
          defaultChecked={defaultChecked}
          disabled={disabled}
          ref={ref}
          onChange={handleChange}
        />
        <div className="checkbox">{active && <CheckIcon size={16} />}</div>
        {children}
      </CheckboxWrapper>
    )
  }
)

interface Option {
  label: string
  value: string | number
}

interface CheckboxGroupProps {
  options?: Option[]
  value?: (string | number)[]
  defaultValue?: (string | number)[]
  disabled?: boolean
  onChange?: (value?: (string | number)[]) => void
}

const StyledCheckboxGroup = styled.div`
  & > div {
    &:not(:first-child) {
      margin-top: 12px;
    }
  }
`

export const CheckboxGroup = ({ options = [], value, defaultValue = [], disabled, onChange }: CheckboxGroupProps) => {
  const changeValue = (option: Option, newValue: boolean) => {
    if (!value) value = [...defaultValue]
    if (newValue) {
      if (!value.includes(option.value)) {
        value = [...value, option.value]
        onChange && onChange(value)
      }
    } else {
      value = value.filter((e) => e !== option.value)
      onChange && onChange(value)
    }
  }

  return (
    <StyledCheckboxGroup>
      {options.map((option) => (
        <Checkbox
          key={option.value}
          disabled={disabled}
          defaultChecked={defaultValue?.includes(option.value)}
          onChange={({ target: { checked } }: { target: { checked: boolean } }) => changeValue(option, !!checked)}
        >
          {option.label}
        </Checkbox>
      ))}
    </StyledCheckboxGroup>
  )
}

export default Checkbox
