import * as yup from 'yup';

const EnvSchema = yup.object({
    VITE_BASE_URL: yup.string().required(),
    VITE_AUTH_TOKEN_NAME: yup.string().required(),
});

let envConfig;

try {
    const validatedData = EnvSchema.validateSync(import.meta.env, {
        abortEarly: false,
        stripUnknown: true,
    });

    envConfig = {
        baseUrl: validatedData.VITE_BASE_URL,
        authTokenName: validatedData.VITE_AUTH_TOKEN_NAME,
    };
} catch (error) {
    if (error instanceof yup.ValidationError) {
        console.error("❌ Environment validation errors:", error.errors);
    } else {
        console.error("❌ Failed to parse environment:", error);
    }

    envConfig = {
        baseUrl: "",
        authTokenName: "",
    };
}

export const environment = envConfig;
