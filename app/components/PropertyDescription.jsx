'use client';

import { useState } from 'react';

export default function PropertyDescription({ description }) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!description) return null;

    const paragraphs = description.split('\n').filter(para => para.trim());
    const charLimit = 500;

    // Check if description is long enough to need truncation
    const fullText = paragraphs.join(' ');
    const needsTruncation = fullText.length > charLimit;

    if (!needsTruncation) {
        return (
            <div className="property-description-body">
                {paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </div>
        );
    }

    // Get truncated text
    const truncatedText = fullText.slice(0, charLimit);
    const lastSpaceIndex = truncatedText.lastIndexOf(' ');
    const displayText = truncatedText.slice(0, lastSpaceIndex) + '...';

    return (
        <div className="property-description-body">
            {isExpanded ? (
                <>
                    {paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                    ))}
                    <button
                        className="property-description__toggle"
                        onClick={() => setIsExpanded(false)}
                    >
                        − SHOW LESS
                    </button>
                </>
            ) : (
                <>
                    <p>{displayText}</p>
                    <button
                        className="property-description__toggle"
                        onClick={() => setIsExpanded(true)}
                    >
                        + continue reading.
                    </button>
                </>
            )}
        </div>
    );
}
