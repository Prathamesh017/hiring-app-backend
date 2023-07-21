
import gql from "graphql-tag";

const applicationtypeDefs = gql`
  # Types Models
  
  type Application{
  id:String
  companyId:String  
  jobId: String
  job:Jobs
  candidate:Candidate
  candidateId:String
  }
  
  
  type Query{
    getApplicationsByCandidateId(candidateId:String!):[Application]
    getApplicationsByCompanyId(companyId:String!):[Application]
  }
  type Mutation{
    createApplication(companyId:String! , 
  jobId: String!,
  candidateId:String!):Application
  }

`;


export default applicationtypeDefs;