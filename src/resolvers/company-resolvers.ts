import { authHandler } from "../middleware/middleware";
import { GraphQLError } from 'graphql';
import CompanyService from "../services/company-service";
const companyService = new CompanyService();
const companyResolvers = {
  Query: {
    getAllCompanies: async (parent, args) => {
      let allCompanies = await companyService.getAllCompanies();
      return allCompanies;
    }

  },
  Mutation: {
    registerCompany: async (parent, args) => {
      try {
        let { companyName, companyEmail, companyPassword, companyDescription } = args;
        let company = await companyService.registerCompany(companyName, companyEmail, companyPassword, companyDescription);
        return company;
      } catch (error) {
        throw new GraphQLError(error.message);
      }

    },
    loginCompany: async (parent, args, contextValue) => {
      try {


        let company = await companyService.loginCompany(args.companyEmail, args.companyPassword);





        return company;
      } catch (error) {
        throw new GraphQLError(error.message);
      }

    },

  }

};

export default companyResolvers;