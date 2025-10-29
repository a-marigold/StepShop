import clsx from 'clsx';

import codeStyles from './JSONCodeBlock.module.scss';

import { tokenizer } from './tokenizer';
import { highlighter } from './highlighter';

interface JSONCodeBlockProps {
    jsonString: string;

    className?: string;
}

export default function JSONCodeBlock({
    jsonString,

    className,
}: JSONCodeBlockProps) {
    console.log(tokenizer(jsonString));

    console.log(highlighter(tokenizer(jsonString)));

    return (
        <pre className={clsx(codeStyles['code-block'], className)}>
            <code
                className={codeStyles['']}
                dangerouslySetInnerHTML={{
                    __html: highlighter(tokenizer(jsonString)),
                }}
            ></code>
        </pre>
    );
}
