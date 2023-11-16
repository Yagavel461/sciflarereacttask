import * as Yup from 'yup';
const phoneRegex =
  /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[6789]\d{9}|(\d[ -]?){10}\d$/gm;
const number = /^\d+$/;
// /^[1-9]\d*$/
const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const maxOneLak = /^([1-9]\d{0,4}|100000)$/;
const alphabets = /^[A-Za-z\s]+$/;
const alphanumeric = /^[A-Za-z0-9'’\s]+$/;
const alphanumericWithCommas = /^[A-Za-z0-9,\s]+$/;
const emailPattern =
  /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
// /^[A-Za-z0-9'’\s]+$/
// /^[A-Za-z0-9\s]+$/
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailPattern, 'Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string()
    .min(6, 'Password must be atleast 6 character')
    .required('Please enter Your Password'),
});

export const MerchantSchema = Yup.object().shape({
  businessType: Yup.string()
    .oneOf(['enterprise', 'trade'], 'Invalid Business Type')
    .required('Please Select Business Type'),
  businessName: Yup.string()
    .max(100, 'Must be 100 characters or less')
    .required('Please Enter Business Name'),
  merchantName: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('Please Enter Merchant Name'),
  phoneNumber: Yup.string()
    .matches(phoneRegex, 'Must be Valid Phone Number')
    .required('Please Enter Phone Number'),
  email: Yup.string().matches(emailPattern, 'Please enter a valid email'),
  // .required("Please Enter Your Email"),
  street: Yup.string().required('Please Enter Flat number, or Street name'),
  city: Yup.string().required('Please Enter City'),
  state: Yup.string().required('Please Select State'),
  area: Yup.string().required('Please Enter Area'),
  pincode: Yup.string()
    .matches(number, 'Must be Number')
    .required('Please Enter Pincode'),
});

export const StoreSchema = Yup.object().shape({
  storeName: Yup.string()
    .max(100, 'Must be 100 characters or less')
    .required('Please Enter Store Name'),
  storeCategoryName: Yup.string().required('Please Select Store Category'),
  storeSubCategoryId: Yup.string().required('Please Select Store SubCategory'),
  settlementType: Yup.string().required('Please Select Settlement Type'),
  street: Yup.string().required('Please Enter Flat number, or Street name'),
  city: Yup.string().required('Please Enter City'),
  state: Yup.string().required('Please Select State'),
  area: Yup.string().required('Please Enter Area'),
  pincode: Yup.string()
    .matches(number, 'Must be Number')
    .required('Please Enter Pincode'),
});
export const SubmerchantSchema = Yup.object().shape({
  submerchantName: Yup.string().required('Please Select SubMerchant Name'),
  phoneNumber: Yup.string()
    .matches(phoneRegex, 'Must be Valid Phone Number')
    .required('Please Enter Phone Number'),
  email: Yup.string()
    .matches(emailPattern, 'Please enter a valid email')
    .required('Please Enter Your Email'),
});

export const AddBankSchema = Yup.object().shape({
  ifsc_code: Yup.string()
    .matches(ifscRegex, 'Not a valid IFSC')
    .required('Please Enter IFSC Code'),
  acc_no: Yup.string()
    .matches(number, 'Accept Only Numbers')
    .required('Please Enter Account Number'),
  confirm_acc_no: Yup.string()
    .matches(number, 'Accept Only Numbers')
    .required('Please Enter Confirm Account Number')
    .oneOf([Yup.ref('acc_no'), null], 'Account Number Should Match'),
  acc_holder_name: Yup.string().required(
    'Please Enter The Account Holder Name'
  ),
});

export const AddVpaSchema = Yup.object().shape({
  vpaName: Yup.string().required('Please Enter VPA Name'),
  selectedbank: Yup.string().required('Please Select Bank'),
  selectedstore: Yup.string().required('Please Select Store'),
});

export const AddSubUserSchema = Yup.object().shape({
  subuserName: Yup.string().required('Please Enter Sub User Name'),
  subuserNumber: Yup.string()
    .matches(phoneRegex, 'Must be Valid Phone Number')
    .required('Please Enter Mobile Number'),
  selectedstore: Yup.string().required('Please Select Store'),
  vpalist: Yup.string().required('Please Select VPA'),
});

export const AgentSchema = Yup.object().shape({
  role: Yup.string()
    .oneOf(['agent', 'asm', 'tl', 'junior-fse'], 'Invalid role')
    .required('Please Select role'),
  name: Yup.string().required('Please enter name'),
  phoneNumber: Yup.string()
    .matches(phoneRegex, 'Must be Valid Phone Number')
    .required('Please Enter Phone Number'),
  city: Yup.string().required('Please Select City'),
  state: Yup.string().required('Please Select State'),
});

export const MapSchema = Yup.object().shape({
  asm: Yup.string().required('Please select asm'),
});

export const AadharSchema = Yup.object().shape({
  aadhar_no: Yup.string().required('Please enter aadhar no'),
});

export const editSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[\w\s.-]+$/, 'Name must not contain special characters')
    .required('Please enter a name'),
  phone: Yup.string()
    .required('Please enter a phone number')
    .test('is-number', 'Phone number must be a valid number', (value) => {
      const numberRegex = /^\d+$/;
      return numberRegex.test(value);
    })
    .test('is-length-10', 'Phone number must be 10 digits', (value) => {
      return value.length === 10;
    }),
});

export const mapNowSchema = Yup.object().shape({
  dsn: Yup.string()
    .required('Please enter dsn')
    .test('alphanumeric', 'dsn must contain both alphanumeric', (value) => {
      return /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
    })
    .min(8, 'dsn must be below 30 characters')
    .max(30, 'dsn must be below 30 characters'),
  vpa_id: Yup.string().required('Please select vpa id'),
});

export const refundSchema = Yup.object().shape({
  transaction_id: Yup.string()
    .required('Please enter a transaction ID')
    .test('is-number', 'Transaction ID must be a valid number', (value) => {
      const numberRegex = /^\d+$/;
      return numberRegex.test(value);
    }),
});

export const cancelSchema = Yup.object().shape({
  reason: Yup.string().required('Please enter a reason for rejection'),
});
export const assignUserToProcessSchema = Yup.object().shape({
  subadmin: Yup.string().required('Please select the subadmin'),
});

export const LocationSchema = Yup.object().shape({
  state: Yup.string().required('Please select state'),
  city: Yup.string().required('Please select city'),
  flatno: Yup.string().required('Please enter flat no'),
  street: Yup.string().required('Please enter street'),
  area: Yup.string().required('Please enter area'),
  pincode: Yup.string()
    .required('Please enter pincode')
    .matches(/^[0-9]+$/, 'Please enter valid pincode')
    .length(6, 'Pincode should have 6 digits'),
});


export const loanEditSchema = Yup.object().shape({
  nbfc_loan_id: Yup.string().required("Please enter nbfc loan id"),
  fixed_daily_repayment: Yup.string().required("Please enter fixed daily repayment"),
  first_emi_date: Yup.string().required("Please enter first emi date"),
  loan_amount: Yup.string().required("Please enter loan amount"),
  asm: Yup.string().required("Please Select ASM"),
  tl: Yup.string().required("Please select Tl"),
  agent: Yup.string().required("Please select agent"),
  tenure: Yup.string()
    .required("Please enter tenure")
    .matches(/^[0-9]+$/, "Please enter valid tenure")
});
export const loanrejectEditSchema = Yup.object().shape({
  loan_status: Yup.string().required("Please select loan status"),
});

export const changeroleschema = Yup.object().shape({
  role: Yup.string().required('Please select role'),
});

export const subadminSchema = Yup.object().shape({
  subadminName: Yup.string().required('Please Enter Subadmin Name'),
  email: Yup.string()
    .matches(emailPattern, 'Please enter a valid email')
    .required('Please Enter your email'),
  phoneNumber: Yup.string()
    .matches(phoneRegex, 'Must be Valid Phone Number')
    .required('Please Enter Phone Number'),
  password: Yup.string()
    .min(6, 'Password must be atleast 6 character')
    .required('Please Enter Your Password'),
});

export const QcStoreSchema = Yup.object().shape({
  storeCategoryName: Yup.string().required('Please Select Store Category'),
  storeSubCategoryId: Yup.string().required('Please Select Store SubCategory'),
});

export const QcDocumentListSchema = Yup.object().shape({
  rejectReason: Yup.string().required('Comment your Reject Reason'),
});

export const soundboxPlanSchema = Yup.object().shape({
  planName: Yup.string()
    .matches(alphanumeric, 'Must be alphabets and number only')
    .min(3, 'Must be 3 characters or above')
    .max(50, 'Must be 50 characters or less')
    .required('Please Select Plan Name'),
  reg_fee: Yup.string()
    .matches(
      maxOneLak,
      'Must be Number and Should be greater than 0 not exceed 1 Lakh'
    )
    .required('Please Enter Registration Fee'),
  subscription_fee: Yup.string()
    .matches(
      maxOneLak,
      'Must be Number and Should be greater than 0 not exceed 1 Lakh'
    )
    .required('Please Enter Subscription Fee'),
  isEmiStarts: Yup.string().required('Please Select EMI Starts'),
  isTenturetype: Yup.string().required('Please Select EMI Starts'),
  desc: Yup.string().max(500, 'Must be 50 characters or less'),
});

export const LoanEditSchema = Yup.object().shape({
  loan_amount: Yup.string()
    .matches(number, 'Accept Only Numbers')
    .required('Please Enter Loan Amount'),
  edi_amount: Yup.string()
    .matches(number, 'Accept Only Numbers')
    .required('Please Enter EDI Amount'),
  edit_interest: Yup.string()
    .matches(number, 'Accept Only Numbers')
    .required('Please Enter Interest Amount'),
  edi_count: Yup.string()
    .matches(number, 'Accept Only Numbers')
    .required('Please Enter EDI Count'),
  edi_start_date: Yup.string().required('Please Select Start Date'),
  nbfc_id: Yup.string().required('Please Enter NBFC ID'),
  tl_id: Yup.string().required('Please Select Concern TL'),
  fse_id: Yup.string().required('Please Select Concern FSC'),
  asm_id: Yup.string().required('Please Select Concern ASM '),
});

export const TransactionEditSchema = Yup.object().shape({
  edi_paid_date: Yup.string().required('Please Select EDI Paid Date'),
  payment_mode: Yup.string().required('Please Select Payment Mode'),
  utr_number: Yup.string().required('Please Enter UTR Number'),
  collected_by: Yup.string().required('Please Select Collected Person'),
  editReason: Yup.string().required('Please Enter The Reason To Update'),
});


export const MerchantUpdateSchema = Yup.object().shape({
  street: Yup.string().required('Please Enter Flat number, or Street name'),
  city: Yup.string().required('Please Enter City'),
  state: Yup.string().required('Please Select State'),
  area: Yup.string().required('Please Enter Area'),
  pincode: Yup.string()
    .matches(number, 'Must be Number')
    .required('Please Enter Pincode'),
});

export const voterFormValidationSchema = Yup.object().shape({
  addressProofNumber: Yup.string().required('Voter ID Number is required.'),
  proof_type: Yup.string().required('Please Select Proof Type'),
});

export const licenseFormValidationSchema = Yup.object().shape({
  addressProofNumber: Yup.string().required('License Number is required.'),
  dateOfBirth: Yup.date().required('Date Of Birth is required.'),
  proof_type: Yup.string().required('Please Select Proof Type'),
});

export const businssProofValidationSchema = Yup.object().shape({
  merchant_type: Yup.string().required('Merchant Type is required')
});

export const passportFormValidationSchema = Yup.object().shape({
  passportName: Yup.string().required('Passport Name is required.'),
  addressProofNumber: Yup.string().required('Passport Number is required.'),
  dateOfBirth: Yup.date().required('Date Of Birth is required.'),
  proof_type: Yup.string().required('Please Select Proof Type'),
});

export const CourierDetailsSchema = Yup.object().shape({
  tracking_id: Yup.string().required('Tracking ID is required'),
  courier_status: Yup.string().required('Courier Status is required'),
  courier_partner: Yup.string().required('Courier Partner is required'),
  tracking_link : Yup.string().required('Enter a valid URL for Tracking Link').url('Enter a valid URL for Tracking Link'),
  courier_id: Yup.string().required('Courier ID is required'),
  expected_delivery_date: Yup.date().nullable().required('Expected delivery date is required'),
});


export const editStoreAddressSchema = Yup.object().shape({
  street_name: Yup.string().required('Please select street name'),
  state: Yup.string().required('Please select state'),
  city: Yup.string().required('Please select city'),
  area: Yup.string().required('Please enter area'),
  pincode: Yup.string()
    .required('Please enter pincode')
    .matches(/^[0-9]+$/, 'Please enter valid pincode')
    .length(6, 'Pincode should have 6 digits'),
});


