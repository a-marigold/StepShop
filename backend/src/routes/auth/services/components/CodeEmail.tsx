import { Text } from '@react-email/components';

interface CodeEmailProps {
    title: string;
    code: string;
}
export function CodeEmail({ title, code }: CodeEmailProps) {
    return (
        <>
            <Text
                style={{
                    color: '#a78bfa',
                    fontSize: 24,

                    fontWeight: 600,
                    lineHeight: '32px',
                }}
            >
                {title}
            </Text>

            <Text>{code}</Text>
        </>
    );
}
