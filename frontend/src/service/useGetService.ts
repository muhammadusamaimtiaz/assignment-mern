import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "./types";

export const BASE_URL = "https://randomuser.me/api/";
export type UseGetAllServiceProps = {
  url: string;
  seed?: string;
  loginId?: string;
};

export const useGetService = (
  props: UseGetAllServiceProps = { url: "", seed: "", loginId: "" }
) => {
  const { url, seed, loginId } = props;
  const [data, setData] = useState<User>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(true);

  const URL = url ? `${BASE_URL}/${url}` : BASE_URL;

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}?seed=${seed}&login.username=${loginId}`
        );
        if (mounted) {
          setData(response.data.results[0]);
          setLoading(false);
        }
      } catch (error: unknown) {
        if (mounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [url, URL, seed, loginId]);

  return { data: data, error, loading };
};
