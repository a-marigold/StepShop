import clsx from 'clsx';

import codeStyles from './JSONCodeBlock.module.scss';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface JSONCodeBlockProps {
    jsonString: string;

    className?: string;
}

export default function JSONCodeBlock({
    jsonString,

    className,
}: JSONCodeBlockProps) {
    const jsonData = JSON.parse(jsonString);

    const formattedJsonString = JSON.stringify(jsonData, null, 4);

    return (
        <SyntaxHighlighter language='json' style={dracula}>
            {formattedJsonString}
        </SyntaxHighlighter>
    );
}
