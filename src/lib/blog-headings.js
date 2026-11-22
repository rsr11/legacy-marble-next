function plainText(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '');
}

function headingId(text, used) {
  const base = text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-') || 'section';
  const count = used.get(base) || 0;
  used.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

export function extractHeadings(content) {
  const used = new Map();
  return [...content.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '').matchAll(/^(#{2,3})\s+(.+?)\s*#*\s*$/gm)]
    .map((match) => {
      const text = plainText(match[2]);
      return { text, level: match[1].length, id: headingId(text, used) };
    });
}

export function rehypeHeadingIds() {
  return (tree) => {
    const used = new Map();
    const textOf = (node) => node.type === 'text' ? node.value : (node.children || []).map(textOf).join('');
    function walk(node) {
      if (node.type === 'element' && ['h2', 'h3'].includes(node.tagName)) {
        node.properties = { ...node.properties, id: headingId(textOf(node), used) };
      }
      node.children?.forEach(walk);
    }
    walk(tree);
  };
}
