export type Ok<T> = { state: 'Ok', value: T }

export type Error<E> = { state: 'Error', error: E }

export type Result<T, E> =
    | Ok<T>
    | Error<E>

export function ok<T> (value: T): Ok<T> {
    return {
        state: 'Ok',
        value,
    };
}

export function error<E> (error: E): Error<E> {
    return {
        state: 'Error',
        error,
    };
}

export function isOk<T, E> (result: Result<T, E>): result is Ok<T> {
    return result.state === 'Ok';
}
