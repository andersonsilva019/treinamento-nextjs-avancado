import { Button } from '@chakra-ui/react'

type PaginationIconProps = {
  numberOfPage: number
  isCurrent?: boolean
}

export function PaginationItem({ isCurrent = false, numberOfPage }: PaginationIconProps) {

  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="4"
        colorScheme="pink"
        disabled
        _disabled={{
          bg: 'pink.500',
          cursor: 'default'
        }}
      >
        {numberOfPage}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      _hover={{
        bg: 'gray.500'
      }}
    >
      {numberOfPage}
    </Button>
  )

}