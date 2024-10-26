import {Connection} from "src/types/connections";
import {ApiService} from "./apiService";

export const ApiConnection = {
  _path: '/connections',

  getConnectionByBuddyId: async (id: string) : Promise<Connection[]> =>
    ApiService.get(`${ApiConnection._path}/buddies/${id}`)
}

