//TODO
export const GET_USERS = "http://localhost:8080/ExoBankRest/rest/UserRest/findAllUser"

export const REST_PATH = "http://localhost:8080/ExoBankRest/rest"

//USER
export const LOGIN ="/UserRest/login"
export const REGISTER ="/UserRest/register"
export const UPDATEUSER= "/UserRest/updateUser"

//BANKACCOUNT
export const FINDALLBANKACC="/BankAccountRest/findAllBankAccount"
export const INSERTBANKACC ="/BankAccountRest/insertBankAccount"
export const FINDBANKACCID ="/BankAccountRest/findBankAccountByUserId"
export const UPDATEBANKACCSTATUS='/BankAccountRest/updateBankAccountStatus'
//TRANSACTIONS

export const FINDALLTRANSACTIONS ="/TransactionsRest/findAllTransactions"
export const UPDATETRANSACTIONSTATUS ="/TransactionsRest/updateTransactionStatus"
export const INSERTTRANSACTION = "/TransactionsRest/insertTransaction"
export const FINDUSERTRANSACTIONS= "/TransactionsRest/findUserTransactions"
export const GET_TRANSACTIONS_PDF = "/TransactionsRest/getTransactionsPdf"
export const DOWNLOAD_PDF= "/TransactionsRest/downloadPdf"

