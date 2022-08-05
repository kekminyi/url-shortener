import {
  Heading,
  Button,
  Center,
  Flex,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";

import React from "react";
export default function Home() {
  return (
    <Flex flexDir={"column"}>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <Center>
        <Heading p="3%">URL Shortener</Heading>
      </Center>
      <Center>
        <InputGroup w="60%">
          <Input
            size="lg"
            placeholder="What is the URL that is being shortened today?"
          ></Input>
          <InputRightElement width="6.5rem">
            <Button h="2rem" size="sm" colorScheme="blue" mt="0.5em">
              Shorten!
            </Button>
          </InputRightElement>
        </InputGroup>
      </Center>
    </Flex>
  );
}
