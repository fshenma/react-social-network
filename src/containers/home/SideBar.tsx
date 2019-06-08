import * as React from 'react'
import { NavLink } from 'react-router-dom'
// import MenuList from '@material-ui/core/MenuList'
import MenuItem from '@material-ui/core/MenuItem'
// import ListItem from '@material-ui/core/ListItem'
// import ListIcon from '@material-ui/core/ListItemIcon'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import SvgHome from '@material-ui/icons/Home'
import SvgFeedback from '@material-ui/icons/Feedback'
import SvgSettings from '@material-ui/icons/Settings'
// import SvgAccountCircle from '@material-ui/icons/AccountCircle'
import SvgGames from '@material-ui/icons/Games'
import SvgPeople from '@material-ui/icons/People'
import { SvgIconProps } from '@material-ui/core/SvgIcon/SvgIcon'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import MenuList from '@material-ui/core/MenuList'
import classNames from 'classnames'

interface SideBarType {
    translate: any,
    profileUrl: string,
    drawerOpen: boolean,
    handleDrawerToggle: any,
    classes?: any
}

interface MenuItem {
  path: string,  
  icon: React.ComponentType<SvgIconProps>,
  sidebarName: string,
}

const menuItems: MenuItem[] = [
  {
    path: '/',
    icon: SvgHome,
    sidebarName: 'sidebar.home',    
  },
  {
    path: '/games',
    icon: SvgGames,
    sidebarName: 'sidebar.games',
  },
  {
    path: '/people',
    icon: SvgPeople,
    sidebarName: 'sidebar.people',
  },
  {
    path: '/settings',
    icon: SvgSettings,
    sidebarName: 'sidebar.settings',
  },
  {
    path: '/feedback',
    icon: SvgFeedback,
    sidebarName: 'sidebar.sendFeedback',
  }
]

const SideBar: React.SFC<SideBarType> = (props) => {
    
  const links = menuItems.map((prop: any, key: any) => {
    let url: string = prop.path

    if (prop.path === '/profile') {
      url = props.profileUrl
    } 

    return (
      <NavLink to={url} key={key} onClick={props.handleDrawerToggle} >
        <MenuItem style={{ color: 'rgb(117, 117, 117)' }}>
         <ListItemIcon>
         <prop.icon />
         </ListItemIcon>
         <ListItemText inset primary={props.translate!(prop.sidebarName)} />
       </MenuItem>
      </NavLink>      
    )
  })

  const sidebar: any = (
      <>
        <Hidden mdUp>
            <Drawer
              variant='temporary'
              open={props.drawerOpen}
              classes={{
                paper: props.classes.drawerPaper,
              }}
              onClose={props.handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div>
                <div className={props.classes.drawerHeader} />
                <MenuList style={{ color: 'rgb(117, 117, 117)', width: '210px' }}>
                  <Divider />                  
                  {/* <HomeDrawer translate={this.props.translate} profileUrl={`/${this.props.uid}`} /> */}
                  {links}
                </MenuList>
              </div>
            </Drawer>
          </Hidden>
          <Hidden smDown implementation='js'>
            <Drawer
              variant='persistent'
              open={props.drawerOpen}
              classes={{
                paper: props.classes.drawerPaperLarge,
              }}
            >
              <div>
                <MenuList className={props.classes.menu} style={{ color: 'rgb(117, 117, 117)', width: '210px' }}>
                {/* <HomeDrawer translate={this.props.translate} profileUrl={`/${this.props.uid}`} /> */}
                {links}
                </MenuList>
              </div>
            </Drawer>
          </Hidden>
      </>
  )

  return (       
    <>
      {sidebar}
    </>
    )
}

export default SideBar