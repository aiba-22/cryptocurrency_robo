import axios from "axios";

export const findLineAccount = async (): Promise<
  | {
      id: number;
      channelAccessToken: string;
      lineUserId: string;
    }
  | undefined
> => {
  const response = await axios.get(`http://localhost:3001/api/lineAccount`);
  return response.data;
};

export const createLineAccount = async (request: {
  channelAccessToken: string;
  lineUserId: string;
}): Promise<string> => {
  const result = await axios.post(
    "http://localhost:3001/api/lineAccount",
    request
  );
  return result.data;
};

export const updateLineAccount = async (request: {
  id: number;
  channelAccessToken: string;
  lineUserId: string;
}): Promise<string> => {
  const result = await axios.put(
    "http://localhost:3001/api/lineAccount",
    request
  );
  return result.data;
};

export const sendLineNotification = async (
  message: string
): Promise<{
  status: "success" | "tooManyRequests" | "badRequest" | "systemError";
}> => {
  const result = await axios.post(
    "http://localhost:3001/api/notification/sendLineTest",
    { message }
  );
  return result.data;
};
