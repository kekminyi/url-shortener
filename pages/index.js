import {
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Heading,
} from "@chakra-ui/react";

import Head from "next/head";
import React, { useState } from "react";
import StandardShortener from "../components/StandardShortener";
import CustomShortener from "../components/CustomShortener";

export default function Home() {
  const standardPanelBGColor = "blue.800";
  const customPanelBGColor = "teal.700";
  return (
    <Flex flexDir={"column"} bg="cyan.800" h="100vh">
      <Head>
        <title>Link Shortener</title>
      </Head>
      <Center>
        <Heading p="2%" color={"white"}>
          Link Shortener
        </Heading>
      </Center>
      <Center>
        <Tabs
          variant="enclosed-colored"
          w={"40%"}
          h={"80%"}
          borderWidth="1px"
          borderRadius="lg"
          borderColor={"transparent"}
        >
          <TabList borderColor={"transparent"}>
            <Tab
              _selected={{ color: "white", bg: standardPanelBGColor }}
              borderColor={"transparent"}
              roundedTopLeft={"lg"}
            >
              Standard
            </Tab>
            <Tab
              _selected={{ color: "white", bg: customPanelBGColor }}
              borderColor={"transparent"}
              roundedTopRight={"lg"}
            >
              Custom
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              bg={standardPanelBGColor}
              borderWidth="1px"
              roundedBottom={"lg"}
              roundedTopRight={"lg"}
              borderColor={"transparent"}
            >
              <StandardShortener></StandardShortener>
            </TabPanel>
            <TabPanel
              bg={customPanelBGColor}
              borderWidth="1px"
              roundedBottom={"lg"}
              roundedTopRight={"lg"}
              borderColor={"transparent"}
            >
              <CustomShortener></CustomShortener>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Flex>
  );
}
