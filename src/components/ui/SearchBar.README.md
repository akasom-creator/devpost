# SearchBar Component

A horror-themed search input component with debounced search, loading states, and keyboard navigation.

## Features

- **Debounced Input**: 500ms delay before triggering search to reduce API calls
- **Red Glowing Border**: Blood-red glow effect on focus for horror aesthetic
- **Clear Button**: Blood splatter icon button to clear the search
- **Loading Indicator**: Spinning loader displayed during search operations
- **Keyboard Navigation**: 
  - `Enter` key triggers immediate search
  - `Escape` key clears the search input
- **Minimum Character Requirement**: Requires at least 3 characters before searching
- **Accessibility**: Proper ARIA labels and keyboard support

## Usage

```tsx
import { SearchBar } from './components/ui/SearchBar';

function MyComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Perform search operation
  };

  return (
    <SearchBar 
      onSearch={handleSearch}
      placeholder="Search for horror movies..."
      isLoading={isLoading}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearch` | `(query: string) => void` | Required | Callback function triggered when search query changes (debounced) |
| `placeholder` | `string` | `"Search for horror movies..."` | Placeholder text for the input field |
| `isLoading` | `boolean` | `false` | Shows loading spinner when true |

## Behavior

1. **Debouncing**: The component waits 500ms after the user stops typing before calling `onSearch`
2. **Minimum Length**: Search is only triggered when query has 3+ characters or is empty (to reset)
3. **Enter Key**: Bypasses debounce and triggers immediate search
4. **Escape Key**: Clears the input and refocuses
5. **Clear Button**: Only visible when there's text and not loading

## Styling

The component uses Tailwind CSS with custom horror theme colors:
- Background: `darkness-800`
- Border: `darkness-700` (default), `blood-500` (focused)
- Glow effect: Red shadow on focus
- Clear button: `blood-700` background with hover effect

## Requirements Satisfied

- **2.1**: Provides search input field in navigation area
- **2.2**: Queries TMDb API when user types 3+ characters (via onSearch callback)
- **2.4**: Clears search field and restores default listing
- **7.4**: Red glowing shadows around interactive elements on hover/focus

## Demo

Run the demo component to see the SearchBar in action:

```tsx
import { SearchBarDemo } from './components/ui/SearchBarDemo';
```

## Accessibility

- Proper `aria-label` attributes for screen readers
- Keyboard navigation support
- Focus indicators with high contrast
- Clear visual feedback for all states
