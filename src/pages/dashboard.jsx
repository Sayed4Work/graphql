import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Profile } from "../dashboard/profile.jsx";
import { Audit } from "../dashboard/audit.jsx";
import { Skills } from "../dashboard/skills.jsx";
import { TotalXP } from "../dashboard/totalXp.jsx";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from "@mui/icons-material/Paid";
import CodeIcon from "@mui/icons-material/Code";
import GroupsIcon from "@mui/icons-material/Groups";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import XpPerMonth from "../dashboard/xpPerMonth.jsx";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#2b2b2b",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with logout */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          maxWidth: "89vw", // <-- Add this line
          padding: "20px",
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Box>

      {/* Dashboard Content */}
      <Box
        sx={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "80%",
            display: "grid",
            gap: 2,
            gridTemplateColumns: "1fr 0.5fr",
          }}
        >
          {/* Cards stay the same */}
          <Card
            sx={{
              backgroundColor: "white",
              color: "black",
              height: "300px",
              borderRadius: "1rem",
              gridColumn: "span 2",
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              align="center"
              mt={"15px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <PersonIcon />
              User Information
            </Typography>
            <CardContent>
              <Profile />
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: "white",
              color: "black",
              height: "500px",
              borderRadius: "1rem",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              mt={"15px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              fontWeight="bold"
            >
              <GroupsIcon />
              Audits
            </Typography>
            <CardContent>
              <Audit />
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: "white",
              color: "black",
              height: "500px",
              borderRadius: "1rem",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              mt={"15px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              fontWeight="bold"
            >
              <CodeIcon />
              Skills
            </Typography>
            <CardContent>
              <Skills />
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: "white",
              color: "black",
              height: "500px",
              borderRadius: "1rem",
            }}
          >
            <Typography
              variant="h6"
              align="center"
              mt={"15px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
              fontWeight="bold"
            >
              <TrendingUpIcon />
              XP Per Month
            </Typography>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <XpPerMonth />
            </CardContent>
          </Card>

          <Card
            sx={{
              backgroundColor: "white",
              color: "black",
              height: "500px",
              borderRadius: "1rem",
            }}
          >
            <Typography
              fontWeight="bold"
              variant="h6"
              align="center"
              mt={"15px"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <PaidIcon />
              Total XP
            </Typography>
            <CardContent>
              <TotalXP />
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
