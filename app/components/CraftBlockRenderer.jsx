// Renders Craft.do blocks as React components for full design control
export default function CraftBlockRenderer({ blocks }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  const renderedElements = [];
  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];
    const key = block.id || `block-${i}`;

    // Skip metadata blocks (already shown in page header)
    if (block.markdown?.startsWith('**Author:') || block.markdown?.includes('Author:') && block.markdown?.includes('Date:')) {
      i++;
      continue;
    }

    // Skip horizontal lines
    if (block.type === 'line') {
      renderedElements.push(
        <hr key={key} style={{ border: 'none', borderTop: '1px solid #e5e5e5', margin: '48px 0' }} />
      );
      i++;
      continue;
    }

    // Headings
    if (block.textStyle === 'h1' || block.type === 'heading') {
      renderedElements.push(
        <h1 key={key} style={{ fontSize: '2rem', fontWeight: '600', color: '#000', margin: '48px 0 20px', lineHeight: '1.2' }}>
          {renderRichText(cleanText(block.markdown))}
        </h1>
      );
      i++;
      continue;
    }

    if (block.textStyle === 'h2') {
      renderedElements.push(
        <h2 key={key} style={{ fontSize: '1.5rem', fontWeight: '600', color: '#000', margin: '40px 0 16px', lineHeight: '1.3' }}>
          {renderRichText(cleanText(block.markdown))}
        </h2>
      );
      i++;
      continue;
    }

    if (block.textStyle === 'h3') {
      renderedElements.push(
        <h3 key={key} style={{ fontSize: '1.2rem', fontWeight: '600', color: '#000', margin: '32px 0 12px', lineHeight: '1.4' }}>
          {renderRichText(cleanText(block.markdown))}
        </h3>
      );
      i++;
      continue;
    }

    if (block.textStyle === 'h4') {
      renderedElements.push(
        <h4 key={key} style={{ fontSize: '1.1rem', fontWeight: '600', color: '#000', margin: '24px 0 10px', lineHeight: '1.4' }}>
          {renderRichText(cleanText(block.markdown))}
        </h4>
      );
      i++;
      continue;
    }

    // Images (check multiple possible URL properties)
    const imageUrl = block.url || block.src || block.imageUrl || block.file?.url;
    if ((block.type === 'image' || block.type === 'file' || block.type === 'media') && imageUrl) {
      renderedElements.push(
        <img
          key={key}
          src={imageUrl}
          alt={block.alt || block.title || ''}
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '8px',
            margin: '48px 0',
            display: 'block',
          }}
        />
      );
      i++;
      continue;
    }

    // Check if markdown contains only an image (standalone image in text block)
    if (block.markdown && /^!\[[^\]]*\]\([^)]+\)$/.test(block.markdown.trim())) {
      const imgMatch = block.markdown.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        renderedElements.push(
          <img
            key={key}
            src={imgMatch[2]}
            alt={imgMatch[1] || ''}
            style={{
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '8px',
              margin: '48px 0',
              display: 'block',
            }}
          />
        );
        i++;
        continue;
      }
    }

    // Blockquotes (detect by decorations)
    if (block.decorations?.includes('quote') || block.markdown?.startsWith('>')) {
      renderedElements.push(
        <blockquote
          key={key}
          style={{
            background: '#f9f9f9',
            borderLeft: '4px solid #000',
            padding: '20px 24px',
            margin: '32px 0 48px 0',
            color: '#555',
            fontStyle: 'italic',
            borderRadius: '4px',
          }}
        >
          {renderRichText(cleanText(block.markdown))}
        </blockquote>
      );
      i++;
      continue;
    }

    // Bullet lists - group consecutive items
    if (block.listStyle === 'bullet') {
      const listItems = [];
      let j = i;
      while (j < blocks.length && blocks[j].listStyle === 'bullet') {
        const itemKey = blocks[j].id || `list-item-${j}`;
        const cleaned = cleanText(blocks[j].markdown);
        listItems.push(
          <li key={itemKey} style={{ marginBottom: '10px', lineHeight: '1.8' }}>
            {renderRichText(cleaned)}
          </li>
        );
        j++;
      }
      renderedElements.push(
        <ul key={`ul-${i}`} style={{ marginBottom: '24px', paddingLeft: '24px' }}>
          {listItems}
        </ul>
      );
      i = j;
      continue;
    }

    // Numbered lists - group consecutive items
    if (block.listStyle === 'number' || block.listStyle === 'numbered') {
      const listItems = [];
      let j = i;
      while (j < blocks.length && (blocks[j].listStyle === 'number' || blocks[j].listStyle === 'numbered')) {
        const itemKey = blocks[j].id || `list-item-${j}`;
        const cleaned = cleanText(blocks[j].markdown);
        listItems.push(
          <li key={itemKey} style={{ marginBottom: '10px', lineHeight: '1.8' }}>
            {renderRichText(cleaned)}
          </li>
        );
        j++;
      }
      renderedElements.push(
        <ol key={`ol-${i}`} style={{ marginBottom: '24px', paddingLeft: '24px' }}>
          {listItems}
        </ol>
      );
      i = j;
      continue;
    }

    // Tables
    if (block.type === 'table' && block.table) {
      renderedElements.push(
        <div key={key} style={{ overflowX: 'auto', margin: '32px 0' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.95rem',
          }}>
            <tbody>
              {block.table.rows?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.cells?.map((cell, cellIndex) => {
                    const isHeader = rowIndex === 0;
                    const Tag = isHeader ? 'th' : 'td';
                    return (
                      <Tag
                        key={cellIndex}
                        style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid #e5e5e5',
                          textAlign: 'left',
                          fontWeight: isHeader ? '600' : '400',
                          color: isHeader ? '#000' : '#444',
                          backgroundColor: isHeader ? '#f9f9f9' : 'transparent',
                        }}
                      >
                        {renderRichText(cell.text || cell)}
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      i++;
      continue;
    }

    // Code blocks
    if (block.type === 'code' && block.code) {
      renderedElements.push(
        <pre
          key={key}
          style={{
            backgroundColor: '#f5f5f5',
            padding: '20px',
            borderRadius: '8px',
            overflow: 'auto',
            margin: '32px 0',
            fontSize: '0.9rem',
            lineHeight: '1.6',
          }}
        >
          <code>{block.code}</code>
        </pre>
      );
      i++;
      continue;
    }

    // Detect markdown tables (can be type 'table' or 'text' with markdown content)
    if ((block.type === 'table' || block.type === 'text') && block.markdown && isMarkdownTable(block.markdown)) {
      const tableElement = parseMarkdownTable(block.markdown, key);
      if (tableElement) {
        renderedElements.push(tableElement);
        i++;
        continue;
      }
    }

    // Regular text paragraphs (also catch blocks with markdown but no/unknown type)
    if (block.markdown) {
      const text = cleanText(block.markdown);
      if (text) {
        renderedElements.push(
          <p key={key} style={{ color: '#444', marginBottom: '20px', lineHeight: '1.8', fontSize: '1.05rem' }}>
            {renderRichText(text)}
          </p>
        );
      }
      i++;
      continue;
    }

    // Fallback for unknown block types without markdown - log them for debugging
    if (block.type) {
      console.warn('Unhandled block type:', block.type, block);
    }

    i++;
  }

  return <>{renderedElements}</>;
}

// Clean markdown syntax from text
function cleanText(text) {
  if (!text) return '';
  return text
    .trim() // Remove leading/trailing whitespace first
    .replace(/^#+\s+/, '') // Remove heading markers
    .replace(/^\*{3,}\s*$/g, '') // Remove horizontal rules
    .replace(/^>\s+/, '') // Remove blockquote markers
    .replace(/^-\s+/, '') // Remove bullet list markers
    .replace(/^\d+\.\s*/, '') // Remove numbered list markers (e.g., "1. " or "1.")
    .replace(/^\d+\.\s*/, ''); // Run twice to catch double numbering like "1. 1."
}

// Parse metadata line into formatted display
function parseMetadata(text) {
  // Extract metadata parts
  const authorMatch = text.match(/\*\*Author:\s*([^,*]+)/i);
  const dateMatch = text.match(/Date:\s*([A-Za-z]+\s+\d{1,2},?\s+\d{4})/i);
  const readTimeMatch = text.match(/Reading Time:\s*(\d+\s*Minutes?)/i);

  const parts = [];

  if (authorMatch) {
    parts.push(
      <span key="author">
        <strong style={{ fontWeight: '600', color: '#000' }}>Author:</strong> {authorMatch[1].trim()}
      </span>
    );
  }

  if (dateMatch) {
    parts.push(
      <span key="date">
        <strong style={{ fontWeight: '600', color: '#000' }}>Date:</strong> {dateMatch[1].trim()}
      </span>
    );
  }

  if (readTimeMatch) {
    parts.push(
      <span key="readtime">
        <strong style={{ fontWeight: '600', color: '#000' }}>Reading Time:</strong> {readTimeMatch[1].trim()}
      </span>
    );
  }

  return parts.map((part, i) => (
    <span key={i}>
      {i > 0 && ' • '}
      {part}
    </span>
  ));
}

// Render text with bold, italic, links, images, and other inline formatting
function renderRichText(text) {
  if (!text) return null;

  // First pass: handle inline images ![alt](url)
  const withImages = processInlineImages(text);

  // If processInlineImages returned an array, process each text segment
  if (Array.isArray(withImages)) {
    return withImages.map((part, idx) => {
      if (typeof part === 'string') {
        return <span key={`segment-${idx}`}>{processLinksAndFormatting(part)}</span>;
      }
      return part; // Already a React element (image)
    });
  }

  // No inline images, continue with links and formatting
  return processLinksAndFormatting(text);
}

// Process inline markdown images ![alt](url)
function processInlineImages(text) {
  if (!text) return text;

  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  let hasImages = false;

  while ((match = imageRegex.exec(text)) !== null) {
    hasImages = true;
    // Add text before the image
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the image
    parts.push(
      <img
        key={`inline-img-${key++}`}
        src={match[2]}
        alt={match[1] || ''}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: '8px',
          margin: '24px 0',
          display: 'block',
        }}
      />
    );

    lastIndex = match.index + match[0].length;
  }

  if (!hasImages) return text;

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// Process links and then bold/italic
function processLinksAndFormatting(text) {
  if (!text) return null;

  // Handle links [text](url)
  const withLinks = processLinks(text);

  // If processLinks returned an array (has links), process each text segment for bold/italic
  if (Array.isArray(withLinks)) {
    return withLinks.map((part, idx) => {
      if (typeof part === 'string') {
        return <span key={`segment-${idx}`}>{processBoldAndItalic(part)}</span>;
      }
      return part; // Already a React element (link)
    });
  }

  // No links, process bold/italic directly
  return processBoldAndItalic(text);
}

// Process markdown links [text](url)
function processLinks(text) {
  if (!text) return text;

  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;
  let hasLinks = false;

  while ((match = linkRegex.exec(text)) !== null) {
    hasLinks = true;
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add the link
    parts.push(
      <a
        key={`link-${key++}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#000', textDecoration: 'underline' }}
      >
        {match[1]}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  if (!hasLinks) return text;

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// Process bold and italic text
function processBoldAndItalic(text) {
  if (!text) return null;

  const parts = [];
  let key = 0;

  // Handle bold text (**text**)
  const boldRegex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index);
      parts.push(<span key={`text-${key++}`}>{processItalic(before)}</span>);
    }

    // Add bold text (and check for italic inside it)
    parts.push(
      <strong key={`bold-${key++}`} style={{ fontWeight: '600', color: '#000' }}>
        {processItalic(match[1])}
      </strong>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex);
    parts.push(<span key={`text-${key++}`}>{processItalic(remaining)}</span>);
  }

  return parts.length > 0 ? parts : text;
}

// Process italic text within a string
function processItalic(text) {
  const parts = [];
  const italicRegex = /\*(.+?)\*/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = italicRegex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Add italic text
    parts.push(<em key={`italic-${key++}`}>{match[1]}</em>);
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Check if a text block contains a markdown table
function isMarkdownTable(text) {
  if (!text) return false;
  // Tables have pipes and a separator row with dashes
  return text.includes('|') && /\|\s*-{2,}\s*\|/.test(text);
}

// Parse markdown table syntax into a React table element
function parseMarkdownTable(markdown, key) {
  if (!markdown) return null;

  // Split by pipes and clean up
  const cells = markdown
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell !== '');

  // Find separator row (contains only dashes)
  const separatorIndex = cells.findIndex(cell => /^-{2,}$/.test(cell));
  if (separatorIndex === -1) return null;

  // Count columns by counting cells before separator
  // The separator row tells us how many columns there are
  let numColumns = 0;
  for (let i = 0; i < cells.length; i++) {
    if (/^-{2,}$/.test(cells[i])) {
      // Count how many separator cells in a row
      let sepCount = 0;
      let j = i;
      while (j < cells.length && /^-{2,}$/.test(cells[j])) {
        sepCount++;
        j++;
      }
      numColumns = sepCount;
      break;
    }
  }

  if (numColumns === 0) return null;

  // Remove separator cells
  const dataCells = cells.filter(cell => !/^-{2,}$/.test(cell));

  // Group cells into rows
  const rows = [];
  for (let i = 0; i < dataCells.length; i += numColumns) {
    const row = dataCells.slice(i, i + numColumns);
    if (row.length === numColumns) {
      rows.push(row);
    }
  }

  if (rows.length === 0) return null;

  return (
    <div key={key} style={{ overflowX: 'auto', margin: '32px 0' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.95rem',
      }}>
        <thead>
          <tr>
            {rows[0].map((cell, cellIndex) => (
              <th
                key={cellIndex}
                style={{
                  padding: '12px 16px',
                  borderBottom: '2px solid #e5e5e5',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: '#000',
                  backgroundColor: '#f9f9f9',
                }}
              >
                {renderRichText(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e5e5e5',
                    textAlign: 'left',
                    fontWeight: '400',
                    color: '#444',
                  }}
                >
                  {renderRichText(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
