import { prisma } from "/lib/prisma";

const validateShortLink = (customShortLink) => {
  var pattern = new RegExp("^[a-zA-Z0-9]+$");
  return pattern.test(customShortLink);
};

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

const addHttps = (longUrl) => {
  if (!/^(?:f|ht)tps?\:\/\//.test(longUrl)) {
    longUrl = "https://" + longUrl;
  }
  return longUrl;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let { longUrl, customShortLink } = req.body;
      console.log(req.body);
      longUrl = addHttps(longUrl);
      if (!validateURL(longUrl)) {
        return res.status(400).json({
          message: "Invalid URL.",
        });
      }
      const linkId = customShortLink;
      const linkIds = await prisma.urlDB.findMany({
        where: { linkId: linkId },
      });
      if (linkIds.length > 0) {
        //TODO: throw error if clash with existing shortened link
        return res.status(400).json({
          message: "Custom short link already exists. Please try another one.",
        });
      }

      if (validateShortLink(linkId)) {
        const newLink = await prisma.urlDB.create({
          data: {
            longUrl: longUrl,
            linkId,
          },
        });
        return res.status(201).json({
          shortenedUrl: `http://localhost:3000/${linkId}`,
        });
      } else {
        return res.status(400).json({
          message:
            "Custom short link should only contain alphanumeric characters.",
        });
      }
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
}
