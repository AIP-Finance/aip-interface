import { Svg } from 'theme/base'

const ArrowExpandIcon = ({ size = 24, ...rest }: { size?: number } & any) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.973 13.516C17.5248 13.494 17.9543 13.0287 17.9322 12.4769L17.7419 7.71753C17.721 7.19663 17.3035 6.77913 16.7826 6.75829L12.0232 6.56789C11.4714 6.54581 11.0061 6.97527 10.9841 7.52712C10.962 8.07896 11.3915 8.54421 11.9433 8.56629L14.4206 8.6654L7.55028 15.5357C7.15976 15.9262 7.15976 16.5594 7.55028 16.9499C7.94081 17.3404 8.57397 17.3404 8.96449 16.9499L15.8347 10.0796L15.9338 12.5568C15.9559 13.1086 16.4211 13.5381 16.973 13.516Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default ArrowExpandIcon
