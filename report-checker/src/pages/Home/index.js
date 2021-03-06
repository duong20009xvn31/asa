import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory
} from 'react-router-dom'
import { Params, NavbarData } from './defaultValue'
import {
  Container,
  Wrapper,
  NavbarArea,
  NavbarHeader,
  NavbarBody,
  NavbarFooter,
  MainArea,
  MainHeader,
  HeaderLeft,
  HeaderRight,
  MainBody
} from './elements'
import AppLogo from './../../components/commons/AppLogo/index'
import AppName from './../../components/commons/AppName/index'
import Navbar from './../../features/Navbar/index'
import ButtonIcon from './../../components/commons/ButtonIcon/index'
import ButtonToggle from './../../components/commons/ButtonToggle/index'
import Version from './../../components/commons/Version/index'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme, selectTheme } from './../../features/Theme/themeSlice'
import { alertOn } from './../../features/Alert/alertSlice'
import {
  setDefaultItemTotals,
  selectDataCollection
} from './../../features/DataCollection/dataCollectionSlice'
import { resetStateWhenLogout } from '../../features/ResetState/resetStateSlice'
import { selectNavbar, toggleNavbar } from './../../features/Navbar/navbarSlice'

const Home = () => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const theme = useSelector(selectTheme)
  const dataCollection = useSelector(selectDataCollection)
  const dispatch = useDispatch()
  const navbar = useSelector(selectNavbar)

  const logoutButtonHandle = () => {
    dispatch(
      alertOn({
        text: 'Bạn sẽ đăng xuất!',
        okHandle: () => {
          dispatch(resetStateWhenLogout())
          history.push('/login')
        }
      })
    )
  }
  const draftDataButtonHandle = () => {
    const items = dataCollection.itemTotals
    if (items.length) {
      localStorage.setItem('itemsDraft', JSON.stringify(items))
      dispatch(
        alertOn({
          text: 'Đã lưu'
        })
      )
      return
    }
    dispatch(
      alertOn({
        text: 'Dữ liệu trống'
      })
    )
  }
  const restoreDraftDataButtonHandle = () => {
    const items = JSON.parse(localStorage.getItem('itemsDraft'))
    if (items?.length) {
      dispatch(setDefaultItemTotals({ items: items }))
      dispatch(
        alertOn({
          text: 'Đã khôi phục'
        })
      )
      return
    }
    dispatch(
      alertOn({
        text: 'Dữ liệu trống'
      })
    )
  }

  return (
    <>
      <Redirect from={path} to={path + NavbarData?.[0].linkTo} />
      <Container>
        <Wrapper>
          <NavbarArea isOpen={navbar.isOpen}>
            <NavbarHeader>
              <AppLogo size={Params.AppLogo.size} />
              {navbar.isOpen && <AppName size={Params.AppName.size} />}
            </NavbarHeader>
            <NavbarBody>
              <Navbar data={NavbarData} />
            </NavbarBody>
            <NavbarFooter>
              <ButtonIcon
                size={Params.LogoutButton.size}
                icon={Params.LogoutButton.icon.normal}
                iconSelected={Params.LogoutButton.icon.selected}
                tooltip={Params.LogoutButton.tooltip}
                onClick={logoutButtonHandle}
              />
              {navbar.isOpen && <Version />}
            </NavbarFooter>
          </NavbarArea>
          <MainArea>
            <MainHeader>
              <HeaderLeft>
                <ButtonIcon
                  size={Params.ToggleMenuButton.size}
                  icon={Params.ToggleMenuButton.icon.normal}
                  iconSelected={Params.ToggleMenuButton.icon.selected}
                  tooltip={Params.ToggleMenuButton.tooltip}
                  onClick={() => dispatch(toggleNavbar())}
                />
                <ButtonIcon
                  size={Params.RestoreButton.size}
                  icon={Params.RestoreButton.icon.normal}
                  iconSelected={Params.RestoreButton.icon.selected}
                  tooltip={Params.RestoreButton.tooltip}
                  onClick={restoreDraftDataButtonHandle}
                />
                <ButtonIcon
                  size={Params.DraftButton.size}
                  icon={Params.DraftButton.icon.normal}
                  iconSelected={Params.DraftButton.icon.selected}
                  tooltip={Params.DraftButton.tooltip}
                  onClick={draftDataButtonHandle}
                />
              </HeaderLeft>
              <HeaderRight>
                <ButtonToggle
                  size={Params.ToggleThemeButton.size}
                  icon1={Params.ToggleThemeButton.icon.type1}
                  icon2={Params.ToggleThemeButton.icon.type2}
                  isLeft={theme.isLightTheme}
                  tooltip={Params.ToggleThemeButton.tooltip}
                  onClickHandle={() => dispatch(toggleTheme())}
                />
              </HeaderRight>
            </MainHeader>
            <MainBody>
              <Switch>
                {NavbarData?.map((item, index) => (
                  <Route key={index} path={path + item.linkTo}>
                    {item.element}
                  </Route>
                ))}
              </Switch>
            </MainBody>
          </MainArea>
        </Wrapper>
      </Container>
    </>
  )
}

export default Home
