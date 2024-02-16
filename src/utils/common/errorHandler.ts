export function extractErrorMessage(error: any): string | null {
    if (typeof error === 'string') return error;
    else if (Array.isArray(error)) {
        if (error?.length === 0) return null;
        return error[0];
    }
    else if (error instanceof Error) return error.message;
    else if (typeof error === 'object') {
        const errorMessage = error.message || (error.error && error.error.message);

        if (errorMessage) return errorMessage;
        return error.toString?.();
    }
    else return error?.toString?.() || null;
}

export function exeLog(error: any): Error {
    const err = extractErrorMessage(error);
    console.log(err);
    throw new Error(err as string);
}