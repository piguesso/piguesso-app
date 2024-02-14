"use client";

import { Box, Tab, Tabs } from "@mui/material";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PeopleIcon from "@mui/icons-material/People";
import React, { useState } from "react";

type Props = {
  statsTab: React.ReactNode;
  gamesTab: React.ReactNode;
  friendsTab: React.ReactNode;
};

export default function ProfileNavigation({
  statsTab,
  gamesTab,
  friendsTab,
}: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const getTabStyling = (value: number): string => {
    return activeTab === value ? "" : "text-white";
  };

  return (
    <>
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="rounded-md bg-surface/60"
      >
        <Tabs
          variant="fullWidth"
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab
            className={getTabStyling(0)}
            label="Statistics"
            icon={<ShowChartIcon />}
            value={0}
          />
          <Tab
            className={getTabStyling(1)}
            label="Games"
            icon={<SportsEsportsIcon />}
            value={1}
          />
          <Tab
            className={getTabStyling(2)}
            label="Friends"
            icon={<PeopleIcon />}
            value={2}
          />
        </Tabs>
      </Box>
      <div>
        {activeTab === 0 && statsTab}
        {activeTab === 1 && gamesTab}
        {activeTab === 2 && friendsTab}
      </div>
    </>
  );
}
