import React from "react";
import "./App.css";
import { SortFilter, User } from "./type";
import UsersTable from "./components/UsersTable";

const App = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [colorRows, setColorRows] = React.useState<Boolean>(false);
  const [sortType, setSortType] = React.useState<SortFilter>(SortFilter.NONE);
  const [filterCountry, setFilterCountry] = React.useState<string | null>(null);
  const initialUsers = React.useRef<User[]>([]);
  React.useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((contacts) => {
        setUsers(contacts.results);
        initialUsers.current = contacts.results;
      });
  }, []);

  const toggleColor = () => {
    setColorRows(!colorRows);
  };
  const changeSorting = (sort: SortFilter) => {
    setSortType(sort);
  };
  const handleSort = () => {
    const sortValue =
      sortType === SortFilter.NONE ? SortFilter.COUNTRY : SortFilter.NONE;
    setSortType(sortValue);
  };
  const handleDelete = (uuid: string) => {
    const filteredList = sortedUsers.filter((contact) => {
      return contact.login.uuid !== uuid;
    });
    setUsers(filteredList);
  };
  const handleReset = () => {
    setUsers(initialUsers.current);
  };

  const filteredUsers = React.useMemo(() => {
    return filterCountry !== null
      ? users.filter((user) => {
          return user.location.country
            .toLocaleLowerCase()
            .includes(filterCountry.toLocaleLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = React.useMemo<User[]>(() => {
    if (sortType === SortFilter.NONE) return filteredUsers;
    if (sortType === SortFilter.NAME) {
      return [...filteredUsers].sort((a, b) => {
        return a.name.first.localeCompare(b.name.first);
      });
    }
    if (sortType === SortFilter.LAST) {
      return [...filteredUsers].sort((a, b) => {
        return a.name.last.localeCompare(b.name.last);
      });
    }
    if (sortType === SortFilter.COUNTRY) {
      return [...filteredUsers].sort((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      });
    }
    return filteredUsers;
  }, [filteredUsers, sortType]);

  return (
    <section>
      <h1>Lista de usuarios</h1>
      <header>
        <button onClick={toggleColor}>Colorea Filas</button>
        <button onClick={handleSort}>Ordenar Por país</button>
        <button onClick={handleReset}>Restaurar el estado inicial</button>
        <input
          type="text"
          placeholder="Fliltra por país"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        <UsersTable
          users={sortedUsers}
          colorRows={colorRows}
          handleDelete={handleDelete}
          changeSorting={changeSorting}
        />
      </main>
    </section>
  );
};

export default App;
