import {User, UserFields, UserPersonalDataFields} from "src/types/user";
import {ApiService} from "./apiService";

const sortUserByRegistrationDate = (a: User, b: User) =>
  a[UserFields.RegistrationDate] > b[UserFields.RegistrationDate] ? -1 : 1;

export const ApiUser = {

  fetchUsers: async ({ searchElders, searchBuddies} = { searchElders: true, searchBuddies: true }): Promise<User[]> => {
    const promises = [];
    if (searchElders) promises.push(ApiService.get('/elders'));

    if (searchBuddies) promises.push(ApiService.get('/buddies'));

    const responses = await Promise.all(promises);

    if (!responses || !responses.length) return [];

    const users: User[] = responses.flat();

    return users.filter(x => !!(x[UserFields.PersonalData]?.[UserPersonalDataFields.FirstName])).sort(sortUserByRegistrationDate);
  },

  getBuddyById: async (id: string): Promise<User> => ApiService.get(`/buddies/${id}`),

  getElderById: async (id: string): Promise<User> => ApiService.get(`/elders/${id}`),

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


