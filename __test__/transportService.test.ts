import { WarsawPublicApi } from "../src/api";
import { API_KEY } from "./setup-tests";

beforeAll(() => {
  const SECONDS = 1000;
  jest.setTimeout(20 * SECONDS)
})

afterEach(() => {
  jest.clearAllMocks();
});

describe("transportService test", () => {
  const api = new WarsawPublicApi({
    apikey: API_KEY as string,
  });

  it("Should return dictionary", async () => {
    const res = await api.transportApi.getDictionary();

    expect(res.data.result.miejsca).toBeDefined();
  });

  it("Should return timetable lines", async () => {
    const res = await api.transportApi.getTimetableLines({
      busstopId: 7009,
      busstopNr: "01",
    });

    expect(res.data.result.length).toBeGreaterThan(0);
  });

  it("Should return list of bike routes limited to 2", async () => {
    const res = await api.transportApi.getTransportBikeRoutes({ limit: 2 });

    expect(res.data.result.featureMemberList.length).toBe(2);
  });

  it("Should return list of bike stations limited to 2", async () => {
    const res = await api.transportApi.getTransportBikeStations({ limit: 2 });

    expect(res.data.result.featureMemberList.length).toBe(2);
  });

  it("should return coords more than 0", async () => {
    const res = await api.transportApi.getStopsCoords({
      page: 1,
      size: 1,
      limit: 1,
    });
    expect(res.data.result.length).toBeGreaterThan(0);
  });

  it("Should return routes with first line ", async () => {
    const res = await api.transportApi.getUrbanTransportRoutes();
    expect(res.data.result).toHaveProperty("1");
  });

  it("should return coords more than 0", async () => {
    const res = await api.transportApi.getUrbanTransportRoutes();
    expect(res.data.result).toHaveProperty("1");
  });
});
