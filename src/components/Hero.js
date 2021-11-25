import { Flex, Heading } from '@chakra-ui/react';

export const Hero = ({ title }) => (
  <Flex justifyContent="center" alignItems="center" height="60px">
    <Heading
      fontSize="32px"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
    >
      {title}
    </Heading>
  </Flex>
);

Hero.defaultProps = {
  title: 'Movies database',
};
