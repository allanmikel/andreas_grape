# Attribution

This skill is a project-local, prompt-only adaptation of the **impeccable** skill by Paul Bakaus, which is itself based on Anthropic's frontend-design skill.

- Upstream: <https://github.com/pbakaus/impeccable>
- License: Apache License 2.0

## Changes from upstream

- Removed the entire `scripts/` directory (Node executables: `live-server.mjs`, `live-browser.js`, `modern-screenshot.umd.js`, `pin.mjs`, `load-context.mjs`, etc.).
- Removed the `live`, `teach`, `document`, `pin`, and `unpin` modes (they invoke the removed scripts).
- Removed the script-dependent setup gates and `IMPECCABLE_PREFLIGHT` checklist.
- Removed `user-invocable: true` and `allowed-tools: Bash(npx impeccable *)` from the SKILL.md frontmatter.
- Replaced template placeholders (`{{command_prefix}}`, `{{scripts_path}}`, `{{model}}`) with plain prose.

The 32 reference files under `reference/` are unmodified copies from upstream.

## License

Apache License 2.0. The full license text is available at <https://www.apache.org/licenses/LICENSE-2.0>.
