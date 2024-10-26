import {Connection} from "src/types/connections";
import {ApiService} from "./apiService";

export const ApiConnection = {
  _path: '/connections',

  getConnections: async () : Promise<Connection[]> =>
    ApiService.get(`${ApiConnection._path}`),

  getConnectionByBuddyId: async (id: string) : Promise<Connection[]> =>
    ApiService.get(`${ApiConnection._path}/buddies/${id}`)
}

