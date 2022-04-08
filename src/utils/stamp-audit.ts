export function stampAudit(dataSave: any, data: any = dataSave, state: string = 'create', isDeleted: boolean = false) {
    if (state === 'create') {
        dataSave.createdBy = data.userId;
        dataSave.createdDate = new Date();
        dataSave.modifiedBy = data.userId;
        dataSave.modifiedDate = new Date();
    } else {
        dataSave.modifiedBy = data.userId;
        dataSave.modifiedDate = new Date();
    }
    dataSave.isDeleted = state === 'delete' ? true : false;
    return dataSave
}