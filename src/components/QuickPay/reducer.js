import * as types from "./ActionTypes";

const initialState = {
    anonUserID: null,
    anonUserLoading: false,
    anonUserLoadingFailed: false,
    step: 'show_landing', //show_landing, guess_price_and_update_details, show_submit_confirm, final_conf
    landingPageLoading: true,

    createSubInProgress: false,
    createdSubId: null,
    createSubFailed: false,

    analyseInProgress: false,
    analyseFailed: false,
    
    guessPrice: null,
    userPrice: null,
    userEmail: null,

    submitErrors: null,
    submitInProgress: false,
    submitFailed: false,
};


export function quickPay(state = initialState, action) {
    switch (action.type) {
        case types.QP_ANON_USER_LOAD_BEGIN:
            return {
                ...state,
                anonUserLoading: true,
            }
        case types.QP_ANON_USER_SUCCESS:
            return {
                ...state,
                anonUserLoading: false,
                anonUserID: action.userId,
            }
        case types.QP_ANON_USER_FAILURE:
            return {
                ...state,
                anonUserLoading: false,
                anonUserLoadingFailed: true
            }
        case types.QP_APP_READY:
            return {
                ...state,
                landingPageLoading: false,
            };
        case types.QP_CHANGE_STEP:
            return {
                ...state,
                step: action.newStep,
            }
        case types.QP_CREATE_SUB_START:
            return {
                ...state,
                createSubInProgress: true,
                createSubFailed: false,
            }
        case types.QP_CREATE_SUB_SUCCESS:
            return {
                ...state,
                createSubInProgress: false,
                createSubFailed: false,
                createdSubId: action.docId
            }
        case types.QP_CREATE_SUB_FAILED:
            return {
                ...state,
                createSubInProgress: false,
                createSubFailed: true
            }
        case types.QP_ANALYSE_DOC_START:
            return{
                ...state,
                analyseInProgress:true,
                analyseFailed: false,
            }
        case types.QP_ANALYSE_DOC_SUCCESS:
            return {
                ...state,
                analyseInProgress: false,
                analyseFailed: false,
                guessPrice: action.guessPrice
            }
        case types.QP_ANALYSE_DOC_FAILED:
            return {
                ...state,
                analyseInProgress: false,
                analyseFailed: true
            }
        case types.UPDATE_USER_PRICE:
            return {
                ...state,
                userPrice: action.userPrice
            }
        case types.UPDATE_USER_EMAIL:
            return {
                ...state,
                userEmail: action.userEmail
            }
        case types.QP_SUBMIT_START:
            return {
                ...state,
                submitInProgress: true,
            }
        case types.QP_SUBMIT_SUCCESS:
            return {
                ...state,
                submitInProgress: false,
                submitFailed: false,
            }
        case types.QP_SUBMIT_FAILED:
            return {
                ...state,
                submitInProgress: false,
                submitFailed: true,
            }
        default:
            return state;
    }
}