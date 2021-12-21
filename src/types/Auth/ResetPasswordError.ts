export type ResetPasswordError = string[]

export type ResetPasswordConfirmError = {
    uid?: string[]
    token?: string[],
    new_password?: string[],
}