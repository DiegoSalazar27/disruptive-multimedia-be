import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();


const adminInfo = {
  alias: "Admin",
  email: "admin@example.com",
  role: "CRUD",
};

const readerInfo = {
  alias: "Reader",
  email: "reader@example.com",
  role: "R",
};

const creatorInfo = {
  alias: "Creator",
  email: "Creator@example.com",
  role: "CRU",
};

async function createUsers() {
  const adminPass = await bcrypt.hash("adminPass", 15);
  const creatorPass = await bcrypt.hash("creatorPass", 15);
  const readerPass = await bcrypt.hash("readerPass", 15);
  const response = await prisma.$transaction([
    prisma.user.create({ data: { ...adminInfo, pass: adminPass } }),
    prisma.user.create({ data: { ...creatorInfo, pass: creatorPass } }),
    prisma.user.create({ data: { ...readerInfo, pass: readerPass } }),
  ]);
  return {
    admin: response[0],
    creator: response[1],
    reader: response[2]
  };
}

async function createTopics() {
  const topics = await prisma.$transaction([
    prisma.topic.create({ data: { name: "Deporte" } }),
    prisma.topic.create({ data: { name: "Ciencia" } }),
    prisma.topic.create({ data: { name: "Salud" } }),
  ]);

  return {
    sports: topics[0],
    science: topics[1],
    health: topics[2],
  };
}

/**
 * @param {string} topicId
 */
async function createSportsCat(topicId) {
  const cat = await prisma.category.create({
    data: {
      name: "Futbol",
      coverUrl: `http://localhost:3001/uploads/12_futbol.jpg`,
      topicsID: topicId,
      allowImage: true
    }
  });
  return cat;
}

/** 
 *  @param {string} catId 
 *  @param {string} creatorId 
 * */
async function createContent(catId, creatorId) {
  const result = await prisma.content.create({
    data: {
      fileURL: `http://localhost:3001/uploads/1_futbol_field.jpg`,
      name: "Campo",
      creditsID: creatorId,
      categoryId: catId
    }
  });
  return result;
}

async function seed() {
  try {
    const { admin, creator, reader } = await createUsers();
    const { sports, science, health } = await createTopics();

    const cat = await createSportsCat(sports.id);
    await createContent(cat.id, creator.id);
    return true;
  } catch (error) {
    console.error("Error seeding db", error);
    return false;
  }
}

seed().then((resutl) => {
  console.log("result", resutl);
});
