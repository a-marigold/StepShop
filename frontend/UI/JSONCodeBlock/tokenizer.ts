function isBracket(token: string) {
    if (token === '{' || token === '}') {
        return true;
    } else if (token === '[' || token === ']') {
        return true;
    }
}

export function tokenizer(jsonString: string) {
    const tokens: string[] = [];

    let currentToken: string = '';

    for (let i = 0; i < jsonString.length; i++) {
        if (
            isBracket(jsonString[i]) ||
            jsonString[i] === ',' ||
            jsonString[i] === ':'
        ) {
            tokens.push(jsonString[i]);
        } else if (jsonString[i] === '"') {
            i++;
            while (jsonString[i] !== '"') {
                currentToken += jsonString[i];
                i++;
            }
            tokens.push(`"${currentToken}"`);
            currentToken = '';
        } else if (jsonString[i] === 'n') {
            if (jsonString[i - 1] === '"') continue;

            while (jsonString[i] !== ',') {
                currentToken += jsonString[i];
                i++;
            }
            tokens.push(currentToken);
            currentToken = '';
        } else if (
            jsonString[i] === 't' &&
            jsonString[i] !== '}' &&
            jsonString[i] !== ']'
        ) {
            if (jsonString[i - 1] === '"') continue;

            while (jsonString[i] !== ',') {
                currentToken += jsonString[i];
                i++;
            }
            tokens.push(currentToken);
            currentToken = '';
        } else if (
            jsonString[i] === 'f' &&
            jsonString[i] !== '}' &&
            jsonString[i] !== ']'
        ) {
            if (jsonString[i - 1] === '"') continue;

            while (
                jsonString[i] !== ',' &&
                jsonString[i] !== '}' &&
                jsonString[i] !== ' ' &&
                jsonString[i] !== ']'
            ) {
                currentToken += jsonString[i];
                i++;
            }
            tokens.push(currentToken);
            currentToken = '';
        }
    }

    return tokens.join();
}
