# Get image diffs

### Usage

```
results = blink-diff `/old` `/new` `/output`
```

The resulting diffs would save in the output folder and
the result object would be

```json
{
  "different": ["list of file paths that are different"],
  "same": ["list of file paths that are the same"],
  "count": 0
}
```
