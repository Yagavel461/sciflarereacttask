import { combineReducers } from "redux";
import { showRight, layout } from "./Layout";
import { Business } from "./Business";
import { Payments } from "./Payments";
import { Agents } from "./Agents";
import { SoundBox } from "./SoundBox";
import { Loans } from "./Loans";
import { Disputes } from "./Disputes";
import { Acl } from "./Acl";
import { SubAdmin } from "./SubAdmin";
import { PosManagement } from "./POS";
import { QualityCheck } from "./QulaityCheck";
import { ProfileDetails } from "./ProfileDetails";
import { insurancePayout } from "./InsurancePayouts";
import { UpiMandate } from "./UpiMandate";
import { Settlements } from "./Settlements";
import { Surveys } from "./Surveys";
import { SoundBoxRequests } from "./SoundBoxRequests";
import { Reconciliation } from "./Reconciliation";
import { UPISettlements } from "./UPISettlements";
import storage from 'redux-persist/lib/storage'

const appReducer = combineReducers({
  showRight,
  layout,
  Business,
  Payments,
  Acl,
  SubAdmin,
  PosManagement,
  Agents,
  QualityCheck,
  SoundBox,
  ProfileDetails,
  Loans,
  Disputes,
  insurancePayout,
  UpiMandate,
  Settlements,
  SoundBoxRequests,
  Surveys,
  Reconciliation,
  UPISettlements
});


const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    storage.removeItem('persist:theme-root');
    state = {}
  }
  return appReducer(state, action)
}

export default rootReducer;
