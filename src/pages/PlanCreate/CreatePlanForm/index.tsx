import React, { useCallback, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import Divider from 'components/Divider'
import { CornerIcon } from 'components/Icon'
import useBalancesManager from 'hooks/store/state/useBalancesManager'
import useStableCoinManager from 'hooks/store/state/useStableCoinManager'
import usePlanManager from 'hooks/web3/usePlanManager'
import useERC20Approval from 'hooks/web3/useTokenApproval'
import { Button } from 'theme/Buttons'
import NumberInputField from 'theme/InputField/NumberInputField'
import RadioGroup, { RadioOptionType } from 'theme/RadioGroup'
import { Box, Flex, Type } from 'theme/base'
import { SubmitStep } from 'utils/constants'
import { formatNumber } from 'utils/formats'
import { durationCalculated } from 'utils/parsers'
import { getStableCoinAddress } from 'utils/tokens'

import CreateSuccessModal from './CreateSuccessModal'

const MIN_AMOUNT = 10
const MAX_AMOUNT = 1000
const MIN_PERIODS = 2
const MAX_PERIODS = 100

const options: RadioOptionType[] = [
  {
    label: 'every day',
    value: 1,
  },
  {
    label: '7 days',
    value: 7,
  },
  {
    label: '14 days',
    value: 14,
  },
  {
    label: '30 days',
    value: 30,
  },
]

const CreatePlanForm = ({
  account,
  token,
  tokenAddress,
}: {
  account: string
  token: TokenData
  tokenAddress: string
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      amount: undefined,
      frequency: 1,
      period: undefined,
    },
  })
  const { stableCoin } = useStableCoinManager()
  const { balances } = useBalancesManager()
  const [submitStep, setSubmitStep] = useState<SubmitStep>(SubmitStep.INPUTTING)
  const amountValue = useWatch({ control, name: 'amount' }) ?? 0
  const frequencyValue = useWatch({ control, name: 'frequency' }) ?? 0
  const periodValue = useWatch({ control, name: 'period' }) ?? 0
  const [submitting, setSubmitting] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const stableCoinAddress = useMemo(() => getStableCoinAddress(stableCoin) ?? '', [stableCoin])
  const { approveToken, isTokenAllowanceEnough } = useERC20Approval(
    account,
    stableCoinAddress,
    process.env.REACT_APP_PLAN_MANAGER
  )
  const { subscribe } = usePlanManager(stableCoinAddress, tokenAddress)

  const onSubmit = useCallback(
    async (values) => {
      if (submitting) return
      setSubmitting(true)
      const totalAmount = values.amount * values.period
      const isEnough = await isTokenAllowanceEnough(totalAmount)
      if (isEnough) {
        setSubmitStep(SubmitStep.SUBSCRIBING)
      } else {
        setSubmitStep(SubmitStep.APPROVING)
        const success = await approveToken(totalAmount)
        if (!success) {
          setSubmitStep(SubmitStep.INPUTTING)
          setSubmitting(false)
          return
        }
        setSubmitStep(SubmitStep.SUBSCRIBING)
      }
      const success = await subscribe(values)
      // TODO Handle success
      console.log('success', success)
      setSubmitStep(SubmitStep.INPUTTING)
      setIsSuccessModalOpen(true)
      setSubmitting(false)
    },
    [approveToken, isTokenAllowanceEnough, subscribe, submitting]
  )

  const handleRadioChange = (value: string | number | undefined): void => {
    if (value) {
      setValue('frequency', Number(value))
    }
  }

  return (
    <>
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
                  // <Flex justifyContent="space-between" width={'100%'} alignItems="center" mb="8px">
                  //   <Type.Body color={'neutral8'}>Amount Per Period</Type.Body>
                  //   <Type.Small color={'primary1'}>Max</Type.Small>
                  // </Flex>
                  <Type.Body color={'neutral8'} mb={2}>
                    Amount Per Period
                  </Type.Body>
                }
                required
                control={control}
                name="amount"
                hasError={!!errors?.amount}
                block
                autoFocus
                suffix={<Type.Small color="neutral8">{stableCoin}</Type.Small>}
              />
              {!!errors?.amount && <Type.Small color="warning2">{errors?.amount.message}</Type.Small>}
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
                You will invest in <Type.Body color="primary1">{token.symbol}</Type.Body> with{' '}
                <Type.Body color="primary1">
                  {amountValue} {stableCoin}
                </Type.Body>{' '}
                every <Type.Body color="primary1">{frequencyValue > 1 ? `${frequencyValue} days` : ` day`}</Type.Body>.
                With a total of{' '}
                <Type.Body color="primary1">
                  {periodValue > 1 ? `${periodValue} periods` : `${periodValue} period`}
                </Type.Body>
                .
              </Type.Body>
            </Box>
            <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
              <Type.Body>Start from:</Type.Body>
              <Type.BodyBold color="primary1">{durationCalculated({ period: 0 })}</Type.BodyBold>
            </Flex>
            <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
              <Type.Body>To:</Type.Body>
              <Type.BodyBold color="primary1">
                {durationCalculated({ period: frequencyValue * periodValue })}
              </Type.BodyBold>
            </Flex>
            <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
              <Type.Body>Total investment:</Type.Body>
              <Type.BodyBold color="primary1">
                {formatNumber(amountValue * periodValue, 2, 2)} {stableCoin}
              </Type.BodyBold>
            </Flex>
            <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
              <Type.Body>Your balance:</Type.Body>
              <Type.BodyBold color="primary1">
                {formatNumber(balances[stableCoin], 2, 2)} {stableCoin}
              </Type.BodyBold>
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
              {submitStep === SubmitStep.INPUTTING && 'Submit'}
              {submitStep === SubmitStep.APPROVING && `Approving ${stableCoin}...`}
              {submitStep === SubmitStep.SUBSCRIBING && 'Subscribing...'}
            </Button>
            <Type.Small color="neutral5" mt={3}>
              You can cancel and withdraw all {stableCoin} at any time without any fee
            </Type.Small>
          </Box>
        </Flex>
      </form>
      {isSuccessModalOpen && <CreateSuccessModal isOpen={isSuccessModalOpen} setIsOpen={setIsSuccessModalOpen} />}
    </>
  )
}

export default CreatePlanForm
