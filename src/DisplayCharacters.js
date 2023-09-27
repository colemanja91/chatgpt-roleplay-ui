import { gql, useQuery } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      id
      name
      updatedAt
    }
  }
`;

export function DisplayCharacters() {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h3>Characters</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {data.characters.map(({ id, name, updatedAt }) => (
            <tr>
              <td>{id}</td>
              <td>{name}</td>
              <td>{updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

