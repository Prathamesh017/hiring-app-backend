import { authHandler } from "../middleware/middleware";
import { GraphQLError } from 'graphql';
import ApplicationService from "../services/application-service";
const applicationService = new ApplicationService();
const applicationResolvers = {
  Query: {
    getApplicationsByCandidateId: async (parent, args, contextValue) => {
      let auth = await authHandler(contextValue.token)
      let allApplications = await applicationService.getApplicationsForCanididate(args.candidateId);
      return allApplications;
    },
    getApplicationsByCompanyId: async (parent, args, contextValue) => {
      let auth = await authHandler(contextValue.token)
      let allApplications = await applicationService.getApplicationsForCompany(args.companyId);
      return allApplications;
    }

  },
  Mutation: {
    createApplication: async (parent, args, contextValue) => {
      try {
        let { companyId,
          jobId,
          candidateId } = args;


        let auth = await authHandler(contextValue.token)
        let application = await applicationService.createApplication(companyId,
          jobId,
          candidateId);
        return application;
      } catch (error) {
        throw new GraphQLError(error.message);
      }

    },



  }

};

export default applicationResolvers;