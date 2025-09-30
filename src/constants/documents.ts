// Create a shared constant file to ensure consistency
// constants/documents.ts

export const DOCUMENT_FIELDS = [
  {
    key: "bsc_hnd_certificate",
    label: "BSc or HND Certificate",
    required: true,
  },
  {
    key: "bank_statement",
    label: "Bank statement",
    required: true,
  },
  {
    key: "intl_passport",
    label: "International passport",
    required: true,
  },
  {
    key: "first_degree_transcript",
    label: "First degree transcript",
    required: true,
  },
  {
    key: "current_cv",
    label: "Current CV",
    required: true,
  },
  {
    key: "nin_slip",
    label: "NIN slip",
    required: true,
  },
  {
    key: "post_graduate_certificate",
    label: "Post graduate certificate",
    required: false,
  },
  {
    key: "post_graduate_transcript",
    label: "Post graduate transcript",
    required: false,
  },
  {
    key: "utility_bill",
    label: "Utility bill",
    required: true,
  },
  {
    key: "admission_letter",
    label: "Letter of admission",
    required: true,
  },
  {
    key: "gre_document",
    label: "GRE or GMAT result",
    required: false,
  },
  {
    key: "change_of_name",
    label: "Change of name document",
    required: false,
  },
  {
    key: "passport_photograph",
    label: "Passport Photograph",
    required: true,
  },
  {
    key: "waec",
    label: "WAEC/NECO Result",
    required: true,
  },
  {
    key: "academic_recommendation_letter",
    label: "Academic Recommendation Letter",
    required: true,
  },
  {
    key: "professional_recommendation_letter",
    label: "Professional Recommendation Letter",
    required: true,
  },
  {
    key: "proconnectpay_recommendations_letter",
    label: "ProconnectPay Recommendation Letter",
    required: true,
  },
] as const;

export const DOCUMENT_KEYS = DOCUMENT_FIELDS.map((doc) => doc.key);
export const DOCUMENT_LABELS = DOCUMENT_FIELDS.map((doc) => doc.label);

// Helper function to get document info by key
export const getDocumentInfo = (key: string) => {
  return DOCUMENT_FIELDS.find((doc) => doc.key === key);
};

// Helper function to get document key by index
export const getDocumentKey = (index: number) => {
  return DOCUMENT_FIELDS[index]?.key;
};

// Helper function to get document label by index
export const getDocumentLabel = (index: number) => {
  return DOCUMENT_FIELDS[index]?.label;
};
