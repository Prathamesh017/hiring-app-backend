import gql from "graphql-tag";
import { CompanyType } from "../types/type";
const jobtypeDefs = gql`
  # Types Models
  
  type Jobs{
  id: String,
  companyId: String,
  title: String
  company:Company
  description: String
  category: String
  salary: String
  location: String
  }
  
  # # Types Query  - consist all get methods
  type Query{
    getAllJobs(companyId:String!):[Jobs],
    getAllAvailableJobs:[Jobs]
   
  }
  #Type Mutation - consist of all post/put/delete methods
  type Mutation{
    createJob(companyId:String!,title:String!,description:String!,category: String,salary: String!,location: String!):Company,
    deleteJob(id:String!):Company
    # updateJob()
  }

`;


export default jobtypeDefs;