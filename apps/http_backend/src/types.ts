import z from "zod"
export const Signupschema=z.object({
    username:z.string().max(50),
    password:z.string(),
    email:z.email().toLowerCase()
})
export const Signinschema=z.object({
    email:z.email().toLowerCase(),
    password:z.string()
})