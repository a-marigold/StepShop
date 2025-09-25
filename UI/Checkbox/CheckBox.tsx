import checkboxStyles from './CheckBox.module.scss';

export default function CheckBox({ name }: { name: string }) {
    return (
        <label className={checkboxStyles['checkbox-block']}>
            <input
                type='checkbox'
                id='checkbox'
                className={checkboxStyles['checkbox']}
            />
            {name}
        </label>
    );
}
