import { PrismaClient } from '@prisma/client'

import { JobType } from '../types/type';


const prisma = new PrismaClient()

class JobService {
  public async getAllJobs(id: string) {
    const jobs = await prisma.job.findMany({
      where: {
        companyId: id,
      }
    })
    return jobs;






  }
  public async getAllAvailableJobs() {
    const jobs = await prisma.job.findMany({
      include: {
        company: true,
      },
    })

    return jobs;






  }
  public async createJob(companyId: string, title: string, description: string, category: string, salary: string, location: string): Promise<JobType> {

    if (!(companyId && title && description && category && salary && location)) {
      throw new Error("Incomplete Data");
    }
    let company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    })
    if ((!company)) {
      throw new Error("Company Doesn't Exist");
    }
    ;


    const job = await prisma.job.create({
      data: {
        companyId, title, description, category, salary, location
      },
    })

    return {
      id: job.id,
      companyId: job.companyId,
      title: job.title,
      description: job.description,
      category: job.category,
      salary: job.salary,
      location: job.location



    }






  }

  public async updateJob(id: string, companyId: string, title: string, description: string, category: string, salary: string, location: string): Promise<JobType> {

    if (!(id && companyId && title && description && category && salary && location)) {
      throw new Error("Incomplete Data");
    }

    ;


    const job = await prisma.job.update({
      where: {
        id,
      },
      data: {
        companyId, title, description, category, salary, location
      },
    })

    return {
      id: job.id,
      companyId: job.companyId,
      title: job.title,
      description: job.description,
      category: job.category,
      salary: job.salary,
      location: job.location



    }






  }

  public async deleteJob(id: string) {
    if (!(id)) {
      throw new Error("Not Id ");
    }



    const job = await prisma.job.delete({
      where: {
        id,
      },

    })








  }

}


export default JobService;