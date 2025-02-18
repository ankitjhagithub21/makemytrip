const HomePageLoading = () => {
    
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12">
    {
        [1, 2, 3,4,5,6].map((num,index) => (
            <div className="card border-2 rounded-2xl p-3" key={index}>
              <div className="overflow-hidden rounded-2xl bg-gray-300 animate-pulse h-48 w-full"></div>
              <div className="card-body p-2">
                <div className="h-6 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
                <div className="h-6 bg-gray-300 animate-pulse rounded w-1/2"></div>
              </div>
            </div>
          ))
    }
    </div>
  )
}

export default HomePageLoading