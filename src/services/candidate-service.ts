import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { CandidateType } from '../types/type';
import jwt from "jsonwebtoken";


const prisma = new PrismaClient()

class CandidateService {
  public async getAllCandidates() {
    const candidate = await prisma.candidate.findMany({
    })
    return candidate






  }

  public async registerCandidate(name: string, email: string, password: string): Promise<CandidateType> {

    if (!(name && email && password)) {
      throw new Error("Incomplete Data");
    }
    const existingCandidate = await prisma.candidate.findUnique({
      where: {
        email,
      },
    })

    if ((existingCandidate)) {
      throw new Error("User Already Exist");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);


    const candidate = await prisma.candidate.create({
      data: { name, email, password: hashedPassword },
    })

    return {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      token: this.generateToken(candidate.id)

    }






  }
  public async loginCandidate(email: string, password: string): Promise<CandidateType> {

    if (!(email && password)) {
      throw new Error("Incomplete Data");
    }
    const candidate = await prisma.candidate.findUnique({
      where: {
        email,
      },
    })
    if ((!candidate)) {
      throw new Error("User Doesn't Exist");
    }

    if (!(await bcrypt.compare(password, candidate.password))) {
      throw new Error("Invalid Creditinals");
    }



    return {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      token: this.generateToken(candidate.id)

    }






  }
  public async updateCandidate(id: string, qualification: string, salary: string, link: string, description: string, location: string) {

    if (!(id && qualification && link && description && link && salary && location)) {
      throw new Error("Incomplete Data");
    }

    ;


    const job = await prisma.candidate.update({
      where: {
        id,
      },
      data: {
        qualification, link, description, salary, location
      },
    })

    return {
      id: job.id,
      qualification: job.qualification,
      link: job.link,
      description: job.description,
      salary: job.salary,
      location: job.location



    }






  }
  public async getCandidateData(id: string) {
    const candidateData = await prisma.candidate.findUnique({
      where: {
        id
      }
    })
    return candidateData;






  }
  public generateToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }
}


export default CandidateService;