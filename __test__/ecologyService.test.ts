import { WarsawPublicApi } from "../src/api";
import { API_KEY } from "./setup-tests";

afterEach(() => {
  jest.clearAllMocks();
});

describe("ecologyService test", () => {
  if (!API_KEY) {
    return console;
  }

  const api = new WarsawPublicApi({
    apikey: API_KEY,
  });
  it("Should return list of bushes, limited to 2.", async () => {
    const res = await api.ecologyApi.getBushes({ limit: 2 });

    expect(res.data.result.records.length).toBe(2);
  });

  it("Should return list of trees, limited to 2.", async () => {
    const res = await api.ecologyApi.getTrees({ limit: 2 });

    expect(res.data.result.records.length).toBe(2);
  });

  it("Should return air quality data.", async () => {
    const res = await api.ecologyApi.getAirQuality();

    expect(res.data.result.length).toBeGreaterThan(0);
  });

  it("Should return list of municipal wastes, limited to 2.", async () => {
    const res = await api.ecologyApi.getMunicipalWastes({ limit: 2 });

    expect(res.data.result.records.length).toBe(2);
  });
});
