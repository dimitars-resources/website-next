const Sponsors = () => {
  return (
    <div className="flex  h-40 w-full">
      <div className="flex space-x-2 size-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-full bg-zinc-900 rounded block" />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
