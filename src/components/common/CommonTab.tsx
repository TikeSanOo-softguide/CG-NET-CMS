import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslation } from 'react-i18next'

type Filter = {
  value: string
  labelKey?: string
  label?: string
}

interface CommonTabProps {
  filters: Filter[]
  activeValue: string
  onValueChange: (value: string) => void
}

export default function CommonTab({
  filters,
  activeValue,
  onValueChange,
}: CommonTabProps) {
  const { t } = useTranslation()

  return (
    <div className="mb-5 w-full max-w-full overflow-x-auto overscroll-x-contain pb-1">
      <Tabs
        value={activeValue}
        onValueChange={onValueChange}
        className="w-max min-w-full"
      >
        <div className="flex w-max min-w-full justify-start px-1 sm:justify-center">
          <TabsList
            className="
              inline-flex
              h-auto
              min-w-max
              w-auto
              items-center
              justify-start
              gap-0.5
              rounded-full
              border
              border-slate-100
              bg-white
              p-1
              shadow-sm

              sm:gap-1
              sm:p-1.5
            "
          >
            {filters.map(({ value, labelKey, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="
                  flex
                  h-9
                  shrink-0
                  items-center
                  justify-center
                  whitespace-nowrap
                  rounded-full
                  px-4
                  text-xs
                  font-medium
                  text-gray-500
                  outline-none
                  transition-all

                  hover:bg-gray-50
                  hover:text-font-blue

                  data-[state=active]:bg-blue-50
                  data-[state=active]:font-semibold
                  data-[state=active]:text-font-blue
                  data-[state=active]:shadow-none
                  data-[state=active]:hover:bg-blue-50

                  sm:h-11
                  sm:px-5
                  sm:text-sm
                "
              >
                {label ?? t(labelKey ?? '')}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>
    </div>
  )
}