export type Some<T> = { state: 'Some', value: T }

export type None = { state: 'None' }

export type Option<T> =
    | Some<T>
    | None

export function some<T> (value: T): Some<T> {
    return {
        state: 'Some',
        value: value,
    };
}

export function none (): None {
    return {
        state: 'None',
    };
}

export function isSome<T> (option: Option<T>): option is Some<T> {
    return option.state === 'Some';
}
