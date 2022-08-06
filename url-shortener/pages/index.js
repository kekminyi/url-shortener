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
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const toast = useToast();

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shortenedUrl)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "We've copied the link to your clipboard.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Link copied failed!",
          description:
            "Link was not copied to your clipboard, please manually copy it.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post("/api/generateLink", { longUrl })
        .then(function (response) {
          setShortenedUrl(response.data.shortenedUrl);
          setSuccess(true);
        });
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setSuccess(false);
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
        <FormControl isRequired w={"70%"} isInvalid={errorMsg !== ""}>
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
        {errorMsg && <Text p="3%">{errorMsg}</Text>}
        {success === true && (
          <Flex p="3%">
            <Text mt={1.5}>{shortenedUrl}</Text>
            <Spacer></Spacer>
            <Button colorScheme="whatsapp" ml={5} onClick={handleCopyLink}>
              Copy Link
            </Button>
          </Flex>
        )}
      </Center>
    </Flex>
  );
}
