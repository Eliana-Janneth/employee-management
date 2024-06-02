import fetch from 'node-fetch';

async function getAccessToken() {
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
    const data: any = await response.json();
    return data.access_token;
}

export interface userDataProps {
    email: string,
    connection?: string,
    password: string;
    name: string;
}

async function createUser(accessToken: any, userData: userDataProps) {
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

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }
    const userData: userDataProps = req.body;
    try {
        const accessToken = await getAccessToken();
        const newUser = await createUser(accessToken, userData);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
