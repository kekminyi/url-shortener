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
import React from "react";
import StandardShortener from "../components/StandardShortener";
import CustomShortener from "../components/CustomShortener";

export default function Home() {
  const standardPanelBGColor = "#2e3749";
  const customPanelBGColor = "#77808e";
  return (
    <Flex flexDir={"column"} bg="#1b202c" h="100vh">
      <Head>
        <title>Link Shortener</title>
      </Head>
      <Center>
        <Heading p="2%" color={"gray.200"}>
          Link Shortener
        </Heading>
      </Center>
      <Center py={"5%"}>
        <Tabs variant="enclosed" w={"60%"} borderRadius="lg">
          <TabList borderColor={"transparent"}>
            <Tab
              _selected={{ color: "white", bg: standardPanelBGColor }}
              roundedTopLeft={"lg"}
              color={"white"}
              bg={"#2e3749"}
            >
              Standard
            </Tab>
            <Tab
              _selected={{ color: "white", bg: customPanelBGColor }}
              roundedTopRight={"lg"}
              color={"white"}
              bg={"#77808e"}
            >
              Custom
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              bg={standardPanelBGColor}
              roundedBottom={"lg"}
              roundedTopRight={"lg"}
            >
              <StandardShortener></StandardShortener>
            </TabPanel>
            <TabPanel
              bg={customPanelBGColor}
              roundedBottom={"lg"}
              roundedTop={"lg"}
            >
              <CustomShortener></CustomShortener>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Flex>
  );
}
