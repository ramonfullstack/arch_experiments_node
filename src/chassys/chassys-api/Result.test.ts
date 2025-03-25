import { expect } from 'chai';
import { 
  ResultFactory, 
  isError, 
  ok, 
  err, 
  notFound, 
  badRequest, 
  unauthorized, 
  forbidden, 
  serverError,
  type Ok,
  type Err,
  type Result,
  type ErrorType
} from './Result';

describe('Result Module', () => {
  describe('Type Guards', () => {
    test('isError should identify error results', () => {
      const errorResult = ResultFactory.err([{ message: 'Test error' }]);
      const successResult = ResultFactory.ok('Success');
      
      expect(isError(errorResult)).tobe(true);
      expect(isError(successResult)).toBe(false);
    });
  });

  describe('ResultFactory', () => {
    describe('ok', () => {
      test('should create a success result with default status code', () => {
        const result = ResultFactory.ok('test value');
        
        expect(result.__t).toBe('OK');
        expect(result.value).toBe('test value');
        expect(result.statusCode).toBe(200);
      });

      test('should create a success result with custom status code', () => {
        const result = ResultFactory.ok('test value', 201);
        
        expect(result.__t).toBe('OK');
        expect(result.value).toBe('test value');
        expect(result.statusCode).toBe(201);
      });

      test('should work with complex object values', () => {
        const complexValue = { id: 1, name: 'Test', items: [1, 2, 3] };
        const result = ResultFactory.ok(complexValue);
        
        expect(result.__t).toBe('OK');
        expect(result.value).toEqual(complexValue);
      });
    });

    describe('err', () => {
      test('should create an error result with default status code', () => {
        const errors = [{ message: 'Error message' }];
        const result = ResultFactory.err(errors);
        
        expect(result.__t).toBe('ERR');
        expect(result.errors).toEqual(errors);
        expect(result.statusCode).toBe(400);
      });

      test('should create an error result with custom status code', () => {
        const errors = [{ message: 'Error message' }];
        const result = ResultFactory.err(errors, 422);
        
        expect(result.__t).toBe('ERR');
        expect(result.errors).toEqual(errors);
        expect(result.statusCode).toBe(422);
      });

      test('should work with custom error types', () => {
        type CustomError = { errorCode: number; description: string };
        const customErrors: CustomError[] = [{ errorCode: 100, description: 'Custom error' }];
        
        const result = ResultFactory.err<CustomError>(customErrors, 400);
        
        expect(result.__t).toBe('ERR');
        expect(result.errors).toEqual(customErrors);
      });
    });

    describe('HTTP Error Helpers', () => {
      test('notFound should create a 404 error', () => {
        const result = ResultFactory.notFound();
        
        expect(result.__t).toBe('ERR');
        expect(result.statusCode).toBe(404);
        expect(result.errors[0].message).toBe('Resource not found');
        expect(result.errors[0].code).toBe('NOT_FOUND');
      });

      test('notFound should accept custom message', () => {
        const customMessage = 'User not found';
        const result = ResultFactory.notFound(customMessage);
        
        expect(result.errors[0].message).toBe(customMessage);
      });

      test('badRequest should create a 400 error', () => {
        const errors: ErrorType[] = [
          { message: 'Field is required', field: 'email' },
          { message: 'Invalid format', field: 'phone' }
        ];
        
        const result = ResultFactory.badRequest(errors);
        
        expect(result.__t).toBe('ERR');
        expect(result.statusCode).toBe(400);
        expect(result.errors).toEqual(errors);
      });

      test('unauthorized should create a 401 error', () => {
        const result = ResultFactory.unauthorized();
        
        expect(result.__t).toBe('ERR');
        expect(result.statusCode).toBe(401);
        expect(result.errors[0].message).toBe('Unauthorized');
        expect(result.errors[0].code).toBe('UNAUTHORIZED');
      });

      test('forbidden should create a 403 error', () => {
        const result = ResultFactory.forbidden();
        
        expect(result.__t).toBe('ERR');
        expect(result.statusCode).toBe(403);
        expect(result.errors[0].message).toBe('Forbidden');
        expect(result.errors[0].code).toBe('FORBIDDEN');
      });

      test('serverError should create a 500 error', () => {
        const result = ResultFactory.serverError();
        
        expect(result.__t).toBe('ERR');
        expect(result.statusCode).toBe(500);
        expect(result.errors[0].message).toBe('Internal server error');
        expect(result.errors[0].code).toBe('SERVER_ERROR');
      });
    });
  });

  describe('Backward Compatibility Functions', () => {
    test('ok function should work like ResultFactory.ok', () => {
      const factoryResult = ResultFactory.ok('test');
      const functionResult = ok('test');
      
      expect(functionResult).toEqual(factoryResult);
    });

    test('err function should work like ResultFactory.err', () => {
      const errors = [{ message: 'Error' }];
      const factoryResult = ResultFactory.err(errors);
      const functionResult = err(errors);
      
      expect(functionResult).toEqual(factoryResult);
    });

    test('notFound function should work like ResultFactory.notFound', () => {
      const factoryResult = ResultFactory.notFound('Not found');
      const functionResult = notFound('Not found');
      
      expect(functionResult).toEqual(factoryResult);
    });

    test('badRequest function should work like ResultFactory.badRequest', () => {
      const errors = [{ message: 'Invalid input', field: 'email' }];
      const factoryResult = ResultFactory.badRequest(errors);
      const functionResult = badRequest(errors);
      
      expect(functionResult).toEqual(factoryResult);
    });

    test('unauthorized function should work like ResultFactory.unauthorized', () => {
      const factoryResult = ResultFactory.unauthorized('Auth failed');
      const functionResult = unauthorized('Auth failed');
      
      expect(functionResult).toEqual(factoryResult);
    });

    test('forbidden function should work like ResultFactory.forbidden', () => {
      const factoryResult = ResultFactory.forbidden('No access');
      const functionResult = forbidden('No access');
      
      expect(functionResult).toEqual(factoryResult);
    });

    test('serverError function should work like ResultFactory.serverError', () => {
      const factoryResult = ResultFactory.serverError('Server crashed');
      const functionResult = serverError('Server crashed');
      
      expect(functionResult).toEqual(factoryResult);
    });
  });

  describe('Practical Usage', () => {
    test('Using Result in a function', () => {
      // Example function that returns a Result
      const divide = (a: number, b: number): Result<number> => {
        if (b === 0) {
          return ResultFactory.badRequest([{ 
            message: 'Division by zero is not allowed', 
            field: 'divisor' 
          }]);
        }
        return ResultFactory.ok(a / b);
      };
      
      const successResult = divide(10, 2);
      const errorResult = divide(10, 0);
      
      expect(isError(successResult)).toBe(false);
      if (!isError(successResult)) {
        expect(successResult.value).toBe(5);
      }
      
      expect(isError(errorResult)).toBe(true);
      if (isError(errorResult)) {
        expect(errorResult.errors[0].message).toContain('Division by zero');
      }
    });
  });
});