import React from "react";
import { Heading, Center } from "@chakra-ui/react";
import { prisma } from "/lib/prisma";

export async function getServerSideProps({ params }) {
  try {
    const result = await prisma.urlDB.findUnique({
      where: { linkId: params.linkId },
    });

    if (result !== null) {
      return {
        redirect: {
          destination: result.longUrl,
          permanent: true,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/error",
          permanent: true,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }
}

const Link = () => {
  return (
    <Center mt={"50vh"}>
      <Heading>Incorrect link provided. Please input another url. </Heading>
    </Center>
  );
};

export default Link;
