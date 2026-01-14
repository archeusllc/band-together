I'm working on finishing up the scaffolding portion of this project.  Let's make github issues that fit that goal.

Some things to keep in mind for the session:

- Keep it generic.  The "Band Together" branding is fine, but anything else should be typical of an app with this kind of tech stack.
- Any issues created should be exclusive to their respective submodules.  Related issues that involve separate modules should reference each other in their descriptions.
- The gh cli can be leveraged to perform github operations.
- When building features, code that becomes too integrated into more than one module should be relegated to the 'shared' submodule, and imported, similarly to how it's handled in the api submodule.
- Build toward a good baseline that can be reverted to easily for a rapid prototyping development style.
- Focus on empty, "shell" objects, and file structure. Code that is likely to end up being highly generic is fine to generate, but keep things simple.
- Identify any unconventional practices in the codebase and collect them onto a wiki page. Don't make issues for these - I don't always follow convention, but sometimes I don't realize that's the case, either.  It's just for information.
- Almost all issues created will probably be on the submodules' individual repos, but let's make one on the main repo for tracking the overall progress of the scaffolding effort.
- Use concise, friendly languages that avoids sentence fragments.

---

## Results (January 13, 2026)

**Prompt processed.** The following issues were created:

### Tracking Issue
- [#23](https://github.com/archeusllc/band-together/issues/23) — Scaffolding: Complete baseline file structure across all modules

### Submodule Issues
- [archeusllc/bt-api#1](https://github.com/archeusllc/bt-api/issues/1) — Scaffolding: Complete API structure with middleware, error handling, and types
- [archeusllc/bt-client#1](https://github.com/archeusllc/bt-client/issues/1) — Scaffolding: Complete client structure with auth screens, context, hooks, and types
- [archeusllc/bt-shared#1](https://github.com/archeusllc/bt-shared/issues/1) — Scaffolding: Complete shared module with error definitions, types, and validation

### Documentation Issue
- [#24](https://github.com/archeusllc/band-together/issues/24) — Scaffolding: Document unconventional practices

### Unconventional Practices Identified

The following practices deviate from standard patterns and should be documented:

1. **Shared Prisma Client via GitHub import** — The API imports `@band-together/shared` directly from GitHub rather than as a local workspace reference. This ensures all environments use the same committed generated client, avoiding local-only builds.

2. **Root-level scripts handling submodule operations** — The main repo has comprehensive shell scripts (`sync-all.sh`, `stage-all.sh`, etc.) that orchestrate multi-submodule workflows and auto-generate commit messages. This is more sophisticated than typical monorepo tooling.

3. **Submodule hash re-staging** — The `sync-all.sh` script re-stages the parent repo after committing submodules to capture updated hash references. This prevents the parent repo from drifting out of sync with submodule changes.

4. **Health check routes at module level** — The API includes dedicated health check middleware for database and Firebase, executed at the framework initialization level rather than as a simple status endpoint.

5. **PrismaPg adapter configuration in shared module** — Rather than requiring each consumer to configure the adapter, the shared module exports a pre-configured `PrismaClient` factory that handles the adapter setup internally.