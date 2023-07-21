export type CandidateType = {
  id: String,
  name: String,
  email: String
  token: String
}
export type CompanyType = {
  id: String,
  companyName: String,
  companyEmail: String
  companyDescription: String,
  token: String
}
export type JobType = {
  id: String,
  companyId: String,
  title: String
  description: String
  category: String
  salary: String
  location: String
}