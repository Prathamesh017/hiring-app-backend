import companyResolvers from "../resolvers/company-resolvers";
import { createModule } from "graphql-modules";
import companytypeDefs from "../schemas/company-schema";
import { dirname } from "./path";




export const CompanyModule = createModule({
  id: 'company-module',
  dirname: `${dirname}`,
  typeDefs: [companytypeDefs],
  resolvers: [companyResolvers]
});