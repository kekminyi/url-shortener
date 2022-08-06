import {
  Heading,
  Button,
  Center,
  Flex,
  InputGroup,
  FormControl,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const handleSubmit = async () => {
    console.log(url);
    try {
      await axios.post("/api/generateLink", { url }).then(function (response) {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [url, setUrl] = useState("");
  const handleChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <Flex flexDir={"column"}>
      <Head>
        <title>URL Shortener</title>
      </Head>
      <Center>
        <Heading p="3%">URL Shortener</Heading>
      </Center>
      <Center>
        <FormControl isRequired>
          <InputGroup width="60rem">
            <Input
              size="lg"
              placeholder="What is the URL that is being shortened today?"
              value={url}
              // type="url"
              onChange={handleChange}
            ></Input>
            <InputRightElement width="6.5rem">
              <Button
                h="2rem"
                size="sm"
                colorScheme="blue"
                mt="0.5em"
                onClick={handleSubmit}
              >
                Shorten!
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Center>
    </Flex>
  );
}
