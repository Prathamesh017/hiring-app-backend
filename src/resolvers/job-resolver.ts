import { authHandler } from "../middleware/middleware";
import { GraphQLError } from 'graphql';
import JobService from "../services/job-service";
const jobService = new JobService();
const jobResolvers = {
  Query: {
    getAllJobs: async (parent, args, contextValue) => {
      let auth = await authHandler(contextValue.token)
      let alljobs = await jobService.getAllJobs(args.companyId);
      return alljobs;
    },
    getAllAvailableJobs: async (parent, args, contextValue) => {
      let auth = await authHandler(contextValue.token)
      let alljobs = await jobService.getAllAvailableJobs();
      return alljobs;
    }

  },
  Mutation: {
    createJob: async (parent, args, contextValue) => {
      try {
        let { companyId, title, description, category, salary, location } = args;

        let auth = await authHandler(contextValue.token)
        let job = await jobService.createJob(companyId, title, description, category, salary, location);
        return job;
      } catch (error) {
        throw new GraphQLError(error.message);
      }

    },

    deleteJob: async (parent, args, contextValue) => {
      try {
        let { id } = args;
        let auth = await authHandler(contextValue.token)
        await jobService.deleteJob(id);
      } catch (error) {
        throw new GraphQLError(error.message);
      }

    },

  }

};

export default jobResolvers;