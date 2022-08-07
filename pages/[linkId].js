import { Heading, Center } from "@chakra-ui/react";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getStaticPaths() {
  const urls = await prisma.urlDB.findMany({
    select: { linkId: true },
  });
  return {
    paths: urls.map((url) => ({
      params: { linkId: url.linkId },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const entry = await prisma.urlDB.findUnique({
    where: { linkId: params.linkId },
  });
  if (entry !== null) {
    return {
      redirect: {
        destination: entry.longUrl,
      },
    };
  }

  return {
    redirect: {
      destination: "/error",
      permanent: false,
    },
  };
}

const Link = () => {
  return (
    <Center mt={"50vh"}>
      <Heading>Incorrect link provided. Please input another url. </Heading>
    </Center>
  );
};

export default Link;
