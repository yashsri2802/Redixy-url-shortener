import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const loadLinks = async () => {
  const allShortLinks = await prisma.shortlink.findMany();
  return allShortLinks;
};

export const getLinkByShortCode = async (shortcode) => {
  const shortLink = await prisma.shortlink.findUnique({
    where: {
      short_Code: shortcode,
    },
  });
  return shortLink;
};

export const saveLinks = async ({ url, shortCode }) => {
  const newLink = await prisma.shortlink.create({
    data: {
      short_Code: shortCode,
      url,
    },
  });
  return newLink;
};
