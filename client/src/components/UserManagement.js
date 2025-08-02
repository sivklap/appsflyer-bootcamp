import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Button, LinearProgress } from "@mui/material";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsers([]);
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4, mb: 4, mx: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Hello World Example</Typography>
        <Typography variant="body5">Response from API: {users.length} users</Typography>
        <Button
          variant="contained"
          onClick={() => fetchUsers()}
          sx={{ borderRadius: 2 }}
        >
          Get Users
        </Button>
      </Box>
       <>       
          {loading && (
              <Box sx={{ width: "100%", mt: 2 }}>
                <LinearProgress />
                <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
                  Loading users...
                </Typography>
              </Box>
          )}
          {!loading && (
            <Box         
            display="flex"
            flexDirection="column"
            justifyContent="space-between">
              {users.map((user) => (
                <Typography variant="body3">User: {user.name}</Typography>
              ))}
            </Box>
          )} 
        </>
    </Box>
  );
}

export default UserManagement;
