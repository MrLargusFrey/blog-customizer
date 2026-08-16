import { useState, useEffect } from 'react';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isOpen: boolean;
	onClose: () => void;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
	currentState: ArticleStateType;
}

export const ArticleParamsForm = ({
	isOpen,
	onClose,
	onApply,
	onReset,
	currentState,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(currentState);

	useEffect(() => {
		if (isOpen) {
			setFormState(currentState);
		}
	}, [isOpen, currentState]);

	const handleFontFamilyChange = (value: (typeof fontFamilyOptions)[0]) => {
		setFormState({ ...formState, fontFamilyOption: value });
	};

	const handleFontSizeChange = (value: (typeof fontSizeOptions)[0]) => {
		setFormState({ ...formState, fontSizeOption: value });
	};

	const handleFontColorChange = (value: (typeof fontColors)[0]) => {
		setFormState({ ...formState, fontColor: value });
	};

	const handleBackgroundColorChange = (value: (typeof backgroundColors)[0]) => {
		setFormState({ ...formState, backgroundColor: value });
	};

	const handleContentWidthChange = (value: (typeof contentWidthArr)[0]) => {
		setFormState({ ...formState, contentWidth: value });
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<div
				className={styles.overlay}
				style={{ display: isOpen ? 'block' : 'none' }}
				onClick={onClose}
			/>
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Настройки
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>

					<Separator />

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>

					<Separator />

					<Select
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>

					<Separator />

					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
