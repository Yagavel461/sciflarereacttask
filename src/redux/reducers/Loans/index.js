import { ActionTypes } from '../../constants/actionTypes';
const initialState = {
  loanList: [],
  loanDetail: {},
  loanRequestStats: {},
  mandateStats: {},
  loanCollectionStats: {},
  TransactionEmiList: [],
  TransactionEmiDetail: {},
  LoansCollection: [],
};

export const Loans = (state = initialState, action) => {
  const actionTypes = [
    ActionTypes.GET_LOAN_LIST,
    ActionTypes.GET_LOAN_DETAIL,
    ActionTypes.GET_LOAN_STATS,
    ActionTypes.GET_MANDATE_STATS,
    ActionTypes.GET_LOAN_COLLECTION_STATS,
    ActionTypes.GET_TRANSACTION_EMI_LIST,
    ActionTypes.GET_TRANSACTION_EMI_DETAILS,
    ActionTypes.GET_LOAN_COLLECTION_LIST,
  ];
  if (actionTypes.includes(action.type)) {
    return {
      ...state,
      ...action.payload,
    };
  } else {
    return state;
  }
};
