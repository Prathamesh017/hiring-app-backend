import gql from "graphql-tag";
const companytypeDefs = gql`
  # Types Models
  
  type Company{
  id:String
  companyName:String  
  companyEmail : String
  companyPassword   : String
  companyDescription: String
  token:String
  
  }
  
  # Types Query  - consist all get methods
  type Query{
    getAllCompanies:[Company]
   
  }
  #Type Mutation - consist of all post/put/delete methods
  type Mutation{
    registerCompany(companyName:String!,companyEmail:String!,companyPassword:String!,companyDescription:String!):Company
    loginCompany(companyEmail:String!,companyPassword:String!):Company
  }

`;


export default companytypeDefs;