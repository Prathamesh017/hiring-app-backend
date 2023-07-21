import candidateResolvers from "../resolvers/candidate-resolvers";
import { createModule } from "graphql-modules";
import candidatetypeDefs from "../schemas/candidate-schema";
import { dirname } from "./path";




export const CandidateModule = createModule({
  id: 'candidate-module',
  dirname: `${dirname}`,
  typeDefs: [candidatetypeDefs],
  resolvers: [candidateResolvers]
});