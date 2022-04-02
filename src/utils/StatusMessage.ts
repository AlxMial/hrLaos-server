export function StatusMessage(isResult: any, message: any, data: any) {
  data['isResult'] = isResult;
  data['message'] = message;
  return data;
}
