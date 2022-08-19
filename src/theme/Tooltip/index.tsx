import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import ReactTooltip from 'react-tooltip'

// Create root level element for react-tooltips
const domNode = document.createElement('div')
document.body.appendChild(domNode)
domNode.style.zIndex = '10001'
domNode.style.position = 'fixed'

// Wrapper component to portal react-tooltips
function BodyPortal({ children }: { children: ReactNode }) {
  return ReactDOM.createPortal(children, domNode)
}

// Custom tooltip wrapper to ensure all tooltips get rendered into the portal
function Tooltip(props: any) {
  return (
    <BodyPortal>
      <ReactTooltip type="dark" effect="solid" {...props} />
    </BodyPortal>
  )
}

export default Tooltip
