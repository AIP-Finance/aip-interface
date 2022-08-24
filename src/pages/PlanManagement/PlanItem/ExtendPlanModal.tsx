import React, { useCallback, useState } from 'react'
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
import { CHAIN_ID, SubmitStep } from 'utils/constants'
import { formatNumber } from 'utils/formats'

const MIN_ENTER = 1
const MAX_PERIODS = 10000

const ExtendPlanModal = ({
  account,
  isOpen,
  setIsOpen,
  plan,
}: { account: string; isOpen: boolean; plan: PlanData } & any) => {
  const { stableCoin } = useStableCoinManager()
  const { balances } = useBalancesManager()
  const { extend } = usePlanManager(plan.stableCoin?.addresses[CHAIN_ID], plan.token?.addresses[CHAIN_ID])

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
              rules={{ required: true, min: MIN_ENTER, max: MAX_PERIODS }}
              label={'Add Period'}
              required
              control={control}
              name="period"
              hasError={Boolean(errors?.period)}
              block
            />
            {Boolean(errors?.period) && <Type.Small color="warning2">Enter your total period</Type.Small>}
            {errors?.periods?.type?.toString() === 'max' && <Type.Small color="warning2">max {MAX_PERIODS}</Type.Small>}
          </Box>

          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Deposit more:</Type.Body>
            <Type.BodyBold color="primary1">
              {formatNumber(periodValue * plan.tickAmount, 2, 2)} {stableCoin}
            </Type.BodyBold>
          </Flex>

          <Flex mt={3} justifyContent="space-between" width={'100%'} alignItems="center">
            <Type.Body>Your balance:</Type.Body>
            <Type.BodyBold color="primary1">
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
            disabled={submitting}
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
