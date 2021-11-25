import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Center,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

const MovieModal = ({ isOpen, onClose, selectedItem }) => {
  const { isLoading, data, error } = useQuery(
    ['movieDetails', selectedItem.imdbID],
    async () => {
      const resp = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&i=${selectedItem.imdbID}`
      ).then((res) => res.json());

      console.log('resp', resp);

      if (resp.Response === 'True') {
        return resp;
      } else {
        throw new Error('Missing movie info');
      }
    }
  );

  console.log({ isLoading, data, error });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pr={10}>{selectedItem.Title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading && (
            <Center>
              <Spinner />
            </Center>
          )}

          {error && <Text>{error.message}</Text>}

          {data && (
            <Table>
              <Tbody>
                <Tr>
                  <Td>Year(s)</Td>
                  <Td>{data.Year}</Td>
                </Tr>
                <Tr>
                  <Td>Rated</Td>
                  <Td>{data.Rated}</Td>
                </Tr>
                <Tr>
                  <Td>Genre</Td>
                  <Td>{data.Genre}</Td>
                </Tr>
                <Tr>
                  <Td>Plot</Td>
                  <Td>{data.Plot}</Td>
                </Tr>
                <Tr>
                  <Td>Actors</Td>
                  <Td>{data.Actors}</Td>
                </Tr>
                <Tr>
                  <Td>IMDB Rating</Td>
                  <Td>{data.imdbRating}</Td>
                </Tr>
              </Tbody>
            </Table>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MovieModal;
