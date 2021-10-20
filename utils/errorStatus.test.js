import errorStatus from './errorStatus';

describe('errorStatus', () => {
  const httpErrorStatus = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Require',
    403: 'Forbidden',
    404: 'Not Found',
    408: 'Request Timeout',
    409: 'Conflict',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
  };

  //1: status코드가 있는 경우
  for (const key in httpErrorStatus) {
    test(`status가 ${key}인 경우`, () => {
      expect(() => {
        errorStatus(key, null);
      }).toThrowError(new Error(httpErrorStatus[key]));
    });
  }

  //0: status와 message가 없는 경우
  test('status 없는 경우', () => {
    expect(() => {
      errorStatus();
    }).toThrowError(new Error(httpErrorStatus[500]));
  });

  //-1: httpErrorStatus에 없는 statusCode가 들어왔을 경우
  test('httpErrorStatus에 없는 statusCode', () => {
    expect(() => {
      errorStatus(800, null);
    }).toThrowError(new Error(httpErrorStatus[500]));
  });
});
