import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateLinkId = () => {
  const alphanumericList =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let linkId = "";
  for (let i = 0; i < 6; i++) {
    linkId += alphanumericList.charAt(
      Math.floor(Math.random() * alphanumericList.length),
    );
  }
  return linkId;
};

// TODO: Generate a custom made linkId based on user input
const generateCustomLinkId = () => {};

const validateURL = (url) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // fragment locator
  return !!pattern.test(url);
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { url } = req.body;
      if (!validateURL(url)) {
        return res.status(400).json({
          error: "Invalid URL",
        });
      }
      const linkId = generateLinkId(6);
      console.log(linkId);
      const newLink = await prisma.urlDB.create({
        data: {
          longUrl: url,
          linkId,
        },
      });
      res.status(201).json({
        url: `https://localhost:3000/${linkId}`,
      });
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
}
