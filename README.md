NOTE: Deprecated in favour of https://github.com/jyshb/poc-frp-rxjs-form/

Why? Elm-style architecture and form doesn't scale well. Or the boilerplate scales along as much as the app itself.

FRP (SodiumFRP style) seems like a saner solution.

---

submit_button -> toEntity(formFields) -> Errors? -> filterErrorsUntilCurrentSection() -> return { status: 'Fixing', fields, errors: {} }
inputChange -> if state "Fixing" -then-> toEntity(formFields) -> Errors? -> ...
							                 -else-> return {state: 'Filling', fields, errors: {}}
