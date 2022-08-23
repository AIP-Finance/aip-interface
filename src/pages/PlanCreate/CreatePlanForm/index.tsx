import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import Divider from 'components/Divider'
import { CornerIcon } from 'components/Icon'
import usePlanManager from 'hooks/web3/usePlanManager'
import useERC20Approval from 'hooks/web3/useTokenApproval'
import { Button } from 'theme/Buttons'
import NumberInputField from 'theme/InputField/NumberInputField'
import { Box, Flex, Type } from 'theme/base'
import { periodCalculated } from 'utils/parsers'
import { getStableCoinAddress, getTokenInfo } from 'utils/tokens'

const MIN_FREQUENCY = 1
const MAX_FREQUENCY = 30
const MIN_AMOUNT = 10
const MAX_AMOUNT = 1000
const MIN_PERIODS = 2
const MAX_PERIODS = 100

enum SubmitStep {
  INPUTING,
  APPROVING,
  SUBCRIBING,
}

const token = getTokenInfo('0xE06c2497422b6428350E2E7da24d3FE816166983')
const usdtAddress = getStableCoinAddress('USDT') ?? ''

const CreatePlanForm = ({ account }: { account: string }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  const [submitStep, setSubmitStep] = useState<SubmitStep>(SubmitStep.INPUTING)
  const amountValue = useWatch({ control, name: 'amount' }) ?? 0
  const frequencyValue = useWatch({ control, name: 'frequency' }) ?? 0
  const periodValue = useWatch({ control, name: 'period' }) ?? 0
  const [submitting, setSubmitting] = useState(false)
  const { approveToken, isTokenAllowanceEnough } = useERC20Approval(
    account,
    usdtAddress,
    process.env.REACT_APP_PLAN_MANAGER
  )
  const { subcribe } = usePlanManager(usdtAddress, '0xE06c2497422b6428350E2E7da24d3FE816166983')

  const onSubmit = useCallback(
    async (values) => {
      if (submitting) return
      setSubmitting(true)
      const totalAmount = values.amount * values.period
      const isEnough = await isTokenAllowanceEnough(totalAmount)
      if (isEnough) {
        setSubmitStep(SubmitStep.SUBCRIBING)
      } else {
        setSubmitStep(SubmitStep.APPROVING)
        const success = await approveToken(totalAmount)
        if (!success) {
          setSubmitStep(SubmitStep.INPUTING)
          setSubmitting(false)
          return
        }
        setSubmitStep(SubmitStep.SUBCRIBING)
      }
      await subcribe(values)
      setSubmitting(false)
    },
    [approveToken, isTokenAllowanceEnough, subcribe, submitting]
  )

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
            <Type.BodyBold>
              {token?.name} ({token?.symbol})
            </Type.BodyBold>
          </Flex>
          <Box>
            <NumberInputField
              rules={{
                required: { value: true, message: 'Amount is required' },
                min: { value: MIN_AMOUNT, message: `Minimum amount is ${MIN_AMOUNT}` },
                max: { value: MAX_AMOUNT, message: `Maximum amount is ${MAX_AMOUNT}` },
              }}
              label={
                <Flex justifyContent="space-between" width={'100%'} alignItems="center" mb="8px">
                  <Type.Body color={'neutral8'}>Amount Per Period</Type.Body>
                  <Type.Small color={'primary1'}>Max</Type.Small>
                </Flex>
              }
              required
              control={control}
              name="amount"
              hasError={!!errors?.amount}
              block
              autoFocus
              suffix={<Type.Small color="neutral8">USDT</Type.Small>}
            />
            {!!errors?.amount && <Type.Small color="warning2">{errors?.amount.message}</Type.Small>}
          </Box>
          <Box mt="24px">
            <NumberInputField
              rules={{ required: true, min: MIN_FREQUENCY, max: MAX_FREQUENCY }}
              label={'Frequency Invest'}
              required
              control={control}
              name="frequency"
              hasError={!!errors?.frequency}
              block
              suffix={<Type.Small color="neutral8">Day</Type.Small>}
            />
            {!!errors?.frequency && (
              <Type.Small color="warning2">
                From {MIN_FREQUENCY} day to {MAX_FREQUENCY} days
              </Type.Small>
            )}
          </Box>
          <Box mt="24px">
            <NumberInputField
              rules={{
                required: true,
                min: { value: MIN_PERIODS, message: `Minimum periods is ${MIN_PERIODS}` },
                max: { value: MAX_PERIODS, message: `Maximum periods is ${MAX_PERIODS}` },
              }}
              label={'Total Periods'}
              required
              control={control}
              name="period"
              hasError={Boolean(errors?.period)}
              block
            />
            {!!errors?.period && <Type.Small color="warning2">{errors?.period.message}</Type.Small>}
          </Box>
        </Box>
        <Box p={24} flex={1}>
          <Type.H5>Summary</Type.H5>
          <Box mt={32}>
            <Type.Body>
              You will invest in <Type.Body color="primary1">ETH</Type.Body> with{' '}
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
            {submitStep === SubmitStep.INPUTING && 'Submit'}
            {submitStep === SubmitStep.APPROVING && 'Approving USDT...'}
            {submitStep === SubmitStep.SUBCRIBING && 'Subcribing...'}
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
