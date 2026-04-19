# MLOps Evaluation Report Component

A premium, enterprise-grade UI component for displaying machine learning model evaluation results with a bold red/rose accent theme.

## Component Location
`src/app/components/MLOpsEvaluationReport.tsx`

## Features

✅ **Clean Header Card** - Summary with training date, total rows, and production model badge  
✅ **Leaderboard Table** - 3-column comparison of ML algorithms  
✅ **Winner Highlighting** - Subtle rose background tint for the winning model  
✅ **Premium Typography** - Bold, readable fonts with excellent spacing  
✅ **Action Button** - Large red CTA for deployment  
✅ **Fully Customizable** - All data can be passed as props  

## Usage

### Basic Example

```tsx
import { MLOpsEvaluationReport } from "../components/MLOpsEvaluationReport";

function MyPage() {
  return (
    <MLOpsEvaluationReport 
      onDeploy={() => console.log("Deploying...")} 
    />
  );
}
```

### Custom Data Example

```tsx
import { MLOpsEvaluationReport } from "../components/MLOpsEvaluationReport";

function CustomReport() {
  const customResults = [
    {
      algorithm: "Neural Network",
      f1Score: "96.5%",
      accuracy: "95.8%",
      trainingLatency: "1200ms",
      isWinner: true,
    },
    {
      algorithm: "SVM",
      f1Score: "88.2%",
      accuracy: "87.5%",
      trainingLatency: "340ms",
    },
    {
      algorithm: "Decision Tree",
      f1Score: "79.1%",
      accuracy: "78.0%",
      trainingLatency: "95ms",
    },
  ];

  const handleDeploy = () => {
    // Custom deployment logic
    fetch('/api/deploy', { method: 'POST' })
      .then(res => alert('Model deployed!'));
  };

  return (
    <MLOpsEvaluationReport
      trainedDate="Nov 15, 2026"
      totalRows={500}
      productionModel="Neural Network"
      results={customResults}
      onDeploy={handleDeploy}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `trainedDate` | `string` | `"Oct 24, 2026"` | Training completion date |
| `totalRows` | `number` | `200` | Number of training samples |
| `productionModel` | `string` | `"XGBoost"` | Name of production model |
| `results` | `AlgorithmResult[]` | Default results | Array of algorithm results |
| `onDeploy` | `() => void` | `undefined` | Callback when deploy button clicked |

### AlgorithmResult Interface

```typescript
interface AlgorithmResult {
  algorithm: string;        // Algorithm name (e.g., "XGBoost")
  f1Score: string;         // F1 score with % (e.g., "94.2%")
  accuracy: string;        // Accuracy with % (e.g., "93.8%")
  trainingLatency: string; // Latency with unit (e.g., "450ms")
  isWinner?: boolean;      // True to highlight as winner
}
```

## Design Specifications

### Color Palette
- **Primary Accent**: Rose/Red (`rose-600`, `rose-700`)
- **Background**: White / Light Gray (`gray-50`)
- **Winner Highlight**: Light Rose Tint (`rose-50/60`)
- **Borders**: Gray (`gray-200`)

### Typography
- **Header Title**: `text-2xl font-bold`
- **Subtext**: `text-sm text-gray-600`
- **Table Headers**: `font-bold text-base`
- **Winner Row**: `font-bold text-lg` (Algorithm), `font-bold text-rose-700` (F1-Score)
- **Standard Rows**: `font-semibold text-base`

### Spacing & Layout
- **Card Padding**: `p-8` (header), `p-0` (table)
- **Table Cell Padding**: `py-6 px-6` to `py-6 px-8`
- **Section Spacing**: `space-y-6` between main sections
- **Button Size**: `px-10 py-6` with `text-lg`

## Integration with MLOps Wizard

You can integrate this component into Step 3 (Evaluation) of the MLOps Wizard:

```tsx
// In MLOpsWizard.tsx - State 3
{currentStep === 3 && (
  <MLOpsEvaluationReport 
    trainedDate={new Date().toLocaleDateString()}
    totalRows={pendingSessions.length}
    onDeploy={handleDeploy}
  />
)}
```

## Standalone Page

A dedicated page is available at `/evaluation-report` that showcases the component with additional pipeline information.

## Customization Tips

### Change Accent Color
Replace all `rose-*` classes with your preferred color:
- `rose-600` → `blue-600` (Blue theme)
- `rose-600` → `emerald-600` (Green theme)
- `rose-600` → `purple-600` (Purple theme)

### Add More Metrics
Extend the `AlgorithmResult` interface and add new table columns:

```typescript
interface AlgorithmResult {
  // ... existing fields
  precision: string;
  recall: string;
  rocAuc: string;
}
```

### Dynamic Winner Selection
Automatically determine winner by F1-Score:

```typescript
const resultsWithWinner = results.map((r, i, arr) => ({
  ...r,
  isWinner: r.f1Score === Math.max(...arr.map(x => parseFloat(x.f1Score)))
}));
```

## Accessibility

- ✅ High contrast text colors
- ✅ Semantic HTML table structure
- ✅ Clear visual hierarchy
- ✅ Large touch targets (buttons)
- ✅ Readable font sizes (14px minimum)

## Browser Support

Works on all modern browsers supporting:
- CSS Grid
- Flexbox
- Tailwind CSS v4+

---

**Component Created**: April 19, 2026  
**Last Updated**: April 19, 2026  
**Version**: 1.0.0
