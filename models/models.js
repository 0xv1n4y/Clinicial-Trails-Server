const mongoose = require('mongoose');

// 1. Administrative Details
const AdministrativeDetailsSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Application' },
  principalInvestigatorName: { type: String, required: true },
  department: { type: String, required: true },
  submissionDate: { type: String, required: true },
  reviewType: { type: String, enum: ['Expedited Review', 'Full Committee Review'], required: true },
  studyTitle: { type: String, required: true },
  protocolNumber: { type: String, required: true },
  versionNumber: { type: String, required: true },
  protocolDate: { type: String, required: true }
});

// 2. Investigators
const InvestigatorSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Application' },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  qualification: { type: String, required: true }
});

// 3. Participants
const ParticipantSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Application' },
  participantType: { type: String, enum: ['Healthy volunteer', 'Patient', 'Vulnerable person', 'Others'], required: true },
  vulnerableJustification: String,
  safeguards: String,
  reimbursementDetails: String,
});

// 4. Benefits & Risks
const BenefitsRisksSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Application' },
  anticipatedRisks: String,
  riskManagement: String,
  participantBenefit: { type: String, enum: ['Direct', 'Indirect'] },
  societalBenefits:{ type: String, enum: ['Direct', 'Indirect'] },
  scientificBenefits: { type: String, enum: ['Direct', 'Indirect'] },
  advertisementBenfits: String
});

// 5. Payment & Compensation
const PaymentSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Application' },
  injuryTreatment: { type: String, enum: ['Yes', 'No', 'NA'], default: 'NA' }, // Add default value
  saeCompensation: { type: String, enum: ['Yes', 'No', 'NA'], default: 'NA' }, // Add default value
  regulatoryApprovals: String
});
// 6. Storage & Confidentiality
const StorageSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Application' },
  documentControl: { type: String, enum: ['Yes', 'No'], default: 'No'},
  drugDeviceControl: { type: String, enum: ['Yes', 'No'], default: 'No' }
});

// 7. Checklist
const ChecklistSchema = new mongoose.Schema({
  applicationId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Application' },
  items: [{
    name: String,
    status: { type: String, enum: ['Yes', 'No', 'NA'], default: 'NA' }, // Default value 'NA'
    enclosureNo: String,
    remarks: String
  }]
});

// 8. Application Master
const ApplicationSchema = new mongoose.Schema({
  status: { type: String, enum: ['Draft', 'Submitted', 'Under Review', 'Approved'], default: 'Submitted' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = {
  Application: mongoose.model('Application', ApplicationSchema),
  AdministrativeDetails: mongoose.model('AdministrativeDetails', AdministrativeDetailsSchema),
  Investigator: mongoose.model('Investigator', InvestigatorSchema),
  Participant: mongoose.model('Participant', ParticipantSchema),
  BenefitsRisks: mongoose.model('BenefitsRisks', BenefitsRisksSchema),
  Payment: mongoose.model('Payment', PaymentSchema),
  Storage: mongoose.model('Storage', StorageSchema),
  Checklist: mongoose.model('Checklist', ChecklistSchema)
};


