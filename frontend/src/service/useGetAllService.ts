import { useState, useEffect } from "react";
import axios from "axios";
import { Info, User } from "./types";

export const BASE_URL = "https://randomuser.me/api/";
export type UseGetAllServiceProps = {
  url: string;
  page: number;
  size: number;
  selectedGender: string;
};

export const useGetAllService = (
  props: UseGetAllServiceProps = {
    url: "",
    page: 1,
    size: 10,
    selectedGender: "",
  }
) => {
  const { url, page, size, selectedGender } = props;
  const [data, setData] = useState<User[]>();
  const [info, setInfo] = useState<Info>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(true);

  const URL = url ? `${BASE_URL}/${url}` : BASE_URL;
  const genderFilter = `&gender=${selectedGender}`;

  const filterCondition = selectedGender !== "" && selectedGender !== "all";

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}?page=${page}&results=${size}${
            filterCondition ? genderFilter : ""
          }`
        );
        if (mounted) {
          setData(response.data.results);
          setInfo(response.data.info);
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
  }, [url, page, size, URL, selectedGender, genderFilter, filterCondition]);

  return { data: data || [], pagination: info, error, loading };
};
