import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("users")); 
      try {
        const response = await fetch("http://localhost:5000/api/users/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <TableContainer component={Paper}  sx={{pt: 10}}>
      <Table >
        <TableHead >
          <TableRow>
            <TableCell>Profile Picture</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Middle Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Year Level</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Section</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell></TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.middleName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.yearLevel}</TableCell>
              <TableCell>{user.course}</TableCell>
              <TableCell>{user.section}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;