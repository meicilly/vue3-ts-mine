import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from '@/views/main/main/system/user/config/register-properties'

export function globalRegister(app: App): void {
  app.use(registerElement)
  app.use(registerProperties)
}
