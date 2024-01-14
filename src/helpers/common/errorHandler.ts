export function extractErrorMessage(error: any): string | null {
    if (typeof error === 'string') return error;
    else if (error instanceof Error) return error.message;
    else if (typeof error === 'object') {
      const errorMessage = error.message || (error.error && error.error.message);
  
      if (errorMessage) return errorMessage;
      return error.toString?.();
    }
    else return error?.toString?.() || null;
  }
  