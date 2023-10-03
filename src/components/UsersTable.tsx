import { SortFilter, User } from "../type";

interface Props {
  users: User[];
  colorRows: Boolean;
  handleDelete: (uuid: string) => void;
  changeSorting: (sort: SortFilter) => void;
}

const UsersTable = ({
  users,
  colorRows,
  handleDelete,
  changeSorting,
}: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Foto</th>
          <th
            className="pointer"
            onClick={() => changeSorting(SortFilter.NAME)}
          >
            Nombre
          </th>
          <th
            className="pointer"
            onClick={() => changeSorting(SortFilter.LAST)}
          >
            Apellido
          </th>
          <th
            className="pointer"
            onClick={() => changeSorting(SortFilter.COUNTRY)}
          >
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const bgColor = index % 2 === 0 ? "#4a4a4a" : "#303030";
          const color = colorRows ? bgColor : "";
          return (
            <tr key={user.login.uuid} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} alt="" />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => handleDelete(user.login.uuid)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersTable;
