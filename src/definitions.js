export const ACCESS_CONTROL = { access: "none" };

/* Defines which columns are seen by default */
/* mark true to show by default and false to hide */
export const VIEWABLE_COLUMNS = {
  INITIAL_INFO: {
    county: true,
    lea: true,
    dateofrequest: true,
    issheriffsdept: true,
    datatype: true,
  },
  DATES: {
    startdaterequested: false,
    enddaterequested: false,
    startdatereturned: true,
    enddatereturned: true,
  },
  CURRENT_INFO: {
    leadmember: true,
    currentstatus: true,
    dateoflastcontact: false,
    linktoprarequest: true,
  },
  ANALYSIS: {
    datereceived: true,
    variableschecked: false,
    variablescomplete: false,
    dataqualitychecked: false,
    dataactionable: false,
    datacleaned: false,
    datageocoded: false,
    dataanalyzed: false,
  },
};

// Columns that can be searched in table; written as set for fast lookup speed vs array
export const SEARCHABLE_COLUMNS = new Set([
  "county",
  "lea",
  "leadmember",
  "currentstatus",
]);

// Array: each entry is an object mapping db field name to proper label
// Ordered by order they appear in the form (logical ordering of interest
export const ALL = [
  { dateofrequest: "Date of request" },
  { county: "County" },
  { lea: "LEA" },
  { issheriffsdept: "Is sheriffs dept.?" },
  { datatype: "Data type" },
  { initialcontact: "Initial contact" }, // name, method, info
  { startdaterequested: "Start date requested" },
  { enddaterequested: "End date requested" },
  { startdatereturned: "Start date returned" },
  { enddatereturned: "End date returned" },
  { variables: "Variables" }, // each entry is stored with variable name as key, and then two subkeys:
  // the subkeys are requested (bool as value) and received (bool as value)
  { dateoflastcontact: "Date of last contact" },
  { currentstatus: "Status" },
  { leadmember: "Lead member" },
  { currentcontact: "Current contact" }, // name, method, info
  { datereceived: "Date received" },
  { variableschecked: "Variables checked?" },
  { variablescomplete: "Variables complete?" },
  { dataqualitychecked: "Data quality checked?" },
  { dataactionable: "Date actionable?" },
  { datacleaned: "Data cleaned?" },
  { datageocoded: "Data geocoded?" },
  { dateanalyzed: "Data analyzed?" },
  { linktoprarequest: "Link to PRA request" },
  { updates: "Updates" }, // each entry is stored with key as timestamp and value as the note
  { comments: "Comments" },
];

// Fields to export for csv
// exclues: variables, comments, updates, linktoprarequest
export const FIELDS_TO_EXPORT = [
  "dateofrequest",
  "county",
  "lea",
  "issheriffsdept",
  "datatype",
  "initialcontact",
  "startdaterequested",
  "enddaterequested",
  "startdatereturned",
  "enddatereturned",
  "dateoflastcontact",
  "currentstatus",
  "leadmember",
  "currentcontact",
  "datereceived",
  "variableschecked",
  "variablescomplete",
  "dataqualitychecked",
  "dataactionable",
  "datacleaned",
  "datageocoded",
  "dateanalyzed",
];

// Map of db field names to column labels for table
export const COLUMNS_TO_LABELS = {
  county: "County",
  lea: "LEA",
  dateofrequest: "Date of request",
  startdaterequested: "Start date requested",
  enddaterequested: "End date requested",
  currentstatus: "Status",
  startdatereturned: "Start date returned",
  enddatereturned: "End date returned",
  leadmember: "Lead member",
  dateoflastcontact: "Date of last contact",
  linktoprarequest: "Link to PRA Request",
  issheriffsdept: "SD/PD",
  datatype: "Data type",
  datereceived: "Date received",
  variableschecked: "Variables checked",
  variablescomplete: "Variables complete",
  dataqualitychecked: "Quality checked",
  dataactionable: "Actionable",
  datacleaned: "Cleaned",
  datageocoded: "Geocoded",
  dataanalyzed: "Analyzed",
};

// The available statuses for a PRA that show up under select option for 'Status'
export const STATUSES = [
  "Requested",
  "Requested - No Response",
  "Received - Incomplete",
  "Contesting",
  "Processing",
  "Analyzing",
];

// The available contact methods for contacts
export const CONTACT_METHODS = ["Phone", "Email", "Fax", "Portal"];

// Variables that we track for each PRA
// if false, then in the 'Variables' section of a new form, it will be unchecked
export const INITIAL_VARIABLES = {
  ARREST_ADD: {
    requested: false,
    received: false,
  },
  ARREST_DT: {
    requested: false,
    received: false,
  },
  BAIL_AMT: {
    requested: false,
    received: false,
  },
  CHARGES: {
    requested: false,
    received: false,
  },
  DOB: {
    requested: false,
    received: false,
  },
  FIRST_NAME: {
    requested: false,
    received: false,
  },
  HOME_ADD: {
    requested: false,
    received: false,
  },
  HOME_ZIP: {
    requested: false,
    received: false,
  },
  LAST_NAME: {
    requested: false,
    received: false,
  },
  LEA: {
    requested: false,
    received: false,
  },
  OCCUPATION: {
    requested: false,
    received: false,
  },
  RACE: {
    requested: false,
    received: false,
  },
  RELEASE_DT: {
    requested: false,
    received: false,
  },
  RELEASE_RSN: {
    requested: false,
    received: false,
  },
  SEX: {
    requested: false,
    received: false,
  },
  UNIQUE_ID: {
    requested: false,
    received: false,
  },
};
