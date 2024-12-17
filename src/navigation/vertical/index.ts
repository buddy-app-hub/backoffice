// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

// TODO: sidebar
const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'mdi:home-outline',
      path: '/'
    },
    {
      title: 'Buddies',
      icon: 'mdi:human-greeting',
      path: '/buddies'
    },
    {
      title: 'Adultos Mayores',
      icon: 'mdi:human-cane',
      path: '/elders'
    },
  ]
}

export default navigation
