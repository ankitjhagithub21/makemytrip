
const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex flex-col gap-5 items-center justify-center">
     <div className="loader"></div>
     <p className="mt-4 text-lg text-gray-700">Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;