import { createModule } from "graphql-modules";
import applicationResolvers from "../resolvers/application-resolver";
import applicationtypeDefs from "../schemas/application-schema";
import { dirname } from "./path";




export const ApplicationModule = createModule({
  id: 'application-module',
  dirname: `${dirname}`,
  typeDefs: [applicationtypeDefs],
  resolvers: [applicationResolvers]
});