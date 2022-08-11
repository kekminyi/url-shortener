import {
  Heading,
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
              fontSize="l"
              placeholder="What is the URL that is being shortened today?"
              value={longUrl}
              bg={"white"}
              onChange={handleLongUrlChange}
            ></Textarea>
          </InputGroup>
          <Input
            placeholder="Custom Short Link"
            mt={5}
            bg={"white"}
            onChange={handleCustomShortLinkChange}
          />
          <Button
            size="md"
            w="100%"
            colorScheme="blue"
            mt="1em"
            onClick={handleSubmit}
          >
            Shorten!
          </Button>
        </FormControl>
      </Center>
      <Center>
        {errorMsg && <Text p="3%">{errorMsg}</Text>}
        {success === true && (
          <Flex p="5%" flexDir={["column", "column", "row", "row", "row"]}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              px="4"
              py="1"
              display="flex"
              flexDirection="row"
              fontSize="xl"
            >
              <Link href={shortenedUrl} isExternal>
                {shortenedUrl}
              </Link>
            </Box>
            <Spacer></Spacer>
            <Button
              colorScheme="whatsapp"
              ml={[0, 0, 5, 5, 5]}
              onClick={handleCopyLink}
              mt={[2, 2, 0, 0, 0]}
            >
              Copy Link
            </Button>
          </Flex>
        )}
      </Center>
    </Box>
  );
}
