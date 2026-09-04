import { EmptyState } from "@/components/common/EmptyState";
import i18n from "@/lib/i18n";
import type { OtherPackage } from "@/types/package";
import type { Addon } from "@/types/package";
import { t } from "i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface OtherPackageProps {
  addons: Addon[];
}

const getAddonName = (addon: Addon) => {
    const nameMap = {
      en: addon.name.en,
      my: addon.name.my,
      zh: addon.name.zh,
    }
    return nameMap[i18n.language as keyof typeof nameMap] || addon.name.en
}
const VISIBLE_PACKAGES = 4

export default function OtherPackage({
  addons,
}: OtherPackageProps) {
  const [packageStartIndex, setPackageStartIndex] = useState(0)
  const hasPreviousPackage = packageStartIndex > 0
  const hasNextPackage = packageStartIndex + VISIBLE_PACKAGES < addons.length

  const previousPackage = () => {
    setPackageStartIndex((current) => Math.max(0, current - 1))
  }

  const visibleAddons = addons.slice( packageStartIndex, packageStartIndex + VISIBLE_PACKAGES );

  const nextPackage = () => {
    setPackageStartIndex((current) =>
      Math.min(
        addons.length - VISIBLE_PACKAGES,
        current + 1
      )
    )
  }

  const selectPackage = (index: number) => { setPackageStartIndex(index); };

  if (visibleAddons.length === 0) {
    return (
      <EmptyState
        title={t('common.noData')}
        description={t('common.emptyStateDesc')}
      />
    )
  }

  return (
    <section className="px-4 mb-5">
      <div className="mx-auto max-w-[1400px]">
        {/* MAIN LAYOUT */}
        <div className="flex justify-center">
          <div className="w-full max-w-[1200px] min-w-0">
            <div className="relative">
              {hasPreviousPackage && (
                <button
                  type="button"
                  onClick={previousPackage}
                  className="absolute -left-5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition hover:bg-neutral-50"
                  aria-label="Previous package"
                >
                  <ChevronLeft size={19} />
                </button>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {visibleAddons.map((addon) => (
                <button
                  key={addon.id}
                  type="button"
                  className={[
                    "relative min-w-0 rounded-2xl border p-5 text-left transition-all duration-200",
                  ].join(" ")}
                >
                  <div className="pr-8">
                    <p className="text-sm font-bold">
                      {getAddonName(addon)}                  
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold">
                      {Math.round(addon.price)}
                      <span className="ml-1 text-sm font-medium">
                        元
                      </span>
                    </p>
                  </div>
                </button>
                ))}
              </div>

              {hasNextPackage && (
                <button
                  type="button"
                  onClick={nextPackage}
                  className="absolute -right-5 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white shadow-md transition hover:bg-neutral-50"
                  aria-label="Next package"
                >
                  <ChevronRight size={19} />
                </button>
              )}
            </div>
            {addons.length > VISIBLE_PACKAGES && (
              <div className="mt-4 flex justify-center gap-1.5">
                {Array.from({
                  length: addons.length - VISIBLE_PACKAGES + 1,
                }).map((_, index) => {
                  const active = index === packageStartIndex;

                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => selectPackage(index)}
                      className={[
                        "h-1.5 rounded-full transition-all",
                        active
                          ? "w-6 bg-app-primary"
                          : "w-1.5 bg-neutral-300",
                      ].join(" ")}
                      aria-label={`Go to carousel position ${
                        index + 1
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
