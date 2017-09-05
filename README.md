# datagovsg-plottable-charts
Reusable Plottable chart components

### Using the chart components
```bash
npm install --save datagovsg-plottable-charts
```

```javascript
import {
  SimplePie,
  SimpleBar,
  GroupedBar,
  StackedBar,
  SimpleLine,
  MultipleLine
} from 'datagovsg-plottable-charts'

// Instantiate the chart component
var pie = new SimplePie(props)

// Mount component
pie.mount(document.getElementById('ctn'))

// Update chart
pie.update(newProps)
```

### Using plugins
```javascript
import {
  highlightOnHover,
  setupOuterLabel
} from 'datagovsg-plottable-charts/dist/plugins'

highlightOnHover(pie)
setupOuterLabel(pie)
```

### Debugging guide

1. Clone the [datagovsg/datagovsg-plottable-charts](https://github.com/datagovsg/datagovsg-plottable-charts) repo
2. `cd` to the cloned repo
3. Run `npm install`
4. Change **main** field in the **package.json** to `"main": "src/index.js"`
5. Set up a symlink `sudo npm link`
6. `cd` to your working directory
7. Run `npm link datagovsg-plottable-charts`
