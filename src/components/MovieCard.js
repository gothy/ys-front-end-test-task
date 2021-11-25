import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

const MovieCard = ({ movie, setSelectedItem, onModalOpen }) => {
  const [showHover, setShowHover] = useState(false);

  return (
    <Box
      key={movie.imdbID}
      w="100%"
      borderRadius="xl"
      p={1}
      display="block"
      cursor="pointer"
      position="relative"
      onMouseOver={() => setShowHover(true)}
      onMouseOut={() => setShowHover(false)}
    >
      <Image
        w="100%"
        minH={200}
        borderRadius="xl"
        src={movie.Poster}
        alt={movie.Title}
        objectFit="cover"
        fallbackSrc="https://via.placeholder.com/200"
        onClick={() => {
          setSelectedItem(movie);
          onModalOpen();
        }}
      />

      <Box
        zIndex={2}
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        px={3}
        pt={2}
        pb={4}
        transition="all ease 0.1s"
        visibility={showHover ? 'visible' : 'hidden'}
        bg={showHover ? 'rgba(255, 255, 255, 0.85)' : 'transparent'}
      >
        <Text fontSize="lg" fontWeight="500">
          {movie.Title}
        </Text>
      </Box>
    </Box>
  );
};

export default MovieCard;
