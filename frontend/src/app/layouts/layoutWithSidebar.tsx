import { Announcement, Layout } from '@/shared/ui'
import { AdBlock } from '@/widgets/AdBlock'
import { DebugModeToggler } from '@/widgets/DebugModeToggler'
import { LayoutHeader } from '@/widgets/LayoutHeader'
import { LayoutProfileCard } from '@/widgets/LayoutProfileCard'

export const layoutWithSidebar = (
  <Layout
    bottomSlot={<DebugModeToggler />}
    sidebarSlot={<AdBlock />}
    headerSlot={<LayoutHeader rightContentSlot={<LayoutProfileCard />} />}
  />
)
