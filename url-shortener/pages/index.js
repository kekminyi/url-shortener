import {
  Heading,
  Button,
  Center,
  Flex,
  Text,
  InputGroup,
  FormControl,
  InputRightElement,
  useToast,
  Input,
  Spacer,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [error, setError] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shortenedUrl);
  };

  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await axios
        .post("/api/generateLink", { longUrl })
        .then(function (response) {
          setShortenedUrl(response.data.shortenedUrl);
          console.log(response.data.shortenedUrl);
          setError(false);
        });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setLongUrl(event.target.value);
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
        <FormControl isRequired w={"70%"} isInvalid={error}>
          <InputGroup>
            <Input
              size="lg"
              placeholder="What is the URL that is being shortened today?"
              value={longUrl}
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
      <Center>
        {error ? (
          <Text p="3%">Invalid URL. Please input a correct URL.</Text>
        ) : (
          <Flex p="3%">
            <Text mt={1.5}>{shortenedUrl}</Text>
            <Spacer></Spacer>
            <Button
              colorScheme="whatsapp"
              ml={5}
              onClick={() => {
                handleCopyLink;
                toast({
                  title: "Link copied!",
                  description: "We've copied the link to your clipboard.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              Copy Link
            </Button>
          </Flex>
        )}
      </Center>
    </Flex>
  );
}
