import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"
import { CompanyType } from '../types/type';
import jwt from "jsonwebtoken";


const prisma = new PrismaClient()

class CompanyService {
  public async getAllCompanies() {
    const companies = await prisma.company.findMany({
    })
    return companies;






  }

  public async registerCompany(companyName: string, companyEmail: string, companyPassword: string, companyDescription: string): Promise<CompanyType> {

    if (!(companyName && companyEmail && companyPassword && companyDescription)) {
      throw new Error("Incomplete Data");
    }
    const existingCompany = await prisma.company.findUnique({
      where: {
        companyName,
      },
    })
    if ((existingCompany)) {
      throw new Error("Company Already Exist with this Name");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(companyPassword, salt);


    const company = await prisma.company.create({
      data: { companyName, companyEmail, companyPassword: hashedPassword, companyDescription },
    })

    return {
      id: company.id,
      companyName: company.companyName,
      companyEmail: company.companyEmail,
      companyDescription: company.companyDescription,
      token: this.generateToken(company.id)

    }






  }
  public async loginCompany(companyEmail: string, companyPassword: string): Promise<CompanyType> {

    if (!(companyEmail && companyPassword)) {
      throw new Error("Incomplete Data");
    }
    const company = await prisma.company.findUnique({
      where: {
        companyEmail,
      },
    })
    if ((!company)) {
      throw new Error("No Company Asssoited with this email")
    }
    if (!(await bcrypt.compare(companyPassword, company.companyPassword))) {
      throw new Error("Invalid Creditinals");
    }




    return {
      id: company.id,
      companyName: company.companyName,
      companyEmail: company.companyEmail,
      companyDescription: company.companyDescription,
      token: this.generateToken(company.id)

    }






  }
  public generateToken(id: string): string {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }
}


export default CompanyService;