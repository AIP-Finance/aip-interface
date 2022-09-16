import React, { useCallback, useMemo, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import Divider from 'components/Divider'
import { PlanData } from 'entities/plan'
import useBalancesManager from 'hooks/store/state/useBalancesManager'
import useStableCoinManager from 'hooks/store/state/useStableCoinManager'
import usePlanManager from 'hooks/web3/usePlanManager'
import useERC20Approval from 'hooks/web3/useTokenApproval'
import { Button } from 'theme/Buttons'
import NumberInputField from 'theme/InputField/NumberInputField'
import Modal from 'theme/Modal'
import { Box, Flex, Type } from 'theme/base'
import { CHAIN_ID, INPUT_CONFIG, SubmitStep } from 'utils/constants'
import { formatNumber } from 'utils/formats'

const ExtendPlanModal = ({
  account,
  isOpen,
  setIsOpen,
  plan,
}: {
  account: string
  isOpen: boolean
  setIsOpen: any
  plan: PlanData
}) => {
  const { stableCoin } = useStableCoinManager()
  const { balances } = useBalancesManager()
  const { extend } = usePlanManager(plan.stableCoin?.addresses[CHAIN_ID] ?? '', plan.token?.addresses[CHAIN_ID] ?? '')

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  const [submitStep, setSubmitStep] = useState<SubmitStep>(SubmitStep.INPUTTING)
  const [submitting, setSubmitting] = useState(false)
  const periodValue = useWatch({ control, name: 'period' }) ?? 0
  const { approveToken, isTokenAllowanceEnough } = useERC20Approval(
    account,
    plan.stableCoin?.addresses[CHAIN_ID],
    process.env.REACT_APP_PLAN_MANAGER
  )
  const validBalance = useMemo(
    () => balances[stableCoin] > 0 && balances[stableCoin] >= periodValue * plan.tickAmount,
    [balances, stableCoin, plan.tickAmount, periodValue]
  )

  const onSubmit = useCallback(
    async (values) => {
      if (submitting) return
      setSubmitting(true)

      const totalAmount = plan.tickAmount * values.period
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

      const success = await extend(plan.index, values.period)
      // TODO Handle success
      console.log('success', success)
      if (success) {
        window.location.reload()
      }
      setSubmitStep(SubmitStep.INPUTTING)
      setSubmitting(false)
    },
    [submitting, plan, extend, isTokenAllowanceEnough, approveToken]
  )

  return (
    <Modal
      title="Extend Subscription"
      isOpen={isOpen}
      width="448px"
      maxWidth="448px"
      hasClose
      onDismiss={() => setIsOpen(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Box>
            <NumberInputField
              rules={{
                required: { value: true, message: 'Enter your period of addition' },
                min: { value: INPUT_CONFIG.MIN_PERIODS, message: `Minimum periods is ${INPUT_CONFIG.MIN_PERIODS}` },
                max: { value: INPUT_CONFIG.MAX_PERIODS, message: `Maximum periods is ${INPUT_CONFIG.MAX_PERIODS}` },
              }}
              isAllowed={(values) => values.value.length <= INPUT_CONFIG.MAX_INPUT_LENGTH}
              label={'Add Period'}
              required
              isInteger
              control={control}
              name="period"
              hasError={Boolean(errors?.period)}
              block
            />
            {!!errors?.period && <Type.Small color="warning2">{errors?.period.message}</Type.Small>}
          </Box>

          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Current amount per period:</Type.Body>
            <Type.BodyBold>
              {formatNumber(plan.tickAmount, 2, 2)} {plan.stableCoin?.symbol}{' '}
            </Type.BodyBold>
          </Flex>
          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Current periods:</Type.Body>
            <Type.BodyBold>
              {plan.ticks} {periodValue > 0 && <Type.BodyBold color="primary1">{`+ ${periodValue}`}</Type.BodyBold>}
            </Type.BodyBold>
          </Flex>
          <Divider my={3} />

          <Flex justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Deposit more:</Type.Body>
            <Type.BodyBold color="primary1">
              {formatNumber(periodValue * plan.tickAmount, 2, 2)} {stableCoin}
            </Type.BodyBold>
          </Flex>

          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Your balance:</Type.Body>
            <Type.BodyBold color={validBalance ? 'primary1' : 'warning2'}>
              {formatNumber(balances[stableCoin], 2, 2)} {stableCoin}
            </Type.BodyBold>
          </Flex>

          <Divider mt={3} />
          <Button
            type="submit"
            variant="outlinePrimary"
            size="lg"
            px={4}
            block
            mr={3}
            isLoading={submitting}
            disabled={submitting || !validBalance}
          >
            {submitStep === SubmitStep.INPUTTING && 'Submit'}
            {submitStep === SubmitStep.APPROVING && `Approving ${stableCoin}...`}
            {submitStep === SubmitStep.SUBSCRIBING && 'Subscribing...'}
          </Button>

          <Type.Small color="neutral5" mt={3}>
            You can cancel and withdraw all USDT at any time without any fee
          </Type.Small>
        </Box>
      </form>
    </Modal>
  )
}

export default ExtendPlanModal
