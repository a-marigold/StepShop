import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface JSONCodeBlockProps {
    json: string | Record<string, any>[] | Record<string, any>;
}

export default function JSONCodeBlock({ json }: JSONCodeBlockProps) {
    let formattedJson: string = '';

    if (typeof json === 'string') {
        const jsonData = JSON.parse(json);

        formattedJson = JSON.stringify(jsonData, null, 4);
    } else {
        formattedJson = JSON.stringify(json, null, 4);
    }

    return (
        <SyntaxHighlighter
            language='json'
            style={oneLight}
            customStyle={{ width: '' }}
        >
            {formattedJson}
        </SyntaxHighlighter>
    );
}
