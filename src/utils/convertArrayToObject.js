const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

export function convertDocumentListToCamelCase(documentList) {
  const formattedDocs = {};

  for (const doc of documentList) {
    const [key, value] = Object.entries(doc)[0];
    formattedDocs[toCamelCase(key)] = value;
  }

  return formattedDocs;
}
