import { Message, MessageStatus } from './types';

export const messages: { [key: number]: Message; } = {
    // Success codes
    200: { message: 'Request completed successfully', status: MessageStatus.success },
    202: { message: 'Request accepted for processing', status: MessageStatus.success },
  
    // Redirection codes
    301: { message: 'Resource has been permanently moved', status: MessageStatus.error },
    302: { message: 'Resource has been temporarily moved', status: MessageStatus.error },
  
    // Client error codes
    400: { message: 'Invalid request syntax or parameters', status: MessageStatus.error },
    401: { message: 'Invalid authentication credentials provided', status: MessageStatus.error },
    403: { message: 'Insufficient permissions to access the resource', status: MessageStatus.error },
    404: { message: 'Requested resource could not be found', status: MessageStatus.error },
    405: { message: 'Requested method is not supported for this endpoint', status: MessageStatus.error },
    406: { message: 'Server cannot generate a response in the requested format', status: MessageStatus.error },
    408: { message: 'Request timed out due to server or network delays', status: MessageStatus.error },
    409: { message: 'Request conflicts with existing data or resources', status: MessageStatus.error },
    410: { message: 'Requested resource is no longer available', status: MessageStatus.error },
    414: { message: 'Request URI exceeds the maximum permissible length', status: MessageStatus.error },
    412: { message: 'One or more preconditions specified in the request failed', status: MessageStatus.error },
    413: { message: 'Request payload exceeds the maximum allowable size', status: MessageStatus.error },
    415: { message: 'Requested media type is not supported', status: MessageStatus.error },
    416: { message: 'Requested range is not satisfiable', status: MessageStatus.error },
    429: { message: 'Too many requests', status: MessageStatus.error },
    422: { message: 'Invalid payload', status: MessageStatus.error },
  
    // Server error codes
    500: { message: 'Internal server error', status: MessageStatus.error },
    502: { message: 'Bad gateway', status: MessageStatus.error },
    503: { message: 'Service unavailable', status: MessageStatus.error },
    504: { message: 'Gateway timeout', status: MessageStatus.error },
    505: { message: 'HTTP version not supported', status: MessageStatus.error },
    507: { message: 'Insufficient storage', status: MessageStatus.error },
    511: { message: 'Network authentication required', status: MessageStatus.error },

    // Custom 
    1000: { message: 'Data found', status: MessageStatus.success },
    1001: { message: 'Data not found', status: MessageStatus.failure },
    1003: { message: 'Validation Errors', status: MessageStatus.error },
    1004: { message: 'Unexpected error', status: MessageStatus.error },
  };
  