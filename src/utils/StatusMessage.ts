export function StatusMessage(status: any, message: any, data: any) {
  return {
    status: status,
    message: message ? message : 'Successfully',
    data: data ? data : null,
  };
}
