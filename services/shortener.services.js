import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const loadLinks = async () => {
  const allShortLinks = await prisma.user.findMany();
  return allShortLinks;
};

export const getLinkByShortCode = async (shortcode) => {
  const shortLink = await prisma.user.findUnique({
    where: {
      short_Code: shortcode,
    },
  });
  return shortLink;
};

export const saveLinks = async ({ url, shortCode }) => {
  const newLink = await prisma.user.create({
    data: {
      short_Code: shortCode,
      url,
    },
  });
  return newLink;
};
