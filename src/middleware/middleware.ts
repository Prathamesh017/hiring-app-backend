import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
export const authHandler = async (Bearertoken: String) => {
  let token;
  const primsa = new PrismaClient();
  try {
    if (Bearertoken && Bearertoken.startsWith("Bearer")) {
      token = Bearertoken.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      const findUser = await primsa.candidate.findFirst({
        where: {
          id: decoded?.id
        }

      })
      return findUser;


    }

  }
  catch (error) {
    throw new Error("Not Authorized")
  }
  if (!token) {

    throw new Error("Not Authorized No Token");

  }
}