export function Assign<T extends { [field: string]: any }>(target: T, source: T) {
  return Object.assign(target, source);
}

export function constructorNameOf(constructor: new (...args: any[]) => any) {
  return Reflect.getOwnPropertyDescriptor(constructor, "name")?.value || "";
}
export function throwErrorMessage(message: string) {
  const error = new Error(message);
  Error.captureStackTrace(error, throwErrorMessage);
  throw error;
}

export const setUrlQuery = (name: any, value: any, resetAll = 0) => {
  const searchParams = new URLSearchParams(resetAll ? "" : window.location.search);
  if (value === null || value === undefined) {
    searchParams.delete(name);
  } else {
    searchParams.set(name, value);
  }
  return searchParams.toString();
};

export function objectToQuery(obj: any) {
  const keys = Object.keys(obj);
  const keyValuePairs = keys
    .filter((key) => obj[key] !== undefined)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
    });
  return keyValuePairs.join("&");
}

export function jwt_parse(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function downloadBlob(res: any, name?: string) {
  const b = res.data;
  const url = window.URL.createObjectURL(new Blob([b]));
  const link = document.createElement("a");
  link.href = url;
  // console.log(res)
  // name from content disposition
  const contentDisposition = res.headers.get("content-disposition");
  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?(.+)"?/);
    if (match) {
      name = match[1];
    }
  }
  link.setAttribute("download", name || "export");

  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function downloadFileFromFetch(res: any, name?: string) {
  const b = await res.blob();
  const url = window.URL.createObjectURL(b);
  const a = document.createElement("a");

  a.href = url;

  const cd = res.headers.get("Content-Disposition");
  const filename = name || (cd && cd.includes("filename=") ? cd.split("filename=")[1].trim().replace(/["']/g, "") : null) || "export";
  a.download = filename;

  // a.download = name || res.headers.get('Content-Disposition')?.split('filename=').pop() || 'export';

  // res.headers.forEach((row) => console.log(row))
  // console.log(res.headers.get('Content-Disposition'))
  document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
  a.click();
  a.remove();
}

export function is_valid_json(string: string): boolean {
  try {
    JSON.parse(string);
    return true; // Valid JSON
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (e) {
    return false; // Invalid JSON
  }
}

export function isUUIDv4(uuid: string): boolean {
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV4Regex.test(uuid);
}

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
