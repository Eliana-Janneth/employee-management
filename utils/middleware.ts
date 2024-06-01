import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  
  // Obtén la sesión del usuario
  const session = await getSession(req, res);

  // Si no hay sesión, redirigir al login
  if (!session) {
    url.pathname = '/api/auth/login';
    return NextResponse.redirect(url);
  }

  // Verifica el rol del usuario
  const userRole = session.user['http://your-app-url/roles']; // Cambia esto según tu configuración de Auth0

  // Si el rol es "USER" y está tratando de acceder a "/user", redirigir
  if (userRole === 'USER' && url.pathname.startsWith('/user')) {
    url.pathname = '/unauthorized';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*'], // Aplica el middleware a las rutas que empiezan con /user
};
