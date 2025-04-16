import { client } from "@/components/Wrapper/Wrapper";
import { REFETCH_ACCESS_TOKEN } from "@/graphql";

// Function to refresh the access token
export const refreshAccessToken = async () => {
  try {
    const { data } = await client.mutate({
      mutation: REFETCH_ACCESS_TOKEN,
    });
    const newAccessToken = data?.refetchAccessToken?.accessToken;

    if (!newAccessToken) {
      throw new Error("Failed to refresh access token");
    }
    localStorage.setItem("accessToken", newAccessToken);
    return { accessToken: newAccessToken };
  } catch (error) {
    return { accessToken: null };
  }
};
