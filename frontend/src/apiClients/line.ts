import axios from "axios";
export type Setting = {
  lineToken: string;
  userId: string;
};

type Response = { lineToken: string; userId: string };

export const getLineSetting = async (): Promise<Response> => {
  const response = await axios.get(`http://localhost:3001/api/lineSetting`);
  return response.data;
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
