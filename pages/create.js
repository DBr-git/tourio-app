import styled from "styled-components";
import { useRouter } from "next/router";
import Form from "../components/Form";
import { StyledLink } from "../components/StyledLink";
import useSWR from "swr";

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();
  const { mutate } = useSWR(`/api/places/`);

  async function addLocation(event) {
    console.log("adding place");
    event.preventDefault();

    const formData = new FormData(event.target);
    const LocationData = Object.fromEntries(formData);

    const response = await fetch(`/api/places/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LocationData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    // mutate();
    router.push("/");
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <StyledBackLink href="/">back</StyledBackLink>
      <Form onSubmit={addLocation} formName={"add-place"} />
    </>
  );
}
