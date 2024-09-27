import { User } from '@/types/User';
import {ApiService} from "@/services/apiService";

export const ApiUser = {

    fetchUsers: async (): Promise<User[]> => {
        const [elders, buddies] = await Promise.all([
            ApiService.get('/elders'),
            ApiService.get('/buddies'),
        ]);

        return [...elders, ...buddies];
    }
}


