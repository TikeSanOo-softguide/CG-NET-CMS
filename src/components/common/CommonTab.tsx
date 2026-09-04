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

export default function CommonTab({ filters, activeValue, onValueChange }: CommonTabProps) {
  const { t } = useTranslation()

  return (
    <div className="mb-8 overflow-x-auto pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <Tabs value={activeValue} onValueChange={onValueChange}>
        <div className="flex justify-center sm:justify-center min-w-max px-1">
          <TabsList
            className="
              inline-flex
              items-center
              justify-center
              h-auto
              gap-1
              rounded-full
              bg-white
              border
              border-slate-100
              p-1.5
              shadow-sm
            "
          >
            {filters.map(({ value, labelKey, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  h-10 sm:h-12
                  min-w-[120px] sm:min-w-[140px]
                  rounded-full
                  px-6
                  text-sm sm:text-base
                  font-medium
                  text-gray-500
                  transition-all
                  outline-none

                  data-[state=active]:bg-blue-50
                  data-[state=active]:text-font-blue
                  data-[state=active]:font-semibold
                  data-[state=active]:shadow-none

                  hover:text-font-blue
                  hover:bg-gray-50
                  data-[state=active]:hover:bg-blue-50
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
