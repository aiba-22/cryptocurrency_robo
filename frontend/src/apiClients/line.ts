import axios from "axios";

export const fetchLine = async (): Promise<{
  lineToken: string;
  userId: string;
}> => {
  const response = await axios.get(`http://localhost:3001/api/line`);
  return response.data;
};

export const createLine = async (request: {
  lineToken: string;
  userId: string;
}): Promise<void> => {
  await axios.post("http://localhost:3001/api/line", request);
};

export const updateLine = async (request: {
  id: number;
  lineToken: string;
  userId: string;
}): Promise<void> => {
  await axios.put("http://localhost:3001/api/line", request);
};

export const sendLineNotification = async ({
  id,
  targetPrice,
}: {
  id: number;
  targetPrice: number;
}) => {
  const result = await axios.post<string>(
    "http://localhost:3001/api/notification/line",
    {
      id,
      price: targetPrice,
    }
  );
  return result.data;
};
