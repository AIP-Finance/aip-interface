import React from 'react'

import { PlanData } from 'entities/plan'
import { Box, Flex, Type } from 'theme/base'
import { formatDate } from 'utils/formats'
import { durationCalculated } from 'utils/parsers'

const bg = 'neutral8'
const format = 'YYYY-MM-DD'

const Progress = ({ plan, max, value }: { plan: PlanData; max: number; value: number }) => {
  return (
    <Box mt={24}>
      <Flex justifyContent="space-between" alignItems="center">
        <Type.Caption>
          {plan.startedTime
            ? formatDate(plan.startedTime, format)
            : durationCalculated({ timestamp: plan.createdTime, period: 0, format })}
        </Type.Caption>
        <Type.Caption>
          {plan.startedTime
            ? formatDate(plan.endedTime, format)
            : durationCalculated({
                timestamp: plan.createdTime,
                period: plan.frequency * plan.ticks,
                format,
              })}
        </Type.Caption>
      </Flex>
      <Box
        mt={24}
        sx={{
          height: '2px',
          bg,
          position: 'relative',
        }}
      >
        <Box
          sx={{
            height: '12px',
            width: '12px',
            bg: value > 0 ? 'primary1' : bg,
            position: 'absolute',
            top: '-5px',
            left: '-3px',
            bottom: 0,
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            height: '2px',
            bg: 'primary1',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${(value * 100) / max}%`,
          }}
        />
        <Box
          sx={{
            height: '12px',
            width: '12px',
            bg: value == max && value != 0 ? 'primary1' : bg,
            position: 'absolute',
            top: '-5px',
            right: '-3px',
            bottom: 0,
            borderRadius: '50%',
          }}
        />
      </Box>
    </Box>
  )
}

export default Progress
