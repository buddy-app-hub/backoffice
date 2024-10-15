import {User, UserFields} from '@/types/User';
import {ApiService} from "@/services/apiService";

const sortUserByRegistrationDate = (a: User, b: User) =>
    a[UserFields.RegistrationDate] > b[UserFields.RegistrationDate] ? -1 : 1;

export const ApiUser = {

    fetchUsers: async (): Promise<User[]> => {
        const [elders, buddies] = await Promise.all([
            ApiService.get('/elders'),
            ApiService.get('/buddies'),
        ]);

        const users: User[] = [...elders, ...buddies];

        return users.sort(sortUserByRegistrationDate);
    },

    approveBuddy: async (id: string): Promise<boolean> => {
        try {
            await ApiService.post(`/buddies/${id}/approve`);
            return true;
        } catch (e) {
            return false;
        }
    },

    rejectBuddy: async (id: string): Promise<boolean> => {
        try {
            await ApiService.post(`/buddies/${id}/reject`);
            return true;
        } catch (e) {
            return false;
        }
    }
}


