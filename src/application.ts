import { createApplication } from 'graphql-modules';
import { CandidateModule } from './modules/candidate-modules';
import { CompanyModule } from './modules/company-module';
import { JobModule } from './modules/job-modules';
import { ApplicationModule } from './modules/application-modules';
const application = createApplication({
  modules: [CandidateModule, CompanyModule, JobModule, ApplicationModule],
});


export default application;
