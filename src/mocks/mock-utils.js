import { handlers } from "./handlers";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

export const mockAxiosAdapter = () => {
  let mock = new MockAdapter(axios);
  handlers.map((mockUrl) => {
    mock.onGet(mockUrl.url).reply(200, mockUrl.responseBody);
  });
  return mock;
};
