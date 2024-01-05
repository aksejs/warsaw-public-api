import { WarsawPublicApi } from "../src/api";
import { API_KEY } from "./setup-tests";

afterEach(() => {
  jest.clearAllMocks();
});

describe("cultureServiceTest", () => {
  if (!API_KEY) {
    return console;
  }

  const api = new WarsawPublicApi({
    apikey: API_KEY,
  });

  it("Should return list of internet access data, limited to 2.", async () => {
    const res = await api.educationApi.getInternetAccess({ limit: 2 });

    expect(res.data.result.records.length).toBe(2);
  });
});
