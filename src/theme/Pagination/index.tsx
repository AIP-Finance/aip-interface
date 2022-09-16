import { useCallback } from 'react'
import { FiChevronLeft, FiChevronRight, FiMoreHorizontal } from 'react-icons/fi'
import styled from 'styled-components/macro'

import { DOTS, usePagination } from 'hooks/helpers/usePagination'
import { Button } from 'theme/Buttons'
import ButtonWithIcon from 'theme/Buttons/ButtonWithIcon'
import IconButton from 'theme/Buttons/IconButton'
import { Flex } from 'theme/base'
import { BoxProps } from 'theme/types'

export type PaginationProps = {
  currentPage: number
  totalPage: number
  onPageChange: (page: number) => void
  siblingCount?: number
  hideArrows?: boolean
}

const DottedButton = styled(ButtonWithIcon)`
  padding: 4px;
  border: none;
  width: 28px;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: auto;
  pointer-events: none;

  background-color: transparent;

  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: transparent;
    & > div:first-child svg {
      opacity: 0;
    }
    & > :not(:first-child) {
      opacity: 1;
    }
  }
  & > :not(:first-child) {
    transition: all 0.2s ease-in-out;

    opacity: 0;
    position: absolute;
    top: 10px;
    right: 12px;
  }
`

const Pagination = ({
  currentPage,
  totalPage,
  onPageChange,
  siblingCount = 1 /*, hideArrows = false */,
  ...props
}: PaginationProps & BoxProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalPage,
    siblingCount,
  })

  const handleOnClick = useCallback(
    (page: number) => {
      onPageChange(page)
    },
    [onPageChange]
  )

  const onNext = useCallback(() => {
    onPageChange(currentPage + 1)
  }, [currentPage, onPageChange])

  const onPrevious = useCallback(() => {
    onPageChange(currentPage - 1)
  }, [currentPage, onPageChange])

  const lastPage = paginationRange[paginationRange.length - 1]
  return (
    <Flex {...props}>
      <IconButton
        icon={<FiChevronLeft />}
        mr={1}
        borderRadius="md"
        size={28}
        sx={{
          px: 1,
          py: '4px',
          borderRadius: '4px',
          border: 'small',
          borderColor: 'neutral4',
          bg: 'neutral1',
          color: 'neutral4',
        }}
        disabled={currentPage === 1}
        onClick={onPrevious}
      />

      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return <DottedButton key={`${DOTS}${i + 1}`} icon={<FiMoreHorizontal size={14} />} />
        }
        return (
          <Button
            key={pageNumber}
            onClick={() => handleOnClick(Number(pageNumber))}
            size="xs"
            mr={2}
            px={1}
            sx={{
              border: 'small',
              borderColor: pageNumber === currentPage ? 'primary1' : 'neutral4',
              bg: 'neutral1',
              borderRadius: '4px',
              minWidth: 28,
              color: pageNumber === currentPage ? 'primary1' : 'neutral5',
            }}
          >
            {pageNumber}
          </Button>
        )
      })}

      <IconButton
        icon={<FiChevronRight />}
        borderRadius="md"
        size={28}
        sx={{
          px: 1,
          py: '4px',
          borderRadius: '4px',
          border: 'small',
          borderColor: 'neutral4',
          bg: 'neutral1',
          color: 'neutral4',
        }}
        disabled={!lastPage || currentPage === lastPage}
        onClick={onNext}
      />
    </Flex>
  )
}

export default Pagination
