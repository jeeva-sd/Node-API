export function extractErrorMessage(error: any): string | null | string[] {
    if (typeof error === 'string') return error;
    else if (Array.isArray(error)) {
        if (error?.length === 0) return null;
        else if (error.length === 1) return error[0];

        return error;
    }
    else if (error instanceof Error) return error.message;
    else if (typeof error === 'object') {
        const errorMessage = error.message || (error.error && error.error.message);

        if (errorMessage) return errorMessage;
        return error.toString?.();
    }
    else return error?.toString?.() || null;
}
