import jobResolvers from "../resolvers/job-resolver";
import { createModule } from "graphql-modules";
import jobtypeDefs from "../schemas/job-schema";
import { dirname } from "./path";




export const JobModule = createModule({
  id: 'job-module',
  dirname: `${dirname}`,
  typeDefs: [jobtypeDefs],
  resolvers: [jobResolvers]
});