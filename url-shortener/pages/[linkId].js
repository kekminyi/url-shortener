import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getStaticPaths() {
  // Get all the homes IDs from the database
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
  try {
    const entry = await prisma.urlDB.findUnique({
      where: { linkId: params.linkId },
    });

    if (entry.length !== 0) {
      return {
        redirect: {
          destination: entry.longUrl,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  } catch (error) {
    console.error(error);
  }
}

const Link = () => {
  return <div>Link</div>;
};

export default Link;
