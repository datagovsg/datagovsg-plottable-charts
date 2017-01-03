# datagovsg-plottable-charts
Reusable Plottable chart components

### Using the chart components
```bash
npm install --save github:datagovsg/datagovsg-plottable-charts
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

### Debugging guide

1. Clone the [datagovsg/datagovsg-plottable-charts](https://github.com/datagovsg/datagovsg-plottable-charts) repo
2. Add a new branch
3. Edit code
4. Push your branch to GitHub
5. npm install your commit

##### Example

```bash
npm install --save github:datagovsg/datagovsg-plottable-charts#cbaddd65159506d633c4d4aea214e5fc3fea5c76
```

##### Alternatively

Install local module instead of fetching from remote repo

```bash
npm install ../datagovsg-plottable-charts
```
