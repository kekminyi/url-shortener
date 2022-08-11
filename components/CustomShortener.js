import {
  Button,
  Center,
  Flex,
  Text,
  InputGroup,
  FormControl,
  Link,
  Box,
  useToast,
  Spacer,
  Textarea,
  Input,
} from "@chakra-ui/react";

import React, { useState } from "react";
import axios from "axios";

export default function StandardShortener() {
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [customShortLink, setCustomShortLink] = useState("");

  const toast = useToast();

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shortenedUrl)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "We've copied the link to your clipboard.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "Link copied failed!",
          description:
            "Link was not copied to your clipboard, please manually copy it.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post("/api/generateCustomLink", { longUrl, customShortLink })
        .then(function (response) {
          setShortenedUrl(response.data.shortenedUrl);
          setSuccess(true);
          setErrorMsg("");
          toast({
            title: "Link shortened!",
            description: "We successfully shortened the link for you!",
            status: "success",
            duration: 6000,
            isClosable: true,
          });
        });
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setSuccess(false);
      console.error(error);
    }
  };

  const handleLongUrlChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleCustomShortLinkChange = (event) => {
    setCustomShortLink(event.target.value);
  };

  return (
    <Box p={"2%"}>
      <Center>
        <FormControl isRequired isInvalid={errorMsg !== "" && !success}>
          <InputGroup>
            <Textarea
              size="lg"
              fontSize={["xs", "sm", "md", "lg", "lg"]}
              placeholder="What is the URL that is being shortened today?"
              value={longUrl}
              bg={"white"}
              onChange={handleLongUrlChange}
            ></Textarea>
          </InputGroup>
          <Input
            placeholder="Custom Short Link"
            fontSize={["xs", "sm", "md", "lg", "lg"]}
            mt={5}
            bg={"white"}
            onChange={handleCustomShortLinkChange}
          />
          <Button
            size="md"
            w="100%"
            colorScheme="blackAlpha"
            mt="1em"
            onClick={handleSubmit}
          >
            Shorten!
          </Button>
        </FormControl>
      </Center>
      <Center>
        {errorMsg && (
          <Text p="3%" fontSize={["xs", "xs", "xs", "md", "md"]}>
            {errorMsg}
          </Text>
        )}
        {success === true && (
          <Flex
            p={["15%", "5%", "3%", "3%", "3%"]}
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Box
              borderRadius="lg"
              px="3"
              py="2"
              display="flex"
              flexDirection="row"
              bg={"gray.400"}
            >
              <Link
                href={shortenedUrl}
                isExternal
                fontSize={["xs", "xs", "md", "lg", "lg"]}
                colorScheme={"white"}
              >
                {shortenedUrl}
              </Link>
            </Box>
            <Spacer></Spacer>
            <Button
              colorScheme="blackAlpha"
              ml={[0, 0, 5, 5, 5]}
              onClick={handleCopyLink}
              mt={[2, 2, 0, 0, 0]}
              size={["sm", "sm", "sm", "md", "md"]}
            >
              Copy Link
            </Button>
          </Flex>
        )}
      </Center>
    </Box>
  );
}
