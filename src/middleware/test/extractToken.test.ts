import { NextFunction, Request, Response } from "express";
import verifyToken, {
  stringQueryKey,
  headerKey,
  reqTokenName,
} from "../extractToken";

describe("extractToken", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
  });

  it("extract from query string", () => {
    const token = "이건토큰";
    mockRequest = {
      query: {
        [stringQueryKey]: token,
      },
    };

    verifyToken(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockRequest?.token).toBe(token);
  });

  it("extract from header", () => {
    const token = "이건토큰";
    mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    verifyToken(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockRequest?.token).toBe(token);
  });
});
