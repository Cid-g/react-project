import React, { useEffect, useState } from "react";
import Header from "../layout/HeaderWrapper.js";
import ProfileAvatar from "./ProfileAvatar.js";
import Logo from "./Logo";
import { Toolbar, Typography } from "@mui/material";
import HamburgerMenu from "./Menu.js";

function UserHeader() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.firstName || !data.userType) {
          throw new Error("Invalid user data received");
        }

        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
        localStorage.removeItem("token");
        window.location.href = "/login";
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6">Error: {error}</Typography>;

  return (
    <Header>
      <Toolbar>
        <HamburgerMenu />
        <Logo to={user?.userType === "Teacher" ? "/teacher" : "/user"} />
        <Typography variant="h6" style={{ marginRight: "16px" }}>
          Welcome, {user.firstName}
        </Typography>
        <ProfileAvatar userType={user.userType} />
      </Toolbar>
    </Header>
  );
}

export default UserHeader;
