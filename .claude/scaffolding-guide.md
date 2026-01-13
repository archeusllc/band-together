# Scaffolding Sessions Guide

This document describes how to set up and conduct scaffolding sessions for Band Together.

## What is a Scaffolding Session?

A scaffolding session focuses on **structural setup only** — creating empty file/directory structures, installing dependencies, and establishing architectural patterns. No business logic implementation occurs during scaffolding.

**Scaffolding ≠ Implementation.** After scaffolding completes, developers implement the logic in separate issues.

## Session Setup Process

### 1. Plan Phase
- Identify the feature area needing scaffolding (e.g., auth, navigation, state management)
- Create a comprehensive plan document (e.g., `twinkling-gliding-hearth.md`)
- Use exploratory agents to understand current codebase state
- Design the structural approach

### 2. Issue Separation
- **Split existing issues into two types:**
  - **Scaffolding issues**: Empty structures, directories, dependencies, type definitions
  - **Implementation issues**: Business logic, form UI, state management, API calls

#### Scaffolding Issue Template
```markdown
**Scaffolding only** — [Brief description]

## Scaffolding Tasks
- [ ] Create directories (list them)
- [ ] Create empty shell files (list them)
- [ ] Install dependencies (list packages)
- [ ] Verify files compile without errors

## Implementation Tasks
See issue #XX ([Title]) for [description of work].
```

#### Implementation Issue Template
```markdown
[Full description of business logic to implement]

**Depends on:** Issue #X (scaffolding)

## Tasks
- [ ] Task 1
- [ ] Task 2
...
```

### 3. Issue Labeling
Use consistent labels across all issues:
- **Scaffolding issues**: `scaffolding, priority: critical, module: [client/api/db]`
- **Implementation issues**: `enhancement, priority: high/medium, module: [client/api/db]`

### 4. Documentation
Create or update the session plan with:
- Overview of what scaffolding will accomplish
- List of 6 scaffolding issues (recommended number for a session)
- List of corresponding implementation issues created
- Session workflow for executing each scaffolding issue

## Scaffolding Best Practices

### What TO Do
- ✅ Create directories
- ✅ Create empty shell files with TODO comments
- ✅ Install required dependencies
- ✅ Set up TypeScript types (with TODO placeholders)
- ✅ Create empty React components (single line UI)
- ✅ Export functions/components (empty bodies)
- ✅ Update configuration files (package.json, tsconfig, etc.)
- ✅ Add comments explaining where implementation goes

### What NOT to Do
- ❌ Implement business logic
- ❌ Build form UI and validation
- ❌ Create state management hooks with logic
- ❌ Implement API endpoints
- ❌ Add error handling beyond structure
- ❌ Create tests
- ❌ Write complex documentation

### Empty Shell Component Pattern
```typescript
import { View, Text } from 'react-native';

export const ComponentName = () => (
  <View>
    <Text>ComponentName - TODO: Add content</Text>
  </View>
);
```

### Empty Hook/Context Pattern
```typescript
interface ContextType {
  // TODO: Define context shape
}

const Context = createContext<ContextType | undefined>(undefined);

export const Provider = ({ children }: { children: ReactNode }) => {
  // TODO: Implement logic
  return (
    <Context.Provider value={{}}>
      {children}
    </Context.Provider>
  );
};

export const useContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('useContext must be used within Provider');
  return context;
};
```

## Session Workflow

### For Each Scaffolding Issue

1. **Assign and label**
   ```bash
   gh issue edit <#> --add-assignee @me --add-label "in-progress"
   ```

2. **Create structure**
   - Create all directories
   - Create all empty shell files with TODOs
   - Install dependencies
   - Update configuration files

3. **Verify**
   - All files compile without errors
   - All imports resolve
   - App builds successfully
   - Type errors are only in TODO sections

4. **Commit**
   ```bash
   bun git:sync -m "Scaffold #<#>: <description>"
   ```

5. **Comment on issue**
   ```bash
   gh issue comment <#> --body "Scaffolding complete. Files created:
   - List of files

   See issue #YY for implementation work."
   ```

6. **Move to next issue** (do NOT close)

## Recommended Scaffolding Areas

### Auth Foundation (6 issues)
1. Client auth screens + Firebase dependency
2. AuthContext provider
3. API auth middleware + routes
4. Navigation structure (Expo Router)
5. API integration placeholders
6. Testing utilities + checklist

### State Management (4-6 issues)
1. Context providers (each feature area)
2. Hook patterns (useAuth, useBand, etc.)
3. Type definitions
4. Persistence layer structure

### API Routes (3-6 issues)
1. Route file structure
2. Middleware structure
3. Type definitions
4. Error handling structure

### UI Navigation (2-4 issues)
1. Navigation library setup (Expo Router/React Navigation)
2. Layout structure
3. Screen directory structure
4. Deep linking configuration

## Tools & Commands

### Create scaffolding issue
```bash
gh issue create \
  --title "Scaffold: [Feature Name]" \
  --body "Scaffolding only..." \
  --label "scaffolding,priority: critical,module: client"
```

### Update existing issue
```bash
gh issue edit <#> --body "New body content"
```

### View issue details
```bash
gh issue view <#> --json body,labels,title
```

### List issues with filters
```bash
gh issue list --label scaffolding --state open
gh issue list --label "priority: critical" --state open
```

## Measuring Scaffolding Success

A scaffolding session is successful when:
- ✅ All required directories created
- ✅ All empty shell files created with TODOs
- ✅ All dependencies installed
- ✅ Project builds without errors
- ✅ No business logic implemented (intentionally)
- ✅ Developers have clear TODO comments on where to implement
- ✅ Clear mapping between scaffolding and implementation issues
- ✅ All changes committed and pushed

## Future Session Initialization

When starting a new scaffolding session:

1. Create a plan file: `/Users/blee/.claude/plans/[session-name].md`
2. Run exploration to understand current state
3. Create/update scaffolding issues with proper labels
4. Create corresponding implementation issues
5. Document the session goals clearly
6. Execute the workflow issue by issue

## Example: Auth Scaffolding Session (Completed)

**Session ID:** twinkling-gliding-hearth
**Plan File:** `/Users/blee/.claude/plans/twinkling-gliding-hearth.md`

**Scaffolding Issues Created:**
- #11: Client auth screens
- #12: AuthContext provider
- #10: API auth middleware
- #14: Navigation structure
- #13: API integration structure
- #15: Testing utilities

**Implementation Issues Created:**
- #17: Client auth logic
- #18: Auth state management
- #19: API auth endpoints
- #20: Navigation logic
- #21: API calls in screens
- #22: E2E testing

This session established the foundation for the entire auth flow without implementing any business logic.
