import type { NextApiRequest, NextApiResponse } from "next";
import "dotenv/config";
import axios from "axios";

type ResponseData = {
  message: string;
  data?: any;
  error?: string;
};

let user_data = "";

// TODO: Make cache update every 1 hour

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (user_data) {
    return res.status(200).json({
      message: "User fetched successfully from cache",
      data: user_data,
    });
  } else {
    try {
      const api_key = process.env.OSU_API_KEY;

      if (!api_key) {
        return res.status(500).json({
          message: "API key is missing",
          error: "OSU_API_KEY not set in environment variables",
        });
      }

      const user_id = "21901217";

      const response = await axios.get("https://osu.ppy.sh/api/get_user", {
        params: {
          k: api_key,
          u: user_id,
        },
      });

      if (response.data && response.data.length > 0) {
        user_data = response.data;

        return res
          .status(200)
          .json({ message: "User fetched successfully", data: response.data });
      } else {
        return res.status(404).json({
          message: "User not found",
          error: "No data returned from osu! API",
        });
      }
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Failed to fetch user", error: error.message });
    }
  }
}
