import { prismaClient } from 'mp-prisma';

export const deleteSmakosh = async () => {
  try {
    await prismaClient.artist.delete({
      where: { id: 2 },
    });
  } catch (error) {
    console.log("Error: Couldn't delete Smakosh!");
  }
};

deleteSmakosh();
