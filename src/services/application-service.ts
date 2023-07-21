import { PrismaClient } from '@prisma/client'

import { JobType } from '../types/type';


const prisma = new PrismaClient()

class ApplicationService {
  public async getApplicationsForCanididate(candidateId: string) {
    const applications = await prisma.applications.findMany({
      where: {
        candidateId,

      }
    })
    return applications;
  }
  public async getApplicationsForCompany(companyId: string) {
    const applications = await prisma.applications.findMany({
      where: {
        companyId,
      },
      include: {
        candidate: true,
        job: true
      },
    })
    return applications;






  }

  public async createApplication(companyId: string
    , jobId: string
    , candidateId: string) {

    if (!(companyId && jobId && candidateId)) {
      throw new Error("Incomplete Data");
    }



    const application = await prisma.applications.create({
      data: {
        companyId, jobId, candidateId
      },
    })

    return {
      id: application.id,
      companyId: application.companyId,
      title: application.jobId,
      description: application.candidateId,




    }






  }



}


export default ApplicationService;