const DashboardPage = () => {
  return (
    <div className="flex h-full border-x border-white/5">
      <div className="h-full w-64 border-r border-white/5 bg-black/5 p-4">
        <ul>
          <li className="mb-2">
            <div className="hover:underline">Dashboard</div>
          </li>
          <li className="mb-2">
            <div className="hover:underline">Profile</div>
          </li>
          <li className="mb-2">
            <div className="hover:underline">Settings</div>
          </li>
        </ul>
      </div>
      <div className="flex-grow p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2">This is the dashboard page.</p>
      </div>
    </div>
  );
};

export default DashboardPage;
