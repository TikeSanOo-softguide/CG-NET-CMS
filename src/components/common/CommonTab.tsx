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
    <div className="mb-8 overflow-x-auto pb-0">
      <Tabs value={activeValue} onValueChange={onValueChange}>
        <TabsList
          className="
            flex
            w-max
            min-w-full
            justify-center
            sm:justify-center
            h-auto
            gap-0
            rounded-none
            bg-transparent
            p-0
          "
        >
          {filters.map(({ value, labelKey, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="
                border-b
                border-app-primary
                relative
                h-[58px]
                min-w-[140px]
                rounded-t-[16px]
                rounded-b-none
                bg-transparent
                px-8
                text-base
                font-medium
                text-font-black
                shadow-none
                transition-all

                data-[state=active]:bg-app-card
                data-[state=active]:text-font-blue
                data-[state=active]:font-semibold

                data-[state=active]:after:absolute
                data-[state=active]:after:bottom-0
                data-[state=active]:after:left-0
                data-[state=active]:after:right-0
                data-[state=active]:after:h-[4px]
                data-[state=active]:after:bg-font-blue

                hover:bg-white/10
                hover:text-font-blue

                data-[state=active]:hover:bg-[#DCE9FF]
                data-[state=active]:hover:text-font-blue
              "
            >
              {label ?? t(labelKey ?? '')}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  )
}