import React from 'react'

const TelegramIcon = ({ size = 24, ...props }: any) => {
  return (
    <svg {...props} width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM14.0133 21.8433L14.278 18.1207L21.096 11.9987C21.3927 11.736 21.032 11.5907 20.6353 11.8533L12.2067 17.1273L8.578 15.9987C7.78867 15.754 7.774 15.214 8.74267 14.838L22.936 9.40399C23.5933 9.15933 24.168 9.54933 23.954 10.5467L23.9533 10.5473L21.5387 21.862C21.3567 22.6607 20.8813 22.8587 20.2067 22.4827L16.528 19.7887L14.7527 21.4853C14.556 21.6807 14.392 21.8433 14.0133 21.8433Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default TelegramIcon
