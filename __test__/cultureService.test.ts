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

  it("Should return list of culture objects, limited to 2.", async () => {
    const res = await api.cultureApi.getTheatres({ limit: 2 });

    expect(res.data.result.featureMemberList.length).toBe(2);
  });
});
