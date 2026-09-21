import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type DropdownCategory = {
    key: string
    labelKey: string
    icon: LucideIcon
    to: string
}

interface CommonDropdownProps {
    categories: readonly DropdownCategory[]
    labelKey: string
    onClose?: () => void
}

export function CommonDropdown({ categories, labelKey, onClose }: CommonDropdownProps) {
    const { t } = useTranslation()
    const location = useLocation()
    const isActive = categories.some(({ to }) => location.pathname === to.split('?')[0])

    return (
        <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
            <span
                    className={cn(
                    'inline-flex cursor-pointer items-center rounded-md px-2 py-2',
                    'text-base font-medium font-heading',
                    'hover:bg-accent hover:text-accent-foreground xl:px-3',
                    'outline-none ring-0',
                    'focus:outline-none focus:ring-0',
                    'focus-visible:outline-none focus-visible:ring-0',
                    'focus-visible:ring-offset-0',
                )}
                role="button"
                tabIndex={0}
            >
                <span className="relative inline-flex items-center gap-1">
                    <span className={cn(isActive && 'bg-gradient-font bg-clip-text text-transparent')}>
                        {t(labelKey)}
                    </span>
                    <ChevronDown
                        className={cn('h-3.5 w-3.5 shrink-0 opacity-60', isActive ? 'text-font-blue' : 'text-current')}
                        aria-hidden="true"
                    />
                    <span
                        className={cn(
                            'absolute inset-x-0 -bottom-[6px] h-0.5 origin-left transform rounded-full bg-gradient-font transition-all duration-300',
                            isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                        )}
                    />
                </span>
            </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="start"
            side="bottom"
            className="w-56 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0"
        >
            <DropdownMenuLabel className="font-heading text-base font-medium text-font-black">
            {t(labelKey)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map(({ key, labelKey: categoryLabelKey, icon: Icon, to }) => (
            <DropdownMenuItem key={key} asChild>
                <NavLink
                to={to}
                onClick={onClose}
                className={({ isActive: itemIsActive }) =>
                    cn(
                    'flex cursor-pointer items-center gap-2 rounded-md border-0 px-3 py-2 text-base font-heading font-medium outline-none ring-0 transition-colors hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                    itemIsActive ? 'bg-gradient-font bg-clip-text text-transparent' : 'text-font-black'
                    )
                }
                >
                <Icon className="h-4 w-4 shrink-0 text-font-blue" aria-hidden="true" />
                {t(categoryLabelKey)}
                </NavLink>
            </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
        </DropdownMenu>
    )
}