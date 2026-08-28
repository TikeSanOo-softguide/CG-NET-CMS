export default function OtherPackage() {
  return (
    <section className="px-4 py-1">
      <div className="mx-auto max-w-[1400px]">
        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    type="button"
                    className={[
                      "relative min-w-0 rounded-2xl border p-5 text-left transition-all duration-200"
                    ].join(" ")}
                  >                               
                  <div className="pr-8">
                    <p
                      className={[
                        "text-sm font-bold",
                    
                      ].join(" ")}
                    >
                      IPTV service
                    </p>
                  </div>

                  <div className="mt-4">
                    <p
                      className={[
                        "text-2xl font-bold",
                        
                      ].join(" ")}
                    >
                      300
                      <span className="ml-1 text-sm font-medium">
                        元
                      </span>
                    </p>
                  </div>
                </button>
                <button
                    type="button"
                    className={[
                      "relative min-w-0 rounded-2xl border p-5 text-left transition-all duration-200"
                    ].join(" ")}
                  >                               
                  <div className="pr-8">
                    <p
                      className={[
                        "text-sm font-bold",
                    
                      ].join(" ")}
                    >
                      Router service
                    </p>
                  </div>

                  <div className="mt-4">
                    <p
                      className={[
                        "text-2xl font-bold",
                        
                      ].join(" ")}
                    >
                      300
                      <span className="ml-1 text-sm font-medium">
                        元
                      </span>
                    </p>
                  </div>
                </button>  
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}