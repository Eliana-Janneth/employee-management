export interface UserBody {
    id: string;
    role: string;
}

export interface User {
    id: string;
    role: string;
    name: string;
    email: string;
    image: string;
}

export interface userDataProps {
    email: string,
    connection?: string,
    password: string;
    name: string;
}

export interface AccessToken {
    access_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
}