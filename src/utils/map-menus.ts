import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus:any[]):RouteRecordRaw[]{
    const routes: RouteRecordRaw[] = []
    //先去加载默认的所有的路由
    const allRoutes:RouteRecordRaw[] = []
    const routeFiles = require.context('../router/main', true, /\.ts/)
    //console.log(routeFiles)
    routeFiles.keys().forEach((key) => {
        //console.log(key)
        const route = require("../router/main" + key.split('.')[1])
        //console.log(route)
        allRoutes.push(route.default)
    })
    const _recurseGetRoute = (menus: any[]) => {
        for (const menu of menus) {
            //console.log(menu)
          if (menu.type === '2') {
            const route = allRoutes.find((route) => route.path === menu.url)
            if (route) routes.push(route)
          } else {
            _recurseGetRoute(menu.children)
          }
        }
      }
      _recurseGetRoute(userMenus)
    return routes
}

export function pathMapBreadcrumbs(userMenus:any[],currentPath:string){
  //console.log(userMenus,currentPath)
  const breadcrumbs:any = []
  pathMapToMenu(userMenus,currentPath,breadcrumbs)
  //console.log(breadcrumbs)
  return breadcrumbs
}

export function pathMapToMenu(userMenus:any[],currentPath:string,breadcrumbs?:any[]):any{
  for(const menu of userMenus){
    //console.log(menu.children)
    if (menu.type === '1') {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      //console.log(findMenu)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === '2' && menu.url === currentPath) {
      return menu
    }
  }
}