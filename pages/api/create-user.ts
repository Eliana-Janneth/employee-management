import { AccessToken, userDataProps } from '@/interface/user';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';


/*
    Obtiene el token de acceso para la API de Auth0
*/
const getAccessToken = async function (): Promise<string> {
    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: `${process.env.AUTH0_CLIENT_ID_ADMIN}`,
            client_secret: `${process.env.AUTH0_CLIENT_SECRET_ADMIN}`,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
            grant_type: 'client_credentials'
        }),
    });
    if (!response.ok) {
        throw new Error(`Error getting access token: ${response.statusText}`);
    }
    const data: AccessToken = await response.json() as AccessToken;
    return data.access_token;
}

/*
    Crea un usuario en Auth0
*/
const createUser = async function (accessToken: string, userData: userDataProps) {
    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}


/*
    Manejador de la petición, para crear un usuario en Auth0 haciendo un post a /api/create-user
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return null;
    }
    const body = req.body as {
        email: string;
        password: string;
        name: string;
    };
    const userData: userDataProps = {
        email: body?.email,
        connection: 'Username-Password-Authentication',
        password: body?.password,
        name: body?.name,
    };
    try {
        const accessToken = await getAccessToken();
        const newUser = await createUser(accessToken, userData);
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
