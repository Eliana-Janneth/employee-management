import { SessionProvider, signOut, useSession } from 'next-auth/react';


export default function ProfilePagina() {
    return (
      <SessionProvider>
        <ProfilePage />
      </SessionProvider>
    );
  }

export function ProfilePage() {
  const { data: session, status } = useSession();

  // Verificar el estado de la sesión
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
  if (!session) {
    return <>
        <div> 
            <h1>Debes iniciar sesión para ver esta página</h1>
        </div>
    </>
  }

  // Acceder a los datos del usuario desde la sesión
const { user } = session;
//const role = session?.user?.role? session.user.role : 'USER';
return (
    <div>
        <h1>Perfil de Usuario</h1>
        {user && (
            <>
                <p>Nombre: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>
                  Logout
                </button>
            </>
        )}
    </div>
);
}