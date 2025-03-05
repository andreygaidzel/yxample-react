import { useFeatureSlicedDebug } from '@/shared/lib'
import css from './AdBlock.module.css'

export function AdBlock() {
  const { rootAttributes } = useFeatureSlicedDebug('widget/AdBlock')

  return (
    <div {...rootAttributes} className={css.root}>
      <img className={css['ad-image']} src="https://storage.pixteller.com/designs/designs-videos/2086929-5fe0bd38247fa/thumb.gif"/>
    </div>
  )
}
