import { useEffect } from "react";

import Header from "../../../components/layout/Header";

import ActivityTable from "../components/ActivityTable";

import useActivity from "../hooks/useActivity";

const ActivityLogs = () => {
  const {
    activities,
    getActivities,
  } = useActivity();

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div>
      <Header
        title="Activity Logs"
        subtitle="Track user activities"
      />

      <ActivityTable
        activities={activities}
      />
    </div>
  );
};

export default ActivityLogs;