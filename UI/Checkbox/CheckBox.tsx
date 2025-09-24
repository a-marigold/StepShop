import checkboxStyles from './CheckBox.module.scss';

export default function CheckBox() {
    return (
        <label className={checkboxStyles['checkbox-block']}>
            <input
                type='checkbox'
                id='checkbox'
                className={checkboxStyles['checkbox']}
            />
            Сырный соус
        </label>
    );
}
