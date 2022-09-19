import React, { ReactNode } from 'react'

import { Type } from 'theme/base'

const ToastBody = ({ title, message }: { title: string; message: ReactNode }) => {
  return (
    <div>
      <Type.BodyBold color="neutral8" display="block">
        {title}
      </Type.BodyBold>
      <Type.Caption color="neutral4" sx={{ wordBreak: 'break-word' }}>
        {message}
      </Type.Caption>
    </div>
  )
}

export default ToastBody
