import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './../../constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';

import styles from './app.module.scss';

export const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [currentState, setCurrentState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = (newState: ArticleStateType) => {
		setCurrentState(newState);
		setIsSidebarOpen(false);
	};

	const handleReset = () => {
		setCurrentState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': currentState.fontFamilyOption.value,
					'--font-size': currentState.fontSizeOption.value,
					'--font-color': currentState.fontColor.value,
					'--container-width': currentState.contentWidth.value,
					'--bg-color': currentState.backgroundColor.value,
				} as CSSProperties
			}>
			<div className={styles.arrowButton}>
				<ArrowButton
					isOpen={isSidebarOpen}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				/>
			</div>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
