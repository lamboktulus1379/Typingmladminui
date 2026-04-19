# Angular Conversion Guide - Expandable Session Table

## Note
The current project is built with **React + TypeScript**. This guide shows how to convert the expandable table feature to Angular if needed.

---

## React Implementation (Current)

Located at: `src/app/components/ExpandableSessionTable.tsx`

### Key Features:
1. **TypeScript Interface**: `SessionFeaturePreviewDto`
2. **State Management**: `useState<Set<string>>()` for tracking expanded rows
3. **Toggle Function**: `toggleRow(id: string)` to expand/collapse
4. **Master-Detail Pattern**: Two `<tr>` elements per session
5. **Tailwind Styling**: Clean, professional SaaS design

---

## Angular Equivalent

### Step 1: Create the Interface (TypeScript)

```typescript
// session-feature-preview.dto.ts
export interface SessionFeaturePreviewDto {
  id: string;
  userName: string;
  wpm: number;
  weakestFinger: string;
  accuracy: number;
  rawTextTyped: string;
  dwellLeftPinky: number;
  flightLeftPinky: number;
}
```

### Step 2: Component TypeScript (.ts)

```typescript
// expandable-session-table.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionFeaturePreviewDto } from './session-feature-preview.dto';

@Component({
  selector: 'app-expandable-session-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expandable-session-table.component.html',
  styleUrls: ['./expandable-session-table.component.css']
})
export class ExpandableSessionTableComponent {
  @Input() pendingSessions: SessionFeaturePreviewDto[] = [];
  
  // Track expanded rows using Set
  expandedRows: Set<string> = new Set<string>();

  // Toggle row expansion
  toggleRow(id: string): void {
    if (this.expandedRows.has(id)) {
      this.expandedRows.delete(id);
    } else {
      this.expandedRows.add(id);
    }
  }

  // Check if row is expanded
  isExpanded(id: string): boolean {
    return this.expandedRows.has(id);
  }
}
```

### Step 3: Component Template (.html)

```html
<!-- expandable-session-table.component.html -->
<div class="w-full">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="w-12"></th>
        <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Session ID
        </th>
        <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          WPM
        </th>
        <th class="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Weakest Finger
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <!-- Use @for in Angular 17+ or *ngFor for earlier versions -->
      @for (session of pendingSessions; track session.id) {
        <!-- Master Row (Summary) -->
        <tr class="hover:bg-gray-50 cursor-pointer transition-colors" 
            (click)="toggleRow(session.id)">
          <td class="px-4 py-4">
            <button class="p-1 hover:bg-gray-200 rounded transition-colors"
                    (click)="toggleRow(session.id); $event.stopPropagation()">
              @if (isExpanded(session.id)) {
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              } @else {
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              }
            </button>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="font-medium text-blue-600">
              {{ session.id.substring(0, 8) }}...
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {{ session.wpm }} WPM
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-gray-700">
            {{ session.weakestFinger }}
          </td>
        </tr>

        <!-- Detail Row (Expanded Content) -->
        @if (isExpanded(session.id)) {
          <tr>
            <td colspan="4" class="bg-gray-50 p-0">
              <div class="p-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                  
                  <!-- Top Section - User Info -->
                  <div class="mb-6">
                    <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      User Information
                    </h4>
                    <div class="flex items-center gap-2">
                      <span class="text-lg font-medium text-gray-900">
                        {{ session.userName }}
                      </span>
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>

                  <!-- Middle Section - Raw Text Typed -->
                  <div class="mb-6">
                    <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Raw Text Typed
                    </h4>
                    <blockquote class="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r text-gray-700 italic">
                      "{{ session.rawTextTyped }}"
                    </blockquote>
                  </div>

                  <!-- Bottom Section - Detailed Metrics Grid -->
                  <div>
                    <h4 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Detailed Metrics
                    </h4>
                    <div class="grid grid-cols-3 gap-4">
                      
                      <!-- Accuracy -->
                      <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                        <div class="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
                          Accuracy
                        </div>
                        <div class="text-2xl font-bold text-blue-900">
                          {{ session.accuracy }}%
                        </div>
                      </div>

                      <!-- Dwell Left Pinky -->
                      <div class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                        <div class="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">
                          Dwell Left Pinky
                        </div>
                        <div class="text-2xl font-bold text-purple-900">
                          {{ session.dwellLeftPinky }}ms
                        </div>
                      </div>

                      <!-- Flight Left Pinky -->
                      <div class="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                        <div class="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                          Flight Left Pinky
                        </div>
                        <div class="text-2xl font-bold text-green-900">
                          {{ session.flightLeftPinky }}ms
                        </div>
                      </div>

                    </div>
                  </div>

                  <!-- Additional Session Details -->
                  <div class="mt-6 pt-6 border-t border-gray-200">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-600">Full Session ID:</span>
                        <span class="font-mono text-gray-900 text-xs">{{ session.id }}</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-600">Status:</span>
                        <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-gray-300 text-gray-700">
                          Pending Analysis
                        </span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </td>
          </tr>
        }
      }
    </tbody>
  </table>

  <!-- Empty State -->
  @if (pendingSessions.length === 0) {
    <div class="text-center py-12 text-gray-500">
      <p class="text-lg">No pending sessions found</p>
      <p class="text-sm mt-2">Sessions will appear here when new typing data is available</p>
    </div>
  }
</div>
```

### Key Differences: React vs Angular

| Feature | React | Angular |
|---------|-------|---------|
| **State Management** | `useState<Set<string>>()` | Class property `expandedRows: Set<string>` |
| **Event Handling** | `onClick={toggleRow}` | `(click)="toggleRow()"` |
| **Conditional Rendering** | `{isExpanded && <tr>...</tr>}` | `@if (isExpanded) { <tr>...</tr> }` |
| **Loops** | `{sessions.map(s => ...)}` | `@for (s of sessions; track s.id) {...}` |
| **Data Binding** | `{session.wpm}` | `{{ session.wpm }}` |
| **Component Props** | `interface Props { sessions: [] }` | `@Input() sessions: []` |

---

## Usage in Parent Component (Angular)

```typescript
// mlops-wizard.component.ts
import { Component } from '@angular/core';
import { ExpandableSessionTableComponent } from './expandable-session-table.component';
import { SessionFeaturePreviewDto } from './session-feature-preview.dto';

@Component({
  selector: 'app-mlops-wizard',
  standalone: true,
  imports: [ExpandableSessionTableComponent],
  template: `
    <app-expandable-session-table 
      [pendingSessions]="pendingSessions">
    </app-expandable-session-table>
  `
})
export class MlopsWizardComponent {
  pendingSessions: SessionFeaturePreviewDto[] = [
    {
      id: 'session-a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      userName: 'Ahmad Hidayat',
      wpm: 45,
      weakestFinger: 'Pinky Left',
      accuracy: 92.5,
      rawTextTyped: 'The quick brown fox jumps over the lazy dog',
      dwellLeftPinky: 120,
      flightLeftPinky: 85
    },
    // ... more sessions
  ];
}
```

---

## Notes

1. This Angular version uses **Angular 17+ control flow syntax** (`@if`, `@for`)
2. For Angular 16 or earlier, replace `@if` with `*ngIf` and `@for` with `*ngFor`
3. Ensure Tailwind CSS is configured in your Angular project
4. The current React implementation is fully functional and ready to use
