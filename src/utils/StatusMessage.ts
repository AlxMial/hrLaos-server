export function StatusMessage(status: any, message: any, data: any) {
  data['isResult'] = status;
  data['message'] = message;
  return data;
}
