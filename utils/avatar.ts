export const createAvatar = (name: string) => {
    const url = new URL('https://ui-avatars.com/api/');
    url.searchParams.append('name', name);
    url.searchParams.append('background', '#b22323');
    url.searchParams.append('color', '#fdf3f3');
    url.searchParams.append('bold', 'true');
    url.searchParams.append('uppercase', 'true');
    return url.href;
};