import { Flex, Box, Text, Avatar } from '@chakra-ui/react'

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Anderson Silva</Text>
        <Text fontSize="small" color="gray.300" >
          andersonnsilva015@gmail.com
        </Text>
      </Box>
      <Avatar size="md" name="Anderson Silva" src="https://github.com/andersonsilva019.png" />
    </Flex>
  )
}