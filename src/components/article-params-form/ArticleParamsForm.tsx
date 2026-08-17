import { useState, useRef, useEffect } from 'react';
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
}

export const ArticleParamsForm = ({
	isOpen,
	onClose,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

	const updateFormField = (field: keyof ArticleStateType) => {
		return (value: (typeof fontFamilyOptions)[0]) => {
			setFormState((prev) => ({
				...prev,
				[field]: value,
			}));
		};
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
		<aside
			ref={formRef}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
			<form className={styles.form} onSubmit={handleSubmit}>
				<Text as='h2' size={31} weight={800} uppercase>
					Задайте параметры
				</Text>

				<Select
					options={fontFamilyOptions}
					selected={formState.fontFamilyOption}
					onChange={updateFormField('fontFamilyOption')}
					title='Шрифт'
				/>

				<RadioGroup
					name='fontSize'
					options={fontSizeOptions}
					selected={formState.fontSizeOption}
					onChange={updateFormField('fontSizeOption')}
					title='Размер шрифта'
				/>

				<Select
					options={fontColors}
					selected={formState.fontColor}
					onChange={updateFormField('fontColor')}
					title='Цвет шрифта'
				/>

				<Separator />

				<Select
					options={backgroundColors}
					selected={formState.backgroundColor}
					onChange={updateFormField('backgroundColor')}
					title='Цвет фона'
				/>

				<Select
					options={contentWidthArr}
					selected={formState.contentWidth}
					onChange={updateFormField('contentWidth')}
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
	);
};
