import { CreateProductForm } from './components';

interface OperationPageProps {
    params: {
        operation: string;
    };
}
export default function OperationPage({ params }: OperationPageProps) {
    return <div>{params.operation === 'create' && <CreateProductForm />}</div>;
}
