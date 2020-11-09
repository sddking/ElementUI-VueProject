const rootIp = "http://sysapp.gree.com/bzs/bzapi";
//const rootIp = "http://localhost:35507";
var API = {
    GetUserToken:rootIp+'/User/GetUserToken',
    AddUserRole:rootIp+'/UserRole/AddUserRole',
    UpdateUserRole:rootIp+'/UserRole/UpdateUserRole',
    DeleteUserRole:rootIp+'/UserRole/DeleteUserRole',
    GetRoleList:rootIp+'/UserRole/GetRoleList',

    AddRepairState:rootIp+'/RepairState/AddRepairState',
    UpdateRepairState:rootIp+'/RepairState/UpdateRepairState',
    DeleteRepairState:rootIp+'/RepairState/DeleteRepairState',
    GetRepairStateList:rootIp+'/RepairState/GetRepairStateList',

    AddRepairType:rootIp+'/RepairType/AddRepairType',
    UpdateRepairType:rootIp+'/RepairType/UpdateRepairType',
    DeleteRepairType:rootIp+'/RepairType/DeleteRepairType',
    GetRepairTypeList:rootIp+'/RepairType/GetRepairTypeList',

    AddUserInfo:rootIp+'/User/AddUserInfo',
    UpdateUserItem:rootIp+'/User/UpdateUserItem',
    DeleteUserInfo:rootIp+'/User/DeleteUserInfo',
    GetUserList:rootIp+'/User/GetUserList',

    AddAddressInfo:rootIp+'/Address/AddAddressInfo',
    UpdateAddressInfo:rootIp+'/Address/UpdateAddressInfo',
    DeleteAddressInfo:rootIp+'/Address/DeleteAddressInfo',
    GetAddressInfoList:rootIp+'/Address/GetAddressInfoList',

    GetRepairOrderList:rootIp+'/RepairOrder/GetRepairOrderList',
    GetRepairOrderDetail:rootIp+'/RepairOrder/GetRepairOrderDetail',
    SubmitRepairOrderInfo:rootIp+'/RepairOrder/SubmitRepairOrderInfo',
    UpdateRepairOrderDetail:rootIp+' /RepairOrder/UpdateRepairOrderDetail',

    uploadFile:rootIp+'/FileOperate/uploadFile',
    downloadFile:rootIp+'/FileOperate/downloadFile'

};
export const UrlConfig = API;
export const BaseUrl = rootIp;