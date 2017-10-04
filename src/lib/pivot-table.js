import PivotTable, {
  filterItems,
  filterGroups,
  groupItems,
  aggregate
} from '../PivotTable'

window.PivotTable = Object.assign(PivotTable, {
  filterItems,
  filterGroups,
  groupItems,
  aggregate
})
