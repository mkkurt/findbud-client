import { useGetStripeAccountLinkMutation } from "./paymentApiSlice";
const GetAccountLink = () => {
  const [getStripeAccountLink] = useGetStripeAccountLinkMutation();

  const handleContinueOnboarding = async () => {
    const result = await getStripeAccountLink();
    if (result.data) {
      window.open(result.data.url, "_blank").focus();
    } else {
      console.log("Error: ", result.error);
    }
  };
  return (
    <button onClick={handleContinueOnboarding}>Continue Onboarding</button>
  );
};

export default GetAccountLink;
