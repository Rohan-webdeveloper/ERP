import { useEffect, useState } from "react";
import { supabase } from "../pages/supabaseClient";
import "./Assistant.css";

export default function UserList({ onSelectUser, currentUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .neq("id", currentUser.id); // exclude current user
      setUsers(data || []);
    };
    fetchUsers();
  }, [currentUser]);

  return (
    <div className="user-list">
      <h3>Contacts</h3>
      {users.map((u) => (
        <div
          key={u.id}
          className="user-item"
          onClick={() => onSelectUser(u)}
        >
          {u.name}
        </div>
      ))}
    </div>
  );
}
