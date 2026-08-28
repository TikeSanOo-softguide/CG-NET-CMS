import { useMemo, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Coins,
  Globe,
} from "lucide-react";

type Speed = 20 | 50 | 100 | 150;

type Package = {
  id: string;
  speed: Speed;
  duration: string;
};

type NetworkPackage = {
  name: string;
  packages: readonly Package[];
};

type PackageSelectionProps = {
  network: NetworkPackage;
};

type DurationOption = {
  months: number;
  label: string;
};

const durationOptions: DurationOption[] = [
  { months: 1, label: "1 Month" },
  { months: 3, label: "3 Months" },
  { months: 6, label: "6 Months" },
  { months: 12, label: "1 Year" },
];

const packagePrices: Record<Speed, Record<number, number>> = {
  20: {
    1: 188,
    3: 520,
    6: 980,
    12: 1800,
  },
  50: {
    1: 300,
    3: 820,
    6: 1500,
    12: 2800,
  },
  100: {
    1: 500,
    3: 1400,
    6: 2600,
    12: 4800,
  },
  150: {
    1: 700,
    3: 1950,
    6: 3600,
    12: 6800,
  },
};

const installationFee = 300;

export default function PackageSelection({
  network,
}: PackageSelectionProps) {
  const [selectedSpeed, setSelectedSpeed] = useState<Speed>(
    network.packages[0].speed
  );

  const [selectedDuration, setSelectedDuration] =
    useState(1);

  const selectedPackage = useMemo(() => {
    return (
      network.packages.find(
        (pkg) => pkg.speed === selectedSpeed
      ) ?? network.packages[0]
    );
  }, [network.packages, selectedSpeed]);

 const basePrice =
    packagePrices[selectedPackage.speed][selectedDuration];

  const totalPrice = basePrice + installationFee;

  const selectPackage = (pkg: Package) => {
    setSelectedSpeed(pkg.speed);

    const matchingDuration = durationOptions.find(
      (option) => option.label === pkg.duration
    );

    setSelectedDuration(matchingDuration?.months ?? 1);
  };

  const currentPackageIndex = network.packages.findIndex(
    (pkg) => pkg.speed === selectedSpeed
  );

  const previousPackage = () => {
    const currentIndex = currentPackageIndex === -1 ? 0 : currentPackageIndex;

    const previousIndex =
      currentIndex === 0 ? network.packages.length - 1 : currentIndex - 1;

    selectPackage(network.packages[previousIndex]);
  };

  const nextPackage = () => {
    const currentIndex = currentPackageIndex === -1 ? 0 : currentPackageIndex;

    const nextIndex =
      currentIndex === network.packages.length - 1 ? 0 : currentIndex + 1;

    selectPackage(network.packages[nextIndex]);
  };

  const selectedDurationIndex = durationOptions.findIndex(
    (option) => option.months === selectedDuration
  );

  const progressPercent =
    selectedDurationIndex >= 0
      ? (selectedDurationIndex / (durationOptions.length - 1)) * 100
      : 0;

  return (
    <section className="px-4 py-1">
      <div className="mx-auto max-w-[1400px]">
        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            {/* PACKAGE CAROUSEL */}
            <div className="relative">
              {/* LEFT ARROW */}
              <button
                type="button"
                onClick={previousPackage}
                className="absolute left-0 top-1/2 z-20 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition hover:bg-neutral-50"
                aria-label="Previous package"
              >
                <ChevronLeft size={19} />
              </button>

              {/* PACKAGE CARDS */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {network.packages.map((pkg) => {
                  const active = selectedPackage.id === pkg.id;

                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => selectPackage(pkg)}
                      className={[
                        "relative min-w-0 rounded-2xl border p-5 text-left transition-all duration-200",
                        active
                          ? "border-app-primary bg-white shadow-lg ring-2 ring-sky-100"
                          : "border-neutral-200 bg-white/80 shadow-sm hover:-translate-y-0.5 hover:shadow-md",
                      ].join(" ")}
                    >
                      {/* CHECK */}
                      {active && (
                        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-app-primary text-white">
                          <Check size={14} />
                        </div>
                      )}

                      {/* PACKAGE NAME */}
                      <div className="pr-8">
                        <p
                          className={[
                            "text-sm font-bold",
                            active
                              ? "text-font-blue"
                              : "text-neutral-800",
                          ].join(" ")}
                        >
                         {network.name}
                        </p>
                      </div>

                      {/* SPEED */}
                      <div className="mt-4">
                        <p
                          className={[
                            "text-2xl font-bold",
                            active
                              ? "text-font-blue"
                              : "text-neutral-900",
                          ].join(" ")}
                        >
                          {pkg.speed}
                          <span className="ml-1 text-sm font-medium">
                            Mbps
                          </span>
                        </p>
                      </div>

                    </button>
                  );
                })}
              </div>

              {/* RIGHT ARROW */}
              <button
                type="button"
                onClick={nextPackage}
                className="absolute right-0 top-1/2 z-20 flex h-9 w-9 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition hover:bg-neutral-50"
                aria-label="Next package"
              >
                <ChevronRight size={19} />
              </button>
            </div>

            {/* CAROUSEL DOTS */}
            <div className="mt-4 flex justify-center gap-1.5">
              {network.packages.map((pkg) => {
                const active = selectedPackage.id === pkg.id;

                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => selectPackage(pkg)}
                    className={[
                      "h-1.5 rounded-full transition-all",
                      active
                        ? "w-6 bg-app-primary"
                        : "w-1.5 bg-neutral-300",
                    ].join(" ")}
                    aria-label={`Select sds`}
                  />
                );
              })}
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
              {/* DURATION CARD */}
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="text-sm font-semibold text-neutral-800">
                    Duration Selector
                  </h2>

                  <p className="mt-1 text-xs text-neutral-400">
                    Choose your subscription period
                  </p>
                </div>

                <div className="relative px-2">
                  {/* BASE LINE */}
                  {/* LINE */}
                  <div className="absolute left-5 right-4 top-[6px] h-1 rounded-full bg-neutral-200">
                    {/* PROGRESS */}
                    <div
                      className="h-full rounded-full bg-app-primary transition-all duration-300"
                      style={{
                        width: `${progressPercent}%`,
                      }}
                    />
                  </div>

                  {/* OPTIONS */}
                  <div className="relative flex justify-between">
                    {durationOptions.map((option) => {
                      const active =
                        selectedDuration === option.months;

                      return (
                        <button
                          key={option.months}
                          type="button"
                          onClick={() =>
                            setSelectedDuration(option.months)
                          }
                          className="flex min-w-0 flex-col items-center"
                        >
                          <span
                            className={[
                              "h-4 w-4 rounded-full border-2 bg-white transition-all",
                              active
                                ? "border-app-primary bg-app-primary"
                                : "border-neutral-300",
                            ].join(" ")}
                          />

                          <span
                            className={[
                              "mt-3 text-xs font-medium",
                              active
                                ? "text-neutral-900"
                                : "text-neutral-500",
                            ].join(" ")}
                          >
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* INSTALLATION CARD */}
              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-5 shadow-sm">
                <div className="flex h-full items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-600">
                      <Coins size={21} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-neutral-700">
                        Installation Fee
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-lg font-bold text-neutral-900">
                    {installationFee.toLocaleString()} 元
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-neutral-200 bg-white/90 p-5 shadow-lg xl:sticky xl:top-5">
            <div className="border-b border-neutral-200 pb-4">
              <h2 className="text-lg font-bold text-neutral-900">
                Your Selection
              </h2>

              <p className="mt-1 text-xs text-neutral-400">
                Review your package
              </p>
            </div>

            <div className="space-y-5 pt-5">
              {/* PACKAGE */}
              <div>
                <p className="text-xs text-neutral-400">
                  Package
                </p>

                <div className="mt-2 flex items-center gap-2">
                  <Globe
                    size={16}
                    className="text-neutral-500"
                  />

                  <p className="text-sm font-semibold text-neutral-900">
                    {network.name} -{" "}
                    {selectedPackage.speed} Mbps
                  </p>
                </div>
              </div>

              {/* DURATION */}
              <div>
                <p className="text-xs text-neutral-400">
                  Duration
                </p>

                <p className="mt-2 text-sm font-medium text-neutral-800">
                  {selectedDuration === 12
                    ? "1 Year"
                    : `${selectedDuration} Month${
                        selectedDuration > 1 ? "s" : ""
                      }`}
                </p>
              </div>

              {/* PRICE */}
              <div className="border-t border-neutral-200 pt-1">       
                <div className="mt-1 flex items-end justify-between gap-3">
                  <span className="text-sm text-neutral-500">
                    Total Price
                  </span>

                  <span className="text-2xl font-bold text-neutral-900">
                    {totalPrice.toLocaleString()} 元
                  </span>
                </div>
              </div>

              {/* PRICE BREAKDOWN */}
              <div className="rounded-xl bg-neutral-50 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-500">
                    Package
                  </span>

                  <span className="font-medium text-neutral-800">
                    {basePrice.toLocaleString()} 元
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">
                    Installation Fee
                  </span>

                  <span className="font-medium text-neutral-800">
                    {installationFee.toLocaleString()} 元
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">
                    Adds on
                  </span>

                  <span className="font-medium text-neutral-800">
                    {installationFee.toLocaleString()} 元
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}