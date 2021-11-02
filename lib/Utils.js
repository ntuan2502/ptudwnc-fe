export function getApiUrl(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}${path}`;
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}