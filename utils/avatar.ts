/*
    Esta función crea un avatar con las iniciales del nombre de usuario.
    Recibe como parámetro el nombre del usuario.
    Retorna la URL de la imagen del avatar.
*/
export const createAvatar = (name: string) => {
    const url = new URL('https://ui-avatars.com/api/');
    url.searchParams.append('name', name);
    url.searchParams.append('background', '#b22323');
    url.searchParams.append('color', '#fdf3f3');
    url.searchParams.append('bold', 'true');
    url.searchParams.append('uppercase', 'true');
    return url.href;
};