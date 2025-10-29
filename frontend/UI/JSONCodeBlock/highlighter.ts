import codeStyles from './JSONCodeBlock.module.scss';

function getTokenClassName(token: string, nextToken?: string) {
    if (token === '{' || token === '}') {
        return codeStyles['fbracket'];
    } else if (token === '[' || token === ']') {
        return codeStyles['sbracket'];
    } else if (token === ',') {
        return codeStyles['comma'];
    } else if (token === ':') {
        return codeStyles['colon'];
    } else if (token.startsWith('"') && nextToken === ':') {
        return codeStyles['key'];
    } else if (token.startsWith('"') && nextToken !== ':') {
        return codeStyles['string'];
    } else if (token === 'null') {
        return codeStyles['null'];
    } else if (token === 'true' || token === 'false') {
        return codeStyles['boolean'];
    } else if (!!Number(token)) {
        return codeStyles['number'];
    }
}

export function highlighter(jsonTokens: string[]) {
    return jsonTokens
        .map((token, index) => {
            return `<span class='token ${getTokenClassName(
                token,
                token !== '}' && token !== ']'
                    ? jsonTokens[index + 1]
                    : undefined
            )}'>${token}</span>`;
        })
        .join('');
}
