import styled from "styled-components";
import Card from "../components/Card";
import useSWR from "swr";
import { StyledLink } from "../components/StyledLink";

const ListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;
const FixedLink = styled(StyledLink)`
  position: fixed;
  bottom: 50px;
  right: 50px;
`;

export default function Home() {
  const { data, isLoading } = useSWR("/api/places", { fallbackData: [] });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <ListContainer>
        {data.map((location) => {
          return (
            <li key={location._id}>
              <Card
                name={location.name}
                image={location.image}
                location={location.location}
                id={location._id}
              />
            </li>
          );
        })}
      </ListContainer>
      <FixedLink href="/create">+ place</FixedLink>
    </>
  );
}
