class TokenStorage {
    key = 'tokenBuddyBackoffice';

    public save = (token: string) => sessionStorage.setItem(this.key, token);

    public get = () : string => sessionStorage.getItem(this.key) ?? "";

    public remove = () => sessionStorage.removeItem(this.key);
}

export const tokenStorage = new TokenStorage();
