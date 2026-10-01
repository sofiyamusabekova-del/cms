export function setByPath<T extends Record<string, unknown>>(
  obj: T,
  path: string,
  value: unknown
): T {
  const parts = path.split('.');
  const result = { ...obj } as Record<string, unknown>;

  let current = result;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (
      current[part] === undefined ||
      current[part] === null ||
      typeof current[part] !== 'object'
    ) {
      current[part] = {};
    } else {
      current[part] = { ...(current[part] as Record<string, unknown>) };
    }
    current = current[part] as Record<string, unknown>;
  }

  current[parts[parts.length - 1]] = value;
  return result as T;
}

export function getByPath<T = unknown>(
  obj: Record<string, unknown> | undefined,
  path: string,
  defaultValue?: T
): T | undefined {
  if (!obj) return defaultValue;
  const parts = path.split('.');
  let current: unknown = obj;

  for (const part of parts) {
    if (current === undefined || current === null || typeof current !== 'object') {
      return defaultValue;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return (current !== undefined ? current : defaultValue) as T;
}
