const User = {
    User: {},
    Query: {
        userName : async (_: any, { id }: { id: string }) => {
            return "User Name";
        }
    },
};

export { User };