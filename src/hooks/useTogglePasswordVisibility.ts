import { useState } from 'react';
import Eye from '../assets/Icons/Eye.png';
import ClosedEye from '../assets/Icons/ClosedEye.png';

export const useTogglePasswordVisibility = () => {
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [rightIcon, setRightIcon] = useState(ClosedEye);

	const handlePasswordVisibility = () => {
		if (passwordVisibility) {
			setRightIcon(ClosedEye);
			setPasswordVisibility(!passwordVisibility);
		} else {
			setRightIcon(Eye);
			setPasswordVisibility(!passwordVisibility);
		}
	};

	return {
		passwordVisibility,
		rightIcon,
		handlePasswordVisibility
	};
};
