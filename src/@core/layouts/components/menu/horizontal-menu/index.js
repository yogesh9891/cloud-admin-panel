// ** Horizontal Menu Components
import HorizontalNavMenuItems from './HorizontalNavMenuItems'
import { useSkin } from '@hooks/useSkin'
import NavbarUser from '../../navbar/NavbarUser'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const HorizontalMenu = ({ menuData }) => {
  const role = useSelector(state => state?.auth?.userData?.role)
  const [menuDataArr, setMenuDataArr] = useState(menuData)

  const { skin, setSkin } = useSkin()
  useEffect(() => {
    let tempArr = menuData
    // console.log(role, "role")
    if (tempArr && tempArr.length > 0) {
      tempArr = tempArr.filter(el => el.roleArr && el.roleArr.length > 0 && role && role !== "" && el.roleArr.some(ele => ele === role)).map(el => {
        if (el.children && el.children.length) {
          el.children = el.children.filter(ele => ele.roleArr && ele.roleArr.length > 0 && role && role !== "" && ele.roleArr.some(elex => elex === role)).map(elm => {
            if (elm.children && elm.children.length) {
              elm.children = elm.children.filter(elex => elex.roleArr && elex.roleArr.length > 0 && role && role !== "" && elex.roleArr.some(elexm => elexm === role))
            }
            return { ...elm }
          })
        }
        return { ...el }
      })
    }
    setMenuDataArr([...tempArr])
  }, [menuData, role])
  return (
    <div className='navbar-container main-menu-content'>
      <ul className='nav navbar-nav' id='main-menu-navigation'>
        <HorizontalNavMenuItems submenu={false} items={menuDataArr} />
        <NavbarUser skin={skin} setSkin={setSkin} />
      </ul>
    </div>
  )
}

export default HorizontalMenu
