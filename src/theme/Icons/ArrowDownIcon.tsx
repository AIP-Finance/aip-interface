import { Svg } from 'theme/base'

const ArrowDownIcon = ({ size = 24, ...rest }: { size?: number } & any) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4902 9.394C10.7399 9.66455 10.7231 10.0863 10.4525 10.3361L8.11921 12.4899C7.86383 12.7256 7.47021 12.7256 7.21483 12.4899L4.88147 10.3361C4.61092 10.0863 4.59405 9.66456 4.84378 9.39401C5.09352 9.12346 5.51529 9.10659 5.78584 9.35632L7.00035 10.4774L7.00035 4.00004C7.00035 3.63185 7.29882 3.33337 7.66701 3.33337C8.0352 3.33337 8.33368 3.63185 8.33368 4.00004L8.33368 10.4774L9.54813 9.35633C9.81868 9.10659 10.2405 9.12346 10.4902 9.394Z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default ArrowDownIcon
