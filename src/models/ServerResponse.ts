/**
   * Code for results from server.
   * 
   * 00: All good.
   * 
   * 10: Problem with user information.
   * 
   * 30: Error from operator.
   * 
   * 40: Error from request.
   * 
   * 50: Error from server.
   * 
   * 90: Generic error.
   * 
   * 
   */

export type ServerCode = '00' | '40' | '50' | '10' | '90' | '30';

export interface ServerResponse {
  /**
   * Code for response.
   */
  code: ServerCode,
  /**
   * Information about the operation.
   */
  message: string,
  info?: any
};


/**
 * Class that handles all the server's responses.
 */
class ApiResponse {
  response: ServerResponse;
  info: any;
  /**
   * 
   * @param code Code defining the status of the response.
   * @param message Brief message of the response.
   * @param info (optional) Aditional data for the reponse.
   */
  constructor(code: ServerCode, message: string, info?: any) {
    this.response = {
      code,
      message,
      info
    }
    this.info = info;
  }

  /**
   * Creates a ServerResponse with the given data.
   * @param message Message for the response.
   * @param info (optional) Aditional information for the response.
   * 
   * @returns a `ServerResponse` with `00` status code.
   */

  static success(message: string, info?: any): ServerResponse {
    return new ApiResponse('00', message, info).response;
  }

  /**
   * Creates a ServerResponse with the given data.
   * @param message Message for the response.
   * @param info (optional) Aditional information for the response.
   * 
   * @returns a `ServerResponse` with `90` status code.
   */

  static generic(message: string, info?: any): ServerResponse {
    return new ApiResponse('90', message, info).response;
  }

  /**
   * Creates a ServerResponse with the given data.
   * @param message Message for the response.
   * @param info (optional) Aditional information for the response.
   * 
   * @returns a `ServerResponse` with `40` status code.
   */

  static badRequest(message: string, info?: any): ServerResponse {
    return new ApiResponse('40', message, info).response;
  }

  /**
   * Creates a ServerResponse with the given data.
   * @param message Message for the response.
   * @param info (optional) Aditional information for the response.
   * 
   * @returns a `ServerResponse` with `50` status code.
   */

  static internal(message: string, info?: any): ServerResponse {
    return new ApiResponse('50', message, info).response;
  }
}

export default ApiResponse;

