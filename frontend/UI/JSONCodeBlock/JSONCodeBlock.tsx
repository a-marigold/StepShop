import clsx from 'clsx';

import codeStyles from './JSONCodeBlock.module.scss';

import { tokenizer } from './tokenizer';

interface JSONCodeBlockProps {
    jsonString: string;

    className?: string;
}

export default function JSONCodeBlock({
    jsonString,

    className,
}: JSONCodeBlockProps) {
    return (
        <pre className={clsx(codeStyles['code-block'], className)}>
            <code className={codeStyles['']}>{tokenizer(jsonString)}</code>
        </pre>
    );
}
