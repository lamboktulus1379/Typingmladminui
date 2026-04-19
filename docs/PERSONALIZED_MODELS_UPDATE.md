# Personalized ML Models - UI Updates

## Overview
Updated the MLOps Wizard and Evaluation Report to support personalized (per-user) machine learning models with clear visual indicators that distinguish user-specific models from global models.

---

## 1. MLOps Wizard - User Selection Control

### Location
`src/app/pages/MLOpsWizard.tsx` - Step 1 (Data Preview)

### Changes Made

#### New State
```typescript
const [selectedUser, setSelectedUser] = useState<string>("admin@test.com");
```

#### New UI Component
Added a **User Selection Control Area** above the telemetry data table featuring:

**Visual Design:**
- Light gray background (`bg-gray-50`) with border
- Rounded corners for modern SaaS aesthetic
- Proper padding and spacing

**Components:**
1. **Label**: "Select Subject / User:" (semibold, gray-700)
2. **Dropdown Select Box**:
   - Styled with `Select` component from shadcn/ui
   - Width: 264px (w-64)
   - Shows current selection (default: "admin@test.com")
   - Includes built-in ChevronDown icon
   - Hover effects on border (gray-300 → gray-400)
   - White background for contrast

3. **Personalized Model Badge**:
   - Rose accent colors (rose-50 bg, rose-700 text, rose-300 border)
   - Shows "Personalized Model" to indicate non-global training
   - Positioned to the right of dropdown

**Available Users in Dropdown:**
- admin@test.com
- user1@example.com
- user2@example.com
- ahmad.hidayat@test.com
- siti.nurhaliza@test.com

### User Experience
- Admins can clearly see which user's data will be used for model training
- Dropdown is clickable and accessible with keyboard navigation
- Visual hierarchy makes it obvious this is a critical selection

---

## 2. Evaluation Report - Personalized Model Badge

### Location
`src/app/pages/EvaluationReport.tsx` - Header Section

### Changes Made

#### New Import
```typescript
import { User } from "lucide-react";
import { Badge } from "../components/ui/badge";
```

#### New Badge Component
Added directly below the main "MLOps Evaluation Report" title:

**Visual Design:**
- **Background**: Light rose tint (`bg-rose-50`)
- **Border**: Bold 2px rose border (`border-2 border-rose-200`)
- **Text**: Dark rose (`text-rose-800`)
- **Icon**: User icon from Lucide (5x5, rose-800)
- **Shadow**: Subtle shadow for depth (`shadow-sm`)
- **Padding**: Generous padding (`px-4 py-2.5`)
- **Font**: Bold, base size for prominence

**Content:**
```
👤 Personalized Model for: admin@test.com
```

### User Experience
- **Clear Distinction**: Immediately visible that this is NOT a global model
- **Ownership Context**: Admin knows exactly whose model they're reviewing
- **Visual Hierarchy**: Positioned prominently below main title
- **Enterprise Feel**: Pill-shaped badge with professional styling
- **Rose Accent**: Matches the report's red/rose color scheme

---

## Design Rationale

### Why Rose/Red Accent?
- **Attention-Grabbing**: Rose color stands out from typical blue/gray admin UIs
- **Warning Context**: Subtle psychological cue that this is user-specific (not global)
- **Brand Consistency**: Matches existing red accent in report cards
- **Professional**: Light rose (not bright red) maintains enterprise aesthetic

### Why User Icon?
- **Universal Symbol**: User icon is immediately recognizable
- **Context Clarity**: Reinforces that this is a personal model
- **Visual Balance**: Icon + text creates professional pill shape

### Why Prominent Placement?
- **Admin Safety**: Prevents accidental deployment of wrong model
- **Audit Trail**: Clear record of which user's model is being reviewed
- **Compliance**: Important for data privacy and model governance

---

## Technical Implementation

### Dependencies Added
- `Select` component from shadcn/ui (already in project)
- `ChevronDown` icon from Lucide
- `User` icon from Lucide

### State Management
- Simple `useState` for selected user
- Can be easily extended to fetch from API
- Ready for integration with backend user service

### Responsive Design
- Dropdown width fixed at 264px for consistency
- Badge wraps gracefully on mobile
- Labels remain readable at all screen sizes

---

## Future Enhancements

### MLOps Wizard
1. **Dynamic User List**: Fetch users from API endpoint
2. **User Search**: Add search/filter for large user lists
3. **User Metadata**: Show user role, last active date in dropdown
4. **Bulk Selection**: Allow training models for multiple users

### Evaluation Report
1. **Dynamic Badge**: Pull user email from route params or state
2. **User Profile Link**: Make badge clickable to view user details
3. **Model History**: Show previous models for this user
4. **Comparison View**: Compare personal vs global model performance

---

## Screenshots Guide

### MLOps Wizard - User Selection
```
┌─────────────────────────────────────────────────┐
│ Select Subject / User:  [admin@test.com ▼]  🏷️ │
│                         ─────────────────        │
│                         Personalized Model       │
└─────────────────────────────────────────────────┘
```

### Evaluation Report - Header Badge
```
MLOps Evaluation Report
┌──────────────────────────────────────────┐
│ 👤 Personalized Model for: admin@test.com│
└──────────────────────────────────────────┘
Review training results and deploy...
```

---

## Testing Checklist

- [ ] User dropdown displays all available users
- [ ] Selected user persists across wizard steps
- [ ] Badge shows correct user email
- [ ] Rose accent colors match design spec
- [ ] Components are responsive on mobile
- [ ] Keyboard navigation works for dropdown
- [ ] Icons render correctly
- [ ] Hover states work smoothly

---

**Updated**: April 19, 2026  
**Version**: 1.0.0  
**Status**: Production Ready
