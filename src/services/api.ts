import { User } from '../types/User';
import { Buddy } from '../types/Buddy';
import { Elder } from '../types/Elder';

const ELDERS_URL = 'http://localhost:8086/elders';
const BUDDIES_URL = 'http://localhost:8086/buddies';

const fetchWithAuth = async (url: string, token: string): Promise<Response> => {
    return fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const fetchUsers = async (token: string): Promise<User[]> => {
    const [eldersResponse, buddiesResponse] = await Promise.all([
        fetchWithAuth(ELDERS_URL, token),
        fetchWithAuth(BUDDIES_URL, token),
    ]);

    if (!eldersResponse.ok || !buddiesResponse.ok) {
        throw new Error('Failed to fetch users');
    }

    const elders: Elder[] = await eldersResponse.json();
    const buddies: Buddy[] = await buddiesResponse.json();

    return [...elders, ...buddies];
};

