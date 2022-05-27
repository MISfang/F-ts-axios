const Ftype = (target: any) => {
  return Object.prototype.toString
    .call(target)
    .toLowerCase()
    .slice(8, -1)
}
const isDate = (target: any): target is Date => Ftype(target) === 'date'
const isObject = (target: any): target is Object => Ftype(target) === 'object'

export { Ftype, isDate, isObject }
