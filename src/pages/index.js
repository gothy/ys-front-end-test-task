import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import {
  Text,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  useDisclosure,
  HStack,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { Hero } from '../components/Hero';
import MovieCard from '../components/MovieCard';
import MovieModal from '../components/MovieModal';

const Index = () => {
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const router = useRouter();
  const { search = '', year = '' } = router.query;
  const [selectedItem, setSelectedItem] = useState(null);
  const { status, error, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ['moviesSearch', search, year],
      async ({ pageParam = 1 }) => {
        const resp = await fetch(
          `https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_OMDB_API_KEY}&s=${search}&page=${pageParam}&y=${year}`
        ).then((res) => res.json());

        if (resp.Response === 'True') {
          return resp;
        } else {
          throw new Error('Incorrect request');
        }
      },
      {
        getNextPageParam: (lastPage, pages) => {
          return (lastPage?.Search?.length || 0) < 10
            ? undefined
            : pages.length + 1;
        },
        enabled: search.length > 0 && (year.length > 3 || year.length === 0),
      }
    );
  const { ref, inView, entry } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const movies = useMemo(() => {
    let result = [];
    data?.pages?.forEach((group, idx) => {
      group.Search.forEach((movie) => result.push(movie));
    });

    return result;
  }, [data]);

  return (
    <div>
      <Hero />
      <Box padding={4} w="100%" maxW="900px" mx="auto">
        <HStack spacing={4}>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input
              type="title"
              value={router.query?.search || ''}
              onChange={(e) => {
                router.replace(`/?search=${e.target.value}&year=${year}`);
              }}
            />
            <FormHelperText>Search by movie or series title.</FormHelperText>
          </FormControl>
          <FormControl id="year" maxW={120}>
            <FormLabel>Year</FormLabel>
            <Input
              type="year"
              value={router.query?.year || ''}
              onChange={(e) => {
                router.replace(`/?search=${search}&year=${e.target.value}`);
              }}
            />
            <FormHelperText>Filter by year.</FormHelperText>
          </FormControl>
        </HStack>

        {status === 'loading' && <Text mt={2}>Loading results...</Text>}

        {status === 'error' && <Text mt={2}>{error.message}</Text>}
      </Box>

      {data && (
        <div>
          <Box padding={4} w="100%" maxW="900px" mx="auto">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry>
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    setSelectedItem={setSelectedItem}
                    onModalOpen={onModalOpen}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>

            {isFetchingNextPage && (
              <Center p={5}>
                <Spinner />
              </Center>
            )}
          </Box>

          <div ref={ref}>
            <h2>&nbsp;</h2>
          </div>
        </div>
      )}

      {selectedItem && (
        <MovieModal
          isOpen={isModalOpen}
          onClose={onModalClose}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
};

export default Index;
