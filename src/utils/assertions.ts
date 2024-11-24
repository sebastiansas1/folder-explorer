export const isPath = (path: string): boolean => {
  if (typeof path !== 'string' || path.trim() === '') {
    return false
  }

  const components = path.startsWith('/') ? path.split('/').slice(1) : path.split('/')

  if (components.length === 0) {
    return false
  }

  if (components.some((c) => !isValidComponent(c))) {
    return false
  }

  return true
}

const isValidComponent = (component: string): boolean => {
  const validComponentPattern = /^[a-zA-Z0-9._\-\s]+$/

  const trimmedComponent = component.trim()

  if (trimmedComponent === '') {
    return false
  }

  return validComponentPattern.test(trimmedComponent)
}
