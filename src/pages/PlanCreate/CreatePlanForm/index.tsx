import React, { useCallback, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import Divider from 'components/Divider'
import { CornerIcon } from 'components/Icon'
import { Button } from 'theme/Buttons'
import NumberInputField from 'theme/InputField/NumberInputField'
import RadioGroup, { RadioOptionType } from 'theme/RadioGroup'
import { Box, Flex, Type } from 'theme/base'
import { periodCalculated } from 'utils/parsers'

const MIN_ENTER = 1
const MAX_AMOUNT = 1000000
const MAX_PERIODS = 10000

const options: RadioOptionType[] = [
  {
    label: 'every day',
    value: '1',
  },
  {
    label: '7 days',
    value: '7',
  },
  {
    label: '14 days',
    value: '14',
  },
  {
    label: '30 days',
    value: '30',
  },
]

const CreatePlanForm = ({ token }: { token: TokenData }) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const amountValue = useWatch({ control, name: 'amount' }) ?? 0
  const frequencyValue = useWatch({ control, name: 'frequency' }) ?? 0
  const periodValue = useWatch({ control, name: 'period' }) ?? 0
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = useCallback(
    async (values) => {
      if (submitting) return
      console.log(values)
    },
    [submitting]
  )

  const handleRadioChange = (value: string | number | undefined): void => {
    if (value) {
      setValue('frequency', value.toString())
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        mt={2}
        justifyContent="space-between"
        flexDirection={{ _: 'column', sm: 'row' }}
        sx={{
          position: 'relative',
          border: '1px solid #B1E846',
          maxWidth: '843px',
          margin: 'auto',
          borderRadius: '4px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '4px',
            right: '4px',
          }}
        >
          <CornerIcon />
        </Box>
        <Box
          p={24}
          pb={64}
          sx={{
            borderRight: 'small',
            borderRightColor: 'neutral3',
          }}
          flex={1}
        >
          <Type.H5>Create an Auto-Invest Plan</Type.H5>
          <Flex my={36} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.BodyBold>{`${token.name} (${token.symbol})`}</Type.BodyBold>
          </Flex>
          <Box>
            <NumberInputField
              rules={{ required: true, min: MIN_ENTER, max: MAX_AMOUNT }}
              label="Amount Per Period"
              required
              control={control}
              name="amount"
              hasError={Boolean(errors?.amount)}
              block
              autoFocus
              suffix={<Type.Small color="neutral8">USDT</Type.Small>}
            />
            {Boolean(errors?.amount) && <Type.Small color="warning2">Enter your amount</Type.Small>}
            {errors?.amount?.type?.toString() === 'max' && <Type.Small color="warning2">max {MAX_AMOUNT}</Type.Small>}
          </Box>
          <Box mt="24px">
            <Type.Body color={'neutral8'} mb="8px">
              Frequency Invest
            </Type.Body>
            <RadioGroup
              defaultValue={options[0].value}
              options={options}
              onChange={handleRadioChange}
              optionType="button"
              sx={{
                justifyContent: 'start',
              }}
            />
            {Boolean(errors?.frequency) && <Type.Small color="warning2">Min 1 day and max 30 days</Type.Small>}
          </Box>
          <Box mt="24px">
            <NumberInputField
              rules={{ required: true, min: MIN_ENTER, max: MAX_PERIODS }}
              label={'Total Periods'}
              required
              control={control}
              name="period"
              hasError={Boolean(errors?.period)}
              block
            />
            {Boolean(errors?.period) && <Type.Small color="warning2">Enter your total period</Type.Small>}
            {errors?.period?.type?.toString() === 'max' && <Type.Small color="warning2">max {MAX_PERIODS}</Type.Small>}
          </Box>
        </Box>
        <Box p={24} flex={1}>
          <Type.H5>Summary</Type.H5>
          <Box mt={32}>
            <Type.Body>
              You will invest in <Type.Body color="primary1">{token.symbol}</Type.Body> with{' '}
              <Type.Body color="primary1">{amountValue} USDT</Type.Body> every{' '}
              <Type.Body color="primary1">{frequencyValue > 1 ? `${frequencyValue} days` : ` day`}</Type.Body>. With a
              total of{' '}
              <Type.Body color="primary1">
                {periodValue > 1 ? `${periodValue} periods` : `${periodValue} period`}
              </Type.Body>
              .
            </Type.Body>
          </Box>
          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Start from:</Type.Body>
            <Type.BodyBold color="primary1">{periodCalculated({ period: 0 })}</Type.BodyBold>
          </Flex>
          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>To:</Type.Body>
            <Type.BodyBold color="primary1">{periodCalculated({ period: frequencyValue * periodValue })}</Type.BodyBold>
          </Flex>
          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Total investment:</Type.Body>
            <Type.BodyBold color="primary1">{amountValue * periodValue} USDT</Type.BodyBold>
          </Flex>
          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Your balance:</Type.Body>
            <Type.BodyBold color="primary1">{1000} USDT</Type.BodyBold>
          </Flex>

          <Divider my={3} />

          <Button
            type="submit"
            variant="outlinePrimary"
            size="lg"
            px={4}
            isLoading={submitting}
            block
            disabled={submitting}
          >
            {!submitting && 'Confirm'}
          </Button>
          <Type.Small color="neutral5" mt={3}>
            You can cancel and withdraw all USDT at any time without any fee
          </Type.Small>
        </Box>
      </Flex>
      {/*{resErrors?.length > 0 && (*/}
      {/*  <Box>*/}
      {/*    <ErrorList items={resErrors} />*/}
      {/*  </Box>*/}
      {/*)}*/}
    </form>
  )
}

export default CreatePlanForm
